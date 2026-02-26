"""
Course model for course management
"""
from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, DateTime, Boolean, Text, JSON, ForeignKey, Numeric
from sqlalchemy.orm import relationship
from app.database import Base


class Course(Base):
    """Course model for course management"""
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True)
    academy_id = Column(Integer, ForeignKey("academies.id"), nullable=False)
    
    # Course details
    slug = Column(String(100), nullable=False, index=True)  # e.g., "curious-path", "debt-elimination"
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)
    short_description = Column(String(500), nullable=True)
    
    # Content and structure
    learning_objectives = Column(JSON, nullable=True)  # Array of learning objectives
    prerequisites = Column(JSON, nullable=True)  # Array of prerequisite course IDs or skills
    estimated_duration_hours = Column(Integer, nullable=True)  # Total estimated hours
    difficulty_level = Column(String(20), default="beginner")  # beginner, intermediate, advanced
    
    # Media
    thumbnail_url = Column(String(500), nullable=True)
    video_preview_url = Column(String(500), nullable=True)
    
    # Pricing and access
    price_usd = Column(Numeric(10, 2), nullable=True)  # Null means free
    is_bundle = Column(Boolean, default=False)  # Is this a bundle of other courses/modules?
    bundle_discount_percent = Column(Integer, nullable=True)  # Discount when buying as bundle
    
    # Status and ordering
    is_published = Column(Boolean, default=False)
    is_featured = Column(Boolean, default=False)
    sort_order = Column(Integer, default=0)
    
    # SEO and metadata
    meta_title = Column(String(200), nullable=True)
    meta_description = Column(String(500), nullable=True)
    tags = Column(JSON, nullable=True)  # Array of tags for categorization
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc), nullable=False)
    published_at = Column(DateTime(timezone=True), nullable=True)
    
    # Relationships
    academy = relationship("Academy", back_populates="courses")
    modules = relationship("Module", back_populates="course", cascade="all, delete-orphan", order_by="Module.sort_order")
    payments = relationship("Payment", back_populates="course")

    def __repr__(self):
        return f"<Course(id={self.id}, slug='{self.slug}', title='{self.title}')>"

    def to_dict(self, include_modules=False):
        """Convert to dictionary"""
        result = {
            "id": self.id,
            "academy_id": self.academy_id,
            "slug": self.slug,
            "title": self.title,
            "description": self.description,
            "short_description": self.short_description,
            "learning_objectives": self.learning_objectives,
            "prerequisites": self.prerequisites,
            "estimated_duration_hours": self.estimated_duration_hours,
            "difficulty_level": self.difficulty_level,
            "thumbnail_url": self.thumbnail_url,
            "video_preview_url": self.video_preview_url,
            "price_usd": float(self.price_usd) if self.price_usd else None,
            "is_bundle": self.is_bundle,
            "bundle_discount_percent": self.bundle_discount_percent,
            "is_published": self.is_published,
            "is_featured": self.is_featured,
            "sort_order": self.sort_order,
            "meta_title": self.meta_title,
            "meta_description": self.meta_description,
            "tags": self.tags,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
            "published_at": self.published_at.isoformat() if self.published_at else None,
        }
        
        if include_modules:
            result["modules"] = [module.to_dict() for module in self.modules]
            
        return result

    @property
    def is_free(self):
        """Check if course is free"""
        return self.price_usd is None or self.price_usd == 0

    def get_total_modules(self):
        """Get total number of modules in this course"""
        return len(self.modules)

    def get_estimated_duration_formatted(self):
        """Get formatted duration string"""
        if not self.estimated_duration_hours:
            return "Duration not specified"
        
        hours = int(self.estimated_duration_hours)
        if hours < 1:
            return "Less than 1 hour"
        elif hours == 1:
            return "1 hour"
        else:
            return f"{hours} hours"