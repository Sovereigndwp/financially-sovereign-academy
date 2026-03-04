"""
Tenants router: CRUD for institutional clients, access code generation,
and usage reporting.

All endpoints require admin authentication.
"""
import re
from datetime import datetime, timezone
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel, EmailStr, Field
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.database import get_db
from app.auth_utils import require_admin
from app.models.tenant import Tenant, TenantUser, TenantType, LicenseTier, TenantRole
from app.models.access_code import AccessCode, generate_code
from app.models.user import User
from app.services.reporting import get_tenant_usage_report

router = APIRouter()


# ---------------------------------------------------------------------------
# Schemas
# ---------------------------------------------------------------------------

class CreateTenantRequest(BaseModel):
    name: str = Field(min_length=2, max_length=200)
    slug: str | None = None  # Auto-generated from name if not provided
    type: str = TenantType.MUNICIPAL
    contact_name: str | None = None
    contact_email: EmailStr | None = None
    contact_phone: str | None = None
    branding: dict | None = None
    config: dict | None = None
    max_seats: int = Field(default=50, ge=1, le=100000)
    license_tier: str = LicenseTier.STARTER
    license_start: datetime | None = None
    license_end: datetime | None = None


class UpdateTenantRequest(BaseModel):
    name: str | None = None
    type: str | None = None
    contact_name: str | None = None
    contact_email: EmailStr | None = None
    contact_phone: str | None = None
    branding: dict | None = None
    config: dict | None = None
    max_seats: int | None = Field(default=None, ge=1, le=100000)
    license_tier: str | None = None
    license_start: datetime | None = None
    license_end: datetime | None = None
    is_active: bool | None = None


class GenerateCodesRequest(BaseModel):
    count: int = Field(ge=1, le=1000, description="Number of access codes to generate")
    max_uses: int = Field(default=1, ge=1, le=100)
    modules: list[str] | None = None  # Restrict to specific modules, or null for all
    expires_at: datetime | None = None
    label: str | None = Field(default=None, max_length=200, description="Batch label, e.g. 'Spring 2026 Cohort'")


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def slugify(name: str) -> str:
    """Generate a URL-safe slug from a name."""
    slug = name.lower().strip()
    slug = re.sub(r"[^a-z0-9]+", "-", slug)
    slug = slug.strip("-")
    return slug


async def get_tenant_or_404(slug: str, db: AsyncSession) -> Tenant:
    """Fetch a tenant by slug or raise 404."""
    result = await db.execute(select(Tenant).where(Tenant.slug == slug))
    tenant = result.scalar_one_or_none()
    if not tenant:
        raise HTTPException(status_code=404, detail=f"Tenant '{slug}' not found")
    return tenant


# ---------------------------------------------------------------------------
# Tenant CRUD
# ---------------------------------------------------------------------------

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_tenant(
    body: CreateTenantRequest,
    admin=Depends(require_admin),
    db: AsyncSession = Depends(get_db),
):
    """Create a new institutional client."""
    slug = body.slug or slugify(body.name)

    # Check uniqueness
    existing = await db.execute(select(Tenant).where(Tenant.slug == slug))
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=409, detail=f"Tenant slug '{slug}' already exists")

    tenant = Tenant(
        slug=slug,
        name=body.name,
        type=body.type,
        contact_name=body.contact_name,
        contact_email=body.contact_email,
        contact_phone=body.contact_phone,
        branding=body.branding or {},
        config=body.config or {},
        max_seats=body.max_seats,
        license_tier=body.license_tier,
        license_start=body.license_start,
        license_end=body.license_end,
        is_active=True,
    )
    db.add(tenant)
    await db.commit()
    await db.refresh(tenant)

    return tenant.to_dict()


@router.get("/")
async def list_tenants(
    active_only: bool = Query(True, description="Only show active tenants"),
    admin=Depends(require_admin),
    db: AsyncSession = Depends(get_db),
):
    """List all institutional clients."""
    query = select(Tenant)
    if active_only:
        query = query.where(Tenant.is_active == True)
    query = query.order_by(Tenant.created_at.desc())

    result = await db.execute(query)
    tenants = result.scalars().all()
    return [t.to_dict() for t in tenants]


@router.get("/{slug}")
async def get_tenant(
    slug: str,
    admin=Depends(require_admin),
    db: AsyncSession = Depends(get_db),
):
    """Get a single tenant by slug."""
    tenant = await get_tenant_or_404(slug, db)
    return tenant.to_dict()


