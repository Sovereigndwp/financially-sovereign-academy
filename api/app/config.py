"""
Application configuration and settings
"""
import os
from typing import List
from pydantic_settings import BaseSettings
from decouple import config


class Settings(BaseSettings):
    """Application settings"""
    
    # Application
    ENVIRONMENT: str = config("ENVIRONMENT", default="development")
    SECRET_KEY: str = config("SECRET_KEY", default="dev-secret-key-change-in-production")
    
    # Database
    DATABASE_URL: str = config("DATABASE_URL", default="postgresql://user:password@localhost/academy_db")
    DATABASE_POOL_SIZE: int = config("DATABASE_POOL_SIZE", default=10, cast=int)
    
    # CORS
    CORS_ORIGINS: List[str] = config(
        "CORS_ORIGINS", 
        default="http://localhost:3000,http://localhost:8000,https://bitcoinsovereign.academy,https://financially-sovereign-academy.vercel.app",
        cast=lambda x: [origin.strip() for origin in x.split(",")]
    )
    
    # JWT
    JWT_SECRET_KEY: str = config("JWT_SECRET_KEY", default="jwt-secret-key-change-in-production")
    JWT_ALGORITHM: str = config("JWT_ALGORITHM", default="HS256")
    JWT_EXPIRATION_HOURS: int = config("JWT_EXPIRATION_HOURS", default=24 * 7, cast=int)  # 7 days
    
    # Payment providers
    STRIPE_SECRET_KEY: str = config("STRIPE_SECRET_KEY", default="")
    STRIPE_WEBHOOK_SECRET: str = config("STRIPE_WEBHOOK_SECRET", default="")
    STRIPE_PUBLISHABLE_KEY: str = config("STRIPE_PUBLISHABLE_KEY", default="")
    
    BTCPAY_SERVER_URL: str = config("BTCPAY_SERVER_URL", default="")
    BTCPAY_API_KEY: str = config("BTCPAY_API_KEY", default="")
    BTCPAY_STORE_ID: str = config("BTCPAY_STORE_ID", default="")
    BTCPAY_WEBHOOK_SECRET: str = config("BTCPAY_WEBHOOK_SECRET", default="")
    
    # Email
    SMTP_HOST: str = config("SMTP_HOST", default="localhost")
    SMTP_PORT: int = config("SMTP_PORT", default=587, cast=int)
    SMTP_USERNAME: str = config("SMTP_USERNAME", default="")
    SMTP_PASSWORD: str = config("SMTP_PASSWORD", default="")
    SMTP_FROM_EMAIL: str = config("SMTP_FROM_EMAIL", default="noreply@example.com")
    
    # Academy Configuration
    BITCOIN_ACADEMY_URL: str = config("BITCOIN_ACADEMY_URL", default="https://bitcoinsovereign.academy")
    FSA_ACADEMY_URL: str = config("FSA_ACADEMY_URL", default="https://financially-sovereign-academy.vercel.app")
    
    # Rate limiting
    RATE_LIMIT_REQUESTS: int = config("RATE_LIMIT_REQUESTS", default=100, cast=int)
    RATE_LIMIT_WINDOW: int = config("RATE_LIMIT_WINDOW", default=60, cast=int)  # seconds
    
    class Config:
        env_file = ".env"


# Global settings instance
_settings = None


def get_settings() -> Settings:
    """Get application settings (singleton)"""
    global _settings
    if _settings is None:
        _settings = Settings()
    return _settings


# Academy configurations
ACADEMY_CONFIGS = {
    "bitcoin_sovereign": {
        "id": "bitcoin_sovereign",
        "name": "Bitcoin Sovereign Academy",
        "slug": "bitcoin-sovereign-academy",
        "description": "Master Bitcoin. Become Sovereign.",
        "base_url": "https://bitcoinsovereign.academy",
        "primary_color": "#f7931a",  # Bitcoin orange
        "secondary_color": "#1a1a1a",
        "assessment_personas": [
            {
                "id": "hodler",
                "name": "The HODLer",
                "description": "You believe in Bitcoin as digital gold"
            },
            {
                "id": "builder",
                "name": "The Builder", 
                "description": "You want to build on Bitcoin"
            },
            {
                "id": "curious",
                "name": "The Curious",
                "description": "You want to understand Bitcoin deeply"
            },
            {
                "id": "sovereign",
                "name": "The Sovereign",
                "description": "You want complete financial independence"
            },
            {
                "id": "educator",
                "name": "The Educator",
                "description": "You want to teach others about Bitcoin"
            }
        ]
    },
    "financially_sovereign": {
        "id": "financially_sovereign",
        "name": "Financially Sovereign Academy",
        "slug": "financially-sovereign-academy",
        "description": "Master money. Master life.",
        "base_url": "https://financially-sovereign-academy.vercel.app",
        "primary_color": "#10b981",  # FSA green
        "secondary_color": "#0a1f1a",
        "assessment_personas": [
            {
                "id": "debt_eliminator",
                "name": "The Debt Eliminator",
                "description": "Focus on eliminating debt and building emergency funds"
            },
            {
                "id": "fresh_start", 
                "name": "The Fresh Start",
                "description": "Starting your financial journey from scratch"
            },
            {
                "id": "wealth_builder",
                "name": "The Wealth Builder",
                "description": "Ready to invest and build long-term wealth"
            },
            {
                "id": "strategic_planner",
                "name": "The Strategic Planner",
                "description": "Optimize taxes, insurance, and financial strategy"
            },
            {
                "id": "financial_sovereign",
                "name": "The Financial Sovereign",
                "description": "Achieve complete financial independence"
            }
        ]
    }
}