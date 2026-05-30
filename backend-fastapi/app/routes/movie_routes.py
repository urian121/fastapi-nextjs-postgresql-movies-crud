from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.connection import get_db
from app.schemas.movie_schema import MovieCreate, MovieUpdate, MovieResponse
from app.services import movie_service

router = APIRouter(prefix="/movies", tags=["Movies"])


@router.get("/", response_model=list[MovieResponse])
async def get_all(db: AsyncSession = Depends(get_db)):
    return await movie_service.get_all(db)


@router.get("/{movie_id}", response_model=MovieResponse)
async def get_by_id(movie_id: int, db: AsyncSession = Depends(get_db)):
    return await movie_service.get_by_id(db, movie_id)


@router.post("/", response_model=MovieResponse, status_code=status.HTTP_201_CREATED)
async def create(data: MovieCreate, db: AsyncSession = Depends(get_db)):
    return await movie_service.create(db, data)


@router.put("/{movie_id}", response_model=MovieResponse)
async def update(movie_id: int, data: MovieUpdate, db: AsyncSession = Depends(get_db)):
    return await movie_service.update(db, movie_id, data)


@router.delete("/{movie_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete(movie_id: int, db: AsyncSession = Depends(get_db)):
    await movie_service.delete(db, movie_id)
