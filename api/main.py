"""
Main FastAPI application for Bitcoin & Financially Sovereign Academy
"""
import uvicorn
from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
import logging
from pathlib import Path

from app.config import get_settings
from app.database import init_db
from app.routers import auth, academies, courses, modules, assessments, calculators, payments, users, mcp


# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan events"""
    # Startup
    logger.info("Starting up Academy API...")
    await init_db()
    logger.info("Database initialized")
    
    yield
    
    # Shutdown
    logger.info("Shutting down Academy API...")


# Create FastAPI app
app = FastAPI(
    title="Academy API",
    description="REST API for Bitcoin Sovereign Academy and Financially Sovereign Academy",
    version="1.0.0",
    docs_url="/docs" if settings.ENVIRONMENT != "production" else None,
    redoc_url="/redoc" if settings.ENVIRONMENT != "production" else None,
    lifespan=lifespan,
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Global exception handler
@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": "HTTP Error",
            "message": exc.detail,
            "status_code": exc.status_code,
        }
    )


@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled exception: {exc}")
    return JSONResponse(
        status_code=500,
        content={
            "error": "Internal Server Error",
            "message": "An unexpected error occurred",
            "status_code": 500,
        }
    )


# Health check endpoint
@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "version": "1.0.0",
        "environment": settings.ENVIRONMENT,
    }


# API routes
@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Welcome to Academy API",
        "version": "1.0.0",
        "docs": "/docs",
        "academies": {
            "bitcoin_sovereign": "Bitcoin Sovereign Academy",
            "financially_sovereign": "Financially Sovereign Academy",
        }
    }


# Include routers with v1 prefix
API_PREFIX = "/api/v1"

app.include_router(auth.router, prefix=f"{API_PREFIX}/auth", tags=["Authentication"])
app.include_router(academies.router, prefix=f"{API_PREFIX}/academies", tags=["Academies"])
app.include_router(courses.router, prefix=f"{API_PREFIX}/courses", tags=["Courses"])
app.include_router(modules.router, prefix=f"{API_PREFIX}/modules", tags=["Modules"])
app.include_router(assessments.router, prefix=f"{API_PREFIX}/assessments", tags=["Assessments"])
app.include_router(calculators.router, prefix=f"{API_PREFIX}/calculators", tags=["Calculators"])
app.include_router(payments.router, prefix=f"{API_PREFIX}/payments", tags=["Payments"])
app.include_router(users.router, prefix=f"{API_PREFIX}/users", tags=["Users"])
app.include_router(mcp.router, prefix=f"{API_PREFIX}/mcp", tags=["MCP"])


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.ENVIRONMENT == "development",
    )