@router.patch("/{slug}")
async def update_tenant(
    slug: str,
    body: UpdateTenantRequest,
    admin=Depends(require_admin),
    db: AsyncSession = Depends(get_db),
):
    """Update tenant configuration, branding, seats, or license."""
    tenant = await get_tenant_or_404(slug, db)

    update_data = body.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(tenant, field, value)

    await db.commit()
    await db.refresh(tenant)
    return tenant.to_dict()


# ---------------------------------------------------------------------------
# Access Code Management
# ---------------------------------------------------------------------------

@router.post("/{slug}/access-codes", status_code=status.HTTP_201_CREATED)
async def generate_access_codes(
    slug: str,
    body: GenerateCodesRequest,
    admin=Depends(require_admin),
    db: AsyncSession = Depends(get_db),
):
    """
    Generate batch of access codes for a tenant.

    Typical workflow for correctional facilities:
    1. Admin generates codes (e.g. 200 for a new cohort)
    2. Facility staff prints codes on cards
    3. Learners redeem codes via POST /access/redeem
    """
    tenant = await get_tenant_or_404(slug, db)

    if not tenant.is_license_valid:
        raise HTTPException(status_code=400, detail="Tenant license is not active or has expired")

    # Check seat capacity
    current_codes = await db.scalar(
        select(func.count(AccessCode.id)).where(
            AccessCode.tenant_id == tenant.id,
            AccessCode.is_active == True,
        )
    ) or 0

    current_members = await db.scalar(
        select(func.count(TenantUser.id)).where(
            TenantUser.tenant_id == tenant.id,
            TenantUser.is_active == True,
        )
    ) or 0

    # Codes + existing members shouldn't exceed seat cap
    if (current_members + current_codes + body.count) > tenant.max_seats:
        raise HTTPException(
            status_code=400,
            detail=f"Would exceed seat limit ({tenant.max_seats}). "
                   f"Current members: {current_members}, unredeemed codes: {current_codes}, requested: {body.count}",
        )

    codes = []
    for _ in range(body.count):
        code = AccessCode(
            tenant_id=tenant.id,
            code=generate_code(),
            max_uses=body.max_uses,
            modules=body.modules,
            expires_at=body.expires_at,
            label=body.label,
            created_by_user_id=admin.id,
        )
        db.add(code)
        codes.append(code)

    await db.commit()

    # Refresh to get IDs
    for c in codes:
        await db.refresh(c)

    return {
        "tenant_slug": slug,
        "count": len(codes),
        "label": body.label,
        "codes": [c.to_dict() for c in codes],
    }


@router.get("/{slug}/access-codes")
async def list_access_codes(
    slug: str,
    active_only: bool = Query(True),
    label: str | None = Query(None, description="Filter by batch label"),
    admin=Depends(require_admin),
    db: AsyncSession = Depends(get_db),
):
    """List access codes for a tenant with usage stats."""
    tenant = await get_tenant_or_404(slug, db)

    query = select(AccessCode).where(AccessCode.tenant_id == tenant.id)
    if active_only:
        query = query.where(AccessCode.is_active == True)
    if label:
        query = query.where(AccessCode.label == label)
    query = query.order_by(AccessCode.created_at.desc())

    result = await db.execute(query)
    codes = result.scalars().all()

    return {
        "tenant_slug": slug,
        "count": len(codes),
        "codes": [c.to_dict() for c in codes],
    }


@router.delete("/{slug}/access-codes/{code}")
async def revoke_access_code(
    slug: str,
    code: str,
    admin=Depends(require_admin),
    db: AsyncSession = Depends(get_db),
):
    """Revoke (deactivate) a specific access code."""
    tenant = await get_tenant_or_404(slug, db)

    result = await db.execute(
        select(AccessCode).where(
            AccessCode.tenant_id == tenant.id,
            AccessCode.code == code.upper(),
        )
    )
    access_code = result.scalar_one_or_none()
    if not access_code:
        raise HTTPException(status_code=404, detail=f"Access code '{code}' not found for this tenant")

    access_code.is_active = False
    await db.commit()

    return {"revoked": True, "code": code.upper()}


# ---------------------------------------------------------------------------
# Usage Reporting
# ---------------------------------------------------------------------------

@router.get("/{slug}/usage")
async def tenant_usage_report(
    slug: str,
    admin=Depends(require_admin),
    db: AsyncSession = Depends(get_db),
):
    """
    Aggregated usage report for an institutional client.

    Returns metrics for grant compliance and institutional reporting:
    - Seat utilization
    - Active user counts (7d / 30d)
    - Module completion rates
    - Average time spent
    - Access code redemption stats
    """
    tenant = await get_tenant_or_404(slug, db)
    return await get_tenant_usage_report(db, tenant)
