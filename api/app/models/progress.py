"""
User progress model for tracking module completion and quiz scores
"""
from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, DateTime, Boolean, JSON, ForeignKey, Float
from sqlalchemy.orm import relationship
from app.database import Base


class UserProgress(Base):
    """User progress model for tracking module completion"""
    __tablename__ = "user_progress"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    module_id = Column(Integer, ForeignKey("modules.id"), nullable=False, index=True)

    # Progress tracking
    is_started = Column(Boolean, default=False)
    is_completed = Column(Boolean, default=False)
    progress_percent = Column(Integer, default=0)  # 0-100

    # Quiz/assessment results
    quiz_score = Column(Float, nullable=True)
    quiz_attempts = Column(Integer, default=0)
    quiz_passed = Column(Boolean, default=False)
    quiz_answers = Column(JSON, nullable=True)  # Stores each attempt's answers

    # Scenario data (branching scenarios)
    scenario_choices = Column(JSON, nullable=True)

    # Time tracking
    time_spent_seconds = Column(Integer, default=0)

    # Timestamps
    started_at = Column(DateTime(timezone=True), nullable=True)
    completed_at = Column(DateTime(timezone=True), nullable=True)
    last_accessed_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc), nullable=False)

    # Relationships
    user = relationship("User", back_populates="progress")
    module = relationship("Module", back_populates="progress")

    def __repr__(self):
        return f"<UserProgress(user_id={self.user_id}, module_id={self.module_id}, completed={self.is_completed})>"

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "module_id": self.module_id,
            "is_started": self.is_started,
            "is_completed": self.is_completed,
            "progress_percent": self.progress_percent,
            "quiz_score": self.quiz_score,
            "quiz_attempts": self.quiz_attempts,
            "quiz_passed": self.quiz_passed,
            "time_spent_seconds": self.time_spent_seconds,
            "started_at": self.started_at.isoformat() if self.started_at else None,
            "completed_at": self.completed_at.isoformat() if self.completed_at else None,
            "last_accessed_at": self.last_accessed_at.isoformat() if self.last_accessed_at else None,
        }
