from database import Base
from sqlalchemy import Column, Integer, String, Boolean, Float, DateTime
from datetime import datetime


class Reports(Base):
    __tablename__ = 'reports'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    category = Column(String)
    time= Column(String)
    place = Column(String)
    date = Column(String)
    video= Column(String)
    violator = Column(String)
    status = Column(String)




class Users(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    role = Column(String)
    warnings = Column(Integer)
    is_admin = Column(Boolean)
    on_object = Column(Boolean)
    location = Column(String)
    picture = Column(String)
