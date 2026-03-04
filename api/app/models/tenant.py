"""
Tenant model for institutional clients (municipal programs, correctional facilities, etc.)
and TenantUser join table for user-tenant membership with roles.
"""
import enum as python_enum
from datetime import datetime, timezone

from sqlalchemy import (
    Column, Integer, String, DateTime, Boolean, Text, JSON,
    ForeignKey, Enum, UniqueConstraint,
)
from sqlalchemy.orm import relationship

from app.database import Base


class TenantType(str, python_enum.Enum):
    """Type of institutional client."""
    MUNICIPAL = "municipal"
    CORRECTIONAL = "correctional"
    SCHOOL = "school"
    ENTERPRISE = "enterprise"
    NONPROFIT = "nonprofit"


class LicenseTier(str, python_enum.Enum):
    """Licensed tier determines feature set and pricing."""
    STARTER = "starter"           # Up to 50 users, 10 demos, co-branded
    PROFESSIONAL = "professional"  # Up to 200 users, all demos, white-label option
    ENTERPRISE = "enterprise"      # Unlimited users, custom demos, API access


class TenantRole(str, python_enum.Enum):
    """Roles within a tenant organization."""
    ADMIN = "admin"            # Can manage tenant settings, generate codes, view reports
    FACILITATOR = "facilitator"  # Can view reports, distribute codes (e.g. corrections officer)
    LEARNER = "learner"        # End user consuming content


class Tenant(Base):
    """An institutional client that licenses FSA content."""
    __tablename__ = "tenants"

    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String(100), unique=True, index=True, nullable=False)
    name = Column(String(200), nullable=False)
    type = Column(String(20), nullable=False, default=TenantType.MUNICIPAL)

    # Contact
    contact_name = Column(String(200), nullable=True)
    contact_email = Column(String(255), nullable=True)
    contact_phone = Column(String(30), nullable=True)

    # Branding (logo URL, primary color, footer text — mirrors BSA's BrandingConfig)
    branding = Column(JSON, nullable=True, default=dict)

    # Configuration (feature flags, allowed module slugs, custom intro text)
    config = Column(JSON, nullable=True, default=dict)

    # Licensing
    max_seats = Column(Integer, nullable=False, default=50)
    license_tier = Column(String(20), nullable=False, default=LicenseTier.STARTER)
    license_start = Column(DateTime(timezone=True), nullable=True)
    license_end = Column(DateTime(timezone=True), nullable=True)

    # Status
    is_active = Column(Boolean, default=True, nullable=False)

    # Timestamps
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc),
                        onupdate=lambda: datetime.now(timezone.utc), nullable=False)

    # Relationships
    members = relationship("TenantUser", back_populates="tenant", cascade="all, delete-orphan")
    access_codes = relationship("AccessCode", back_populates="tenant", cascade="all, delete-orphan")
    entitlements = relationship("Entitlement", back_populates="tenant")

    def __repr__(self):
        return f"<Tenant(id={self.id}, slug='{self.slug}', name='{self.name}')>"

    def to_dict(self, include_stats: bool = False):
        result = {
            "id": self.id,
            "slug": self.slug,
            "name": self.name,
            "type": self.type,
            "contact_name": self.contact_name,
            "contact_email": self.contact_email,
            "contact_phone": self.contact_phone,
            "branding": self.branding,
            "config": self.config,
            "max_seats": self.max_seats,
            "license_tier": self.license_tier,
            "license_start": self.license_start.isoformat() if self.license_start else None,
            "license_end": self.license_end.isoformat() if self.license_end else None,
            "is_active": self.is_active,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }
        return result

    @property
    def allowed_modules(self) -> list[str] | None:
        """Return list of module slugs this tenant has access to, or None for all."""
        if self.config and "allowed_modules" in self.config:
            return self.config["allowed_modules"]
        return None

    @property
    def is_license_valid(self) -> bool:
        if not self.is_active:
            return False
        now = datetime.now(timezone.utc)
        if self.license_start and now < self.license_start:
            return False
        if self.license_end and now > self.license_end:
            return False
        return True


class TenantUser(Base):
    """Join table linking users to tenants with a role."""
    __tablename__ = "tenant_users"
    __table_args__ = (
        UniqueConstraint("tenant_id", "user_id", name="uq_tenant_user"),
    )

    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"), nullable=False, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    role = Column(String(20), nullable=False, default=TenantRole.LEARNER)

    is_active = Column(Boolean, default=True, nullable=False)
    joined_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)

    # Relationships
    tenant = relationship("Tenant", back_populates="members")
    user = relationship("User")

    def __repr__(self):
        return f"<TenantUser(tenant_id={self.tenant_id}, user_id={self.user_id}, role='{self.role}')>"

    def to_dict(self):
        return {
            "id": self.id,
            "tenant_id": self.tenant_id,
            "user_id": self.user_id,
            "role": self.role,
            "is_active": self.is_active,
            "joined_at": self.joined_at.isoformat() if self.joined_at else None,
        }
