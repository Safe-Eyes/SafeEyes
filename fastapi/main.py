from fastapi import FastAPI, HTTPException, Depends, UploadFile, File
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List
from database import SessionLocal, engine
import models
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import os
import boto3

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
    time: str
    place: str
    date: str
    video: str
    violator: str
    is_done: bool

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

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

models.Base.metadata.create_all(bind=engine)

@app.post("/reports/", response_model=ReportModel)
async def create_report(report: ReportBase, db: Session = Depends(get_db)):
    db_report = models.Reports(**report.dict())
    db.add(db_report)
    db.commit()
    db.refresh(db_report)
    return db_report

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
    


@app.get("/getunsolvedreports")
async def get_unsolved():
    try:
        res = s3.list_objects_v2(Bucket=os.getenv("S3_BUCKET_NAME"))
        return res
    except Exception as e:
        print(f"Error occurred: {e}")
        raise HTTPException(status_code=500, detail=f"Error occurred: {e}")
    
