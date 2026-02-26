"""
Assessment model for Socratic assessment flow and persona recommendations
"""
from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, DateTime, Boolean, Text, JSON, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base


class Assessment(Base):
    """Assessment model for tracking user assessments"""
    __tablename__ = "assessments"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)  # Nullable for anonymous assessments
    academy_id = Column(Integer, ForeignKey("academies.id"), nullable=False)
    
    # Session tracking
    session_id = Column(String(100), nullable=False, unique=True, index=True)  # UUID for anonymous tracking
    
    # Questions and answers (entire assessment flow stored as JSON)
    questions = Column(JSON, nullable=False)  # Array of question objects
    answers = Column(JSON, nullable=True)  # Array of answer objects (populated as user completes)
    scores = Column(JSON, nullable=True)  # Scoring breakdown by persona
    
    # Results
    persona_id = Column(String(100), nullable=True)  # Assigned persona (e.g., "debt_eliminator")
    persona_name = Column(String(200), nullable=True)
    persona_description = Column(Text, nullable=True)
    
    # Recommended learning paths
    recommended_path = Column(JSON, nullable=True)  # Ordered array of module/course IDs
    recommended_courses = Column(JSON, nullable=True)  # Course IDs to take first
    
    # Assessment status
    is_completed = Column(Boolean, default=False)
    is_anonymous = Column(Boolean, default=True)
    
    # Meta
    ip_address = Column(String(50), nullable=True)  # For rate limiting and analytics
    user_agent = Column(String(500), nullable=True)
    
    # Timestamps
    started_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)
    completed_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)
    
    # Relationships
    user = relationship("User", back_populates="assessments")
    academy = relationship("Academy", back_populates="assessments")

    def __repr__(self):
        return f"<Assessment(id={self.id}, session_id='{self.session_id}', persona='{self.persona_id}')>"

    def to_dict(self, include_answers=True):
        """Convert to dictionary"""
        result = {
            "id": self.id,
            "user_id": self.user_id,
            "academy_id": self.academy_id,
            "session_id": self.session_id,
            "questions": self.questions,
            "persona_id": self.persona_id,
            "persona_name": self.persona_name,
            "persona_description": self.persona_description,
            "recommended_path": self.recommended_path,
            "recommended_courses": self.recommended_courses,
            "is_completed": self.is_completed,
            "is_anonymous": self.is_anonymous,
            "started_at": self.started_at.isoformat() if self.started_at else None,
            "completed_at": self.completed_at.isoformat() if self.completed_at else None,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }
        
        if include_answers:
            result.update({
                "answers": self.answers,
                "scores": self.scores,
            })
        
        return result

    def get_current_question_index(self):
        """Get the index of the current (unanswered) question"""
        if not self.answers:
            return 0
        return len(self.answers)

    def is_finished(self):
        """Check if assessment is finished"""
        if not self.questions:
            return False
        answered = len(self.answers) if self.answers else 0
        return answered >= len(self.questions)

    def get_completion_percentage(self):
        """Get assessment completion percentage"""
        if not self.questions:
            return 0
        total = len(self.questions)
        answered = len(self.answers) if self.answers else 0
        return round((answered / total) * 100)