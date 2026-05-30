from sqlalchemy import Column, Integer, String, Float
from app.database.connection import Base


class Movie(Base):
    __tablename__ = "movies"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    year = Column(Integer, nullable=False)
    image_url = Column(String, nullable=False)
    genre = Column(String, nullable=False)
    stars = Column(Float, nullable=False)
