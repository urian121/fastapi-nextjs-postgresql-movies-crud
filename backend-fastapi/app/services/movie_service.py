from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from fastapi import HTTPException, status

from app.models.movie_model import Movie
from app.schemas.movie_schema import MovieCreate, MovieUpdate


async def get_all(db: AsyncSession) -> list[Movie]:
    result = await db.execute(select(Movie))
    return result.scalars().all()


async def get_by_id(db: AsyncSession, movie_id: int) -> Movie:
    result = await db.execute(select(Movie).where(Movie.id == movie_id))
    movie = result.scalar_one_or_none()
    if not movie:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Movie not found")
    return movie


async def create(db: AsyncSession, data: MovieCreate) -> Movie:
    movie = Movie(**data.model_dump())
    db.add(movie)
    await db.commit()
    await db.refresh(movie)
    return movie


async def update(db: AsyncSession, movie_id: int, data: MovieUpdate) -> Movie:
    movie = await get_by_id(db, movie_id)
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(movie, field, value)
    await db.commit()
    await db.refresh(movie)
    return movie


async def delete(db: AsyncSession, movie_id: int) -> None:
    movie = await get_by_id(db, movie_id)
    await db.delete(movie)
    await db.commit()
