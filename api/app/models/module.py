"""
Module model for course modules and lessons
"""
from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, DateTime, Boolean, Text, JSON, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base


class Module(Base):
    """Module model for course modules and lessons"""
    __tablename__ = "modules"

    id = Column(Integer, primary_key=True, index=True)
    course_id = Column(Integer, ForeignKey("courses.id"), nullable=False)
    
    # Module details
    slug = Column(String(100), nullable=False, index=True)  # e.g., "money-mindset-cash-flow"
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)
    
    # Content
    content = Column(Text, nullable=True)  # Main module content (HTML/Markdown)
    content_type = Column(String(20), default="html")  # html, markdown, interactive
    
    # Interactive elements
    quiz_data = Column(JSON, nullable=True)  # Quiz questions and answers
    calculator_config = Column(JSON, nullable=True)  # Calculator configuration
    scenario_data = Column(JSON, nullable=True)  # Branching scenario configuration
    
    # Media and resources
    video_url = Column(String(500), nullable=True)
    audio_url = Column(String(500), nullable=True)
    thumbnail_url = Column(String(500), nullable=True)
    resources = Column(JSON, nullable=True)  # Additional resources, links, downloads
    
    # Learning structure
    learning_objectives = Column(JSON, nullable=True)  # What students will learn
    estimated_duration_minutes = Column(Integer, nullable=True)
    difficulty_level = Column(String(20), default="beginner")
    
    # Module ordering and status
    sort_order = Column(Integer, default=0, nullable=False)
    is_published = Column(Boolean, default=False)
    is_preview = Column(Boolean, default=False)  # Can be accessed without purchase
    is_required = Column(Boolean, default=True)  # Required to complete course
    
    # Assessment and completion
    passing_score = Column(Integer, default=70)  # Minimum score to pass (if quiz exists)
    max_attempts = Column(Integer, default=3)  # Max quiz attempts
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc), nullable=False)
    published_at = Column(DateTime(timezone=True), nullable=True)
    
    # Relationships
    course = relationship("Course", back_populates="modules")
    progress = relationship("UserProgress", back_populates="module", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Module(id={self.id}, slug='{self.slug}', title='{self.title}')>"

    def to_dict(self, include_content=False):
        """Convert to dictionary"""
        result = {
            "id": self.id,
            "course_id": self.course_id,
            "slug": self.slug,
            "title": self.title,
            "description": self.description,
            "content_type": self.content_type,
            "video_url": self.video_url,
            "audio_url": self.audio_url,
            "thumbnail_url": self.thumbnail_url,
            "resources": self.resources,
            "learning_objectives": self.learning_objectives,
            "estimated_duration_minutes": self.estimated_duration_minutes,
            "difficulty_level": self.difficulty_level,
            "sort_order": self.sort_order,
            "is_published": self.is_published,
            "is_preview": self.is_preview,
            "is_required": self.is_required,
            "passing_score": self.passing_score,
            "max_attempts": self.max_attempts,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
            "published_at": self.published_at.isoformat() if self.published_at else None,
        }
        
        # Include full content only when explicitly requested (e.g., for enrolled users)
        if include_content:
            result.update({
                "content": self.content,
                "quiz_data": self.quiz_data,
                "calculator_config": self.calculator_config,
                "scenario_data": self.scenario_data,
            })
            
        return result

    def has_quiz(self):
        """Check if module has a quiz"""
        return self.quiz_data is not None and len(self.quiz_data.get("questions", [])) > 0

    def has_calculator(self):
        """Check if module has an interactive calculator"""
        return self.calculator_config is not None

    def has_scenario(self):
        """Check if module has a branching scenario"""
        return self.scenario_data is not None

    def get_estimated_duration_formatted(self):
        """Get formatted duration string"""
        if not self.estimated_duration_minutes:
            return "Duration not specified"
        
        minutes = int(self.estimated_duration_minutes)
        if minutes < 60:
            return f"{minutes} minutes"
        else:
            hours = minutes // 60
            remaining_minutes = minutes % 60
            if remaining_minutes == 0:
                return f"{hours} hour{'s' if hours != 1 else ''}"
            else:
                return f"{hours}h {remaining_minutes}m"

    def get_content_preview(self, max_length=200):
        """Get a preview of the module content"""
        if not self.content:
            return self.description or ""
        
        # Strip HTML tags for preview
        import re
        clean_content = re.sub(r'<[^>]+>', '', self.content)
        
        if len(clean_content) <= max_length:
            return clean_content
        else:
            return clean_content[:max_length].rsplit(' ', 1)[0] + "..."