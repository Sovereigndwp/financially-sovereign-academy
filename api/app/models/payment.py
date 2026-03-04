"""
Payment model for Stripe and BTCPay transactions
"""
from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, DateTime, Boolean, Text, JSON, ForeignKey, Numeric, Enum
from sqlalchemy.orm import relationship
import enum as python_enum
from app.database import Base


class PaymentProvider(str, python_enum.Enum):
    """Supported payment providers"""
    STRIPE = "stripe"
    BTCPAY = "btcpay"


class PaymentStatus(str, python_enum.Enum):
    """Payment status"""
    PENDING = "pending"
    COMPLETED = "completed"
    FAILED = "failed"
    REFUNDED = "refunded"
    EXPIRED = "expired"


class Payment(Base):
    """Payment model for tracking payment transactions"""
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)  # Nullable for guest checkout
    course_id = Column(Integer, ForeignKey("courses.id"), nullable=True)
    
    # Payment provider details
    provider = Column(String(20), nullable=False)  # stripe, btcpay
    provider_session_id = Column(String(500), nullable=True, index=True)  # Stripe session ID or BTCPay invoice ID
    provider_transaction_id = Column(String(500), nullable=True)  # Final transaction/charge ID
    
    # Customer info (for guest checkout)
    customer_email = Column(String(255), nullable=False, index=True)
    customer_name = Column(String(200), nullable=True)
    
    # Amount information
    amount_usd = Column(Numeric(10, 2), nullable=False)  # Amount in USD
    amount_btc = Column(Numeric(16, 8), nullable=True)  # Amount in BTC (for BTCPay)
    currency = Column(String(10), default="USD")
    discount_amount = Column(Numeric(10, 2), nullable=True)
    
    # Items purchased
    items = Column(JSON, nullable=False)  # Array of purchased items
    
    # Status
    status = Column(String(20), default=PaymentStatus.PENDING)
    failure_reason = Column(String(500), nullable=True)
    
    # Access token (generated after payment)
    access_token = Column(Text, nullable=True)
    token_generated_at = Column(DateTime(timezone=True), nullable=True)
    
    # Email delivery
    email_sent = Column(Boolean, default=False)
    email_sent_at = Column(DateTime(timezone=True), nullable=True)
    
    # Refund information
    refunded_at = Column(DateTime(timezone=True), nullable=True)
    refund_reason = Column(String(500), nullable=True)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc), nullable=False)
    completed_at = Column(DateTime(timezone=True), nullable=True)
    
    # Relationships
    user = relationship("User", back_populates="payments")
    course = relationship("Course", back_populates="payments")

    def __repr__(self):
        return f"<Payment(id={self.id}, provider='{self.provider}', status='{self.status}', amount=${self.amount_usd})>"

    def to_dict(self, include_token=False):
        """Convert to dictionary"""
        result = {
            "id": self.id,
            "user_id": self.user_id,
            "course_id": self.course_id,
            "provider": self.provider,
            "provider_session_id": self.provider_session_id,
            "customer_email": self.customer_email,
            "amount_usd": float(self.amount_usd) if self.amount_usd else None,
            "amount_btc": float(self.amount_btc) if self.amount_btc else None,
            "currency": self.currency,
            "discount_amount": float(self.discount_amount) if self.discount_amount else None,
            "items": self.items,
            "status": self.status,
            "email_sent": self.email_sent,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
            "completed_at": self.completed_at.isoformat() if self.completed_at else None,
        }
        
        if include_token:
            result["access_token"] = self.access_token
            
        return result

    @property
    def is_successful(self):
        """Check if payment was successful"""
        return self.status == PaymentStatus.COMPLETED


class Entitlement(Base):
    """Entitlement model for granting access to courses/modules"""
    __tablename__ = "entitlements"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    academy_id = Column(Integer, ForeignKey("academies.id"), nullable=False)
    payment_id = Column(Integer, ForeignKey("payments.id"), nullable=True)

    # Institutional licensing (set when access was granted via tenant, not individual purchase)
    tenant_id = Column(Integer, ForeignKey("tenants.id"), nullable=True, index=True)
    access_code_id = Column(Integer, ForeignKey("access_codes.id"), nullable=True)

    # What they have access to
    modules = Column(JSON, nullable=False, default=list)  # Array of module slugs/IDs
    courses = Column(JSON, nullable=False, default=list)  # Array of course slugs/IDs
    has_full_access = Column(Boolean, default=False)  # Access to everything in the academy
    
    # Access token
    access_token = Column(Text, nullable=True)  # JWT token for this entitlement
    
    # Validity
    is_active = Column(Boolean, default=True)
    granted_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)
    expires_at = Column(DateTime(timezone=True), nullable=True)  # Null means lifetime access
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc), nullable=False)
    
    # Relationships
    user = relationship("User", back_populates="entitlements")
    academy = relationship("Academy", back_populates="entitlements")
    tenant = relationship("Tenant", back_populates="entitlements")
    access_code = relationship("AccessCode")

    def __repr__(self):
        return f"<Entitlement(id={self.id}, user_id={self.user_id}, academy_id={self.academy_id})>"

    def to_dict(self):
        """Convert to dictionary"""
        return {
            "id": self.id,
            "user_id": self.user_id,
            "academy_id": self.academy_id,
            "payment_id": self.payment_id,
            "modules": self.modules,
            "courses": self.courses,
            "has_full_access": self.has_full_access,
            "is_active": self.is_active,
            "granted_at": self.granted_at.isoformat() if self.granted_at else None,
            "expires_at": self.expires_at.isoformat() if self.expires_at else None,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }

    def has_module_access(self, module_id: str) -> bool:
        """Check if entitlement grants access to a specific module"""
        if not self.is_active:
            return False
        if self.has_full_access:
            return True
        return module_id in (self.modules or [])

    def has_course_access(self, course_id: str) -> bool:
        """Check if entitlement grants access to a specific course"""
        if not self.is_active:
            return False
        if self.has_full_access:
            return True
        return course_id in (self.courses or [])

    @property
    def is_valid(self):
        """Check if entitlement is currently valid"""
        if not self.is_active:
            return False
        if self.expires_at:
            from datetime import datetime, timezone
            return datetime.now(timezone.utc) < self.expires_at
        return True