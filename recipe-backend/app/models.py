from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    JSON,
    Text
)

from datetime import datetime

from .database import Base


class Recipe(Base):

    __tablename__ = "recipes"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    url = Column(
        String,
        unique=True,
        index=True,
        nullable=False
    )

    title = Column(String)

    cuisine = Column(String)

    difficulty = Column(String)

    raw_html = Column(Text)

    data = Column(JSON)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )