from fastapi import FastAPI, HTTPException, Depends
from typing import Annotated, List
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database import SessionLocal, engine
import models
from fastapi.middleware.cors import CORSMiddleware
from database import engine


app = FastAPI()

@app.get('/')
async def check():
    return 'hello'

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
    name : str
    category : str
    time : str
    place : str
    date : str
    video : str
    violator : str
    is_done : bool

class ReportModel(ReportBase):
    id: int
    
    # class Config:
    #     orm_mode = True
    

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]

models.Base.metadata.create_all(bind=engine)


@app.post("/reports/", response_model=ReportModel)
async def create_report(report: ReportBase, db: db_dependency):
    print('he')
    db_report = models.Report(**report.model_dump())
    db.add(db_report)
    db.commit()
    db.refresh(db_report)
    return db_report


@app.get("/reports/", response_model=List[ReportModel])
async def read_reports(db: db_dependency, skip: int=0, limit: int=100):
    reports = db.query(models.Report).offset(skip).limit(limit).all()
    return reports















