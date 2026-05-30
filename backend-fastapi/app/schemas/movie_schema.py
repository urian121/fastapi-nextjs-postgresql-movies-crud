from pydantic import BaseModel, Field
from typing import Optional


class MovieBase(BaseModel):
    title: str
    description: str
    year: int
    image_url: str
    genre: str
    stars: float = Field(ge=0.0, le=5.0)


class MovieCreate(MovieBase):
    pass


class MovieUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    year: Optional[int] = None
    image_url: Optional[str] = None
    genre: Optional[str] = None
    stars: Optional[float] = Field(default=None, ge=0.0, le=5.0)


class MovieResponse(MovieBase):
    id: int

    model_config = {"from_attributes": True}
