from sqlalchemy import Column, String, Integer, Float, Text
from .database import Base


class Item(Base):
    __tablename__ = 'items'
    id = Column(String, primary_key=True, index=True)
    image_uri = Column(Text, nullable=True)
    category = Column(String, nullable=True)
    subcategory = Column(String, nullable=True)
    color = Column(String, nullable=True)
    fabric = Column(String, nullable=True)
    season = Column(String, nullable=True)
    occasion_tags = Column(Text, nullable=True)
    comfort_rating = Column(Integer, nullable=True)
    wear_count = Column(Integer, default=0)
    last_worn_date = Column(String, nullable=True)
    laundry_status = Column(String, nullable=True)
    favorite_score = Column(Float, nullable=True)
    created_at = Column(String, nullable=True)


class Feedback(Base):
    __tablename__ = 'feedback'
    id = Column(String, primary_key=True, index=True)
    outfit_id = Column(String, nullable=True)
    tags = Column(Text, nullable=True)
    timestamp = Column(String, nullable=True)
