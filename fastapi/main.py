from fastapi import FastAPI, HTTPException, Depends, UploadFile, File
from sqlalchemy.orm import Session
from sqlalchemy import and_, func
from pydantic import BaseModel
from typing import List, Optional
from database import SessionLocal, engine
import models
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import os
import boto3
from datetime import datetime, timedelta

from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

s3 = boto3.client('s3',
                  aws_access_key_id=os.getenv("AWS_ACCESS_KEY"),
                  aws_secret_access_key=os.getenv("AWS_SECRET_KEY"))

@app.get('/')
async def check():
    return "hehe"

origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

class ReportBase(BaseModel):
    name: str
    category: str
    time: Optional[str] = None  # Making time optional
    place: str
    date: str  # Assuming date is a string in 'YYYY-MM-DD' format
    video: str
    violator: str
    status: str  # 3 states: new/unsolved/solved

class ReportModel(ReportBase):
    id: int

class UserBase(BaseModel):
    name: str
    role: str
    warnings: int
    is_admin: bool
    on_object: bool
    location: str
    picture: str

class UserModel(UserBase):
    id: int

class ReportStatusUpdate(BaseModel):
    status: str

class ReportModel(ReportBase):
    id: int

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

models.Base.metadata.create_all(bind=engine)

@app.post("/reports/", response_model=ReportModel)
async def create_report(report: ReportBase, db: Session = Depends(get_db)):
    try:
        # Get current time in UTC
        current_time = datetime.utcnow()
        current_time_str = current_time.strftime("%H:%M:%S")

        # Calculate the time window for the last minute
        one_minute_ago = current_time - timedelta(minutes=1)
        one_minute_ago_str = one_minute_ago.strftime("%H:%M:%S")

        # Check for existing reports in the last minute with the same category and place
        existing_report = db.query(models.Reports).filter(
            and_(
                models.Reports.category == report.category,
                models.Reports.place == report.place,
                models.Reports.status.in_(["new", "unsolved"]),
                models.Reports.time >= one_minute_ago_str,
                models.Reports.time <= current_time_str
            )
        ).first()

        if (existing_report):
            raise HTTPException(status_code=400, detail="A similar report with status 'new' or 'unsolved' exists from the last minute.")

        # Set the report time to the current time if not provided
        if not report.time:
            report.time = current_time_str

        db_report = models.Reports(**report.dict())
        db.add(db_report)
        db.commit()
        db.refresh(db_report)
        return db_report
    except Exception as e:
        print(f"Error occurred: {e}")
        raise HTTPException(status_code=500, detail=f"Error occurred: {e}")

@app.get("/reports/", response_model=List[ReportModel])
async def read_reports(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    reports = db.query(models.Reports).offset(skip).limit(limit).all()
    return reports

@app.post("/users/", response_model=UserModel)
async def create_user(user: UserBase, db: Session = Depends(get_db)):
    db_user = models.Users(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.get("/users/", response_model=List[UserModel])
async def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = db.query(models.Users).offset(skip).limit(limit).all()
    return users

@app.get("/getallfiles")
async def get_all_files():
    try:
        res = s3.list_objects_v2(Bucket=os.getenv("S3_BUCKET_NAME"))
        return res
    except Exception as e:
        print(f"Error occurred: {e}")
        raise HTTPException(status_code=500, detail=f"Error occurred: {e}")

@app.post("/upload")
async def upload(file: UploadFile = File(...)):
    try:
        if file:
            bucket_name = os.getenv("S3_BUCKET_NAME")
            if not bucket_name:
                raise ValueError("Bucket name is not set")

            folder_name = os.getenv("FOLDER")
            object_name = f"{folder_name}/{file.filename}"

            print(f"Uploading {file.filename} to {folder_name}")
            s3.upload_fileobj(file.file, bucket_name, object_name)
            return {"message": f"File uploaded successfully to {folder_name}"}
        else:
            return {"error": "No file provided"}
    except Exception as e:
        print(f"Error occurred: {e}")
        raise HTTPException(status_code=500, detail=f"Error occurred: {e}")

@app.get("/download")
async def download_file(file_name: str):
    try:
        bucket_name = os.getenv("S3_BUCKET_NAME")
        folder_name = os.getenv("FOLDER")
        object_name = f"{folder_name}/{file_name}"

        file_obj = s3.get_object(Bucket=bucket_name, Key=object_name)
        file_stream = file_obj['Body']
        
        return StreamingResponse(file_stream, media_type='application/octet-stream', headers={"Content-Disposition": f"attachment; filename={file_name}"})
    except Exception as e:
        print(f"Error occurred: {e}")
        raise HTTPException(status_code=500, detail=f"Error occurred: {e}")

# Get different types of reports
@app.get("/newreports", response_model=List[ReportModel])
async def read_reports(db: Session = Depends(get_db)):
    reports = db.query(models.Reports).filter_by(status="new").all()
    return reports

@app.get("/unsolvedreports", response_model=List[ReportModel])
async def read_reports(db: Session = Depends(get_db)):
    reports = db.query(models.Reports).filter_by(status="unsolved").all()
    return reports

@app.get("/solvedreports", response_model=List[ReportModel])
async def read_reports(db: Session = Depends(get_db)):
    reports = db.query(models.Reports).filter_by(status="solved").all()
    return reports

@app.patch("/reports/{report_id}/status")
async def update_report_status(report_id: int, status_update: ReportStatusUpdate, db: Session = Depends(get_db)):
    report = db.query(models.Reports).filter(models.Reports.id == report_id).first()
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    
    report.status = status_update.status
    db.commit()
    db.refresh(report)
    return report