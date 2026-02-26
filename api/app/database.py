"""
Database configuration and session management
"""
import logging
from sqlalchemy import create_engine
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from typing import AsyncGenerator

from app.config import get_settings

logger = logging.getLogger(__name__)
settings = get_settings()

# Create base class for models
Base = declarative_base()

# Database engines
engine = None
async_engine = None
SessionLocal = None
AsyncSessionLocal = None


def get_database_url(async_db: bool = False) -> str:
    """Get database URL for sync or async connections"""
    db_url = settings.DATABASE_URL
    
    if async_db:
        # Convert postgresql:// to postgresql+asyncpg://
        if db_url.startswith("postgresql://"):
            db_url = db_url.replace("postgresql://", "postgresql+asyncpg://")
        elif db_url.startswith("sqlite:///"):
            db_url = db_url.replace("sqlite:///", "sqlite+aiosqlite:///")
    
    return db_url


def init_database():
    """Initialize database connections"""
    global engine, async_engine, SessionLocal, AsyncSessionLocal
    
    # Sync engine for migrations and admin tasks
    engine = create_engine(
        get_database_url(async_db=False),
        pool_size=settings.DATABASE_POOL_SIZE,
        max_overflow=20,
    )
    
    # Async engine for API requests
    async_engine = create_async_engine(
        get_database_url(async_db=True),
        pool_size=settings.DATABASE_POOL_SIZE,
        max_overflow=20,
    )
    
    # Session makers
    SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)
    AsyncSessionLocal = async_sessionmaker(
        bind=async_engine,
        class_=AsyncSession,
        autocommit=False,
        autoflush=False,
    )
    
    logger.info("Database connections initialized")


async def init_db():
    """Initialize database and create tables"""
    if async_engine is None:
        init_database()
    
    # Import all models to ensure they're registered
    from app.models import user, academy, course, module, assessment, payment, progress
    
    # Create tables
    async with async_engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    
    logger.info("Database tables created/verified")


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """Dependency to get database session"""
    if AsyncSessionLocal is None:
        init_database()
    
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()


def get_sync_db():
    """Get synchronous database session (for migrations, etc.)"""
    if SessionLocal is None:
        init_database()
    
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Initialize on import
init_database()