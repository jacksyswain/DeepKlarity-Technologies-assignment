from sqlalchemy import Column, Integer, String, DateTime, JSON
from datetime import datetime

from .database import Base


class Recipe(Base):
    __tablename__ = "recipes"

    id = Column(Integer, primary_key=True, index=True)

    url = Column(String, nullable=False)

    title = Column(String)

    cuisine = Column(String)

    difficulty = Column(String)

    data = Column(JSON)

    created_at = Column(DateTime, default=datetime.utcnow)