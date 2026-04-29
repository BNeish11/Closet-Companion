from pydantic import BaseModel
from typing import List, Optional


class ItemBase(BaseModel):
    id: str
    image_uri: Optional[str] = None
    category: Optional[str] = None
    subcategory: Optional[str] = None
    color: Optional[str] = None
    fabric: Optional[str] = None
    season: Optional[str] = None
    occasion_tags: Optional[List[str]] = None
    comfort_rating: Optional[int] = None
    wear_count: Optional[int] = 0
    last_worn_date: Optional[str] = None
    laundry_status: Optional[str] = None
    favorite_score: Optional[float] = None
    created_at: Optional[str] = None


class ItemCreate(ItemBase):
    pass


class ItemOut(ItemBase):
    class Config:
        orm_mode = True


class FeedbackCreate(BaseModel):
    id: str
    outfit_id: Optional[str] = None
    tags: Optional[List[str]] = None
    timestamp: Optional[str] = None
