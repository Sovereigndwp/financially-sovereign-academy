"""
Academy model for multi-academy support
"""
from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, DateTime, Boolean, Text, JSON
from sqlalchemy.orm import relationship
from app.database import Base


class Academy(Base):
    """Academy model for multi-academy support"""
    __tablename__ = "academies"

    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String(100), unique=True, index=True, nullable=False)  # e.g., "bitcoin_sovereign", "financially_sovereign"
    name = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)
    
    # URLs and branding
    base_url = Column(String(500), nullable=False)
    logo_url = Column(String(500), nullable=True)
    favicon_url = Column(String(500), nullable=True)
    
    # Configuration (stored as JSON)
    config = Column(JSON, nullable=True)  # Colors, theme, assessment personas, etc.
    
    # Settings
    is_active = Column(Boolean, default=True, nullable=False)
    is_public = Column(Boolean, default=True, nullable=False)  # Can be discovered publicly
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc), nullable=False)
    
    # Relationships
    courses = relationship("Course", back_populates="academy", cascade="all, delete-orphan")
    entitlements = relationship("Entitlement", back_populates="academy", cascade="all, delete-orphan")
    assessments = relationship("Assessment", back_populates="academy", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Academy(id={self.id}, slug='{self.slug}', name='{self.name}')>"

    def to_dict(self):
        """Convert to dictionary"""
        return {
            "id": self.id,
            "slug": self.slug,
            "name": self.name,
            "description": self.description,
            "base_url": self.base_url,
            "logo_url": self.logo_url,
            "favicon_url": self.favicon_url,
            "config": self.config,
            "is_active": self.is_active,
            "is_public": self.is_public,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }

    def get_assessment_personas(self):
        """Get assessment personas for this academy"""
        if self.config and "assessment_personas" in self.config:
            return self.config["assessment_personas"]
        return []

    def get_primary_color(self):
        """Get primary brand color"""
        if self.config and "primary_color" in self.config:
            return self.config["primary_color"]
        return "#000000"

    def get_secondary_color(self):
        """Get secondary brand color"""
        if self.config and "secondary_color" in self.config:
            return self.config["secondary_color"]
        return "#ffffff"