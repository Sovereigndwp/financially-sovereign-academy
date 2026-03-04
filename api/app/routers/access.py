"""
Access router: learner-facing endpoints for code redemption and JWT verification.

This is the critical path for correctional facility users who have a
printed access code but no email address. No authentication required
for code redemption.
"""
import uuid
from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.auth_utils import create_access_token, get_current_user, decode_token
from app.models.access_code import AccessCode
from app.models.tenant import Tenant, TenantUser, TenantRole
from app.models.payment import Entitlement
from app.models.user import User

router = APIRouter()


# ---------------------------------------------------------------------------
# Schemas
# ---------------------------------------------------------------------------

class RedeemCodeRequest(BaseModel):
    code: str = Field(min_length=6, max_length=16, description="The access code printed on the card")
    display_name: str | None = Field(
        default=None,
        max_length=100,
        description="Optional display name (first name, alias, or participant ID)",
    )


class RedeemCodeResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    tenant_name: str
    modules: list[str] | None  # Entitled module slugs, or null for all
    message: str


class VerifyResponse(BaseModel):
    valid: bool
    user_id: int | None = None
    tenant_slug: str | None = None
    tenant_name: str | None = None
    modules: list[str] | None = None
    expires_at: str | None = None


# ---------------------------------------------------------------------------
# Endpoints
# ---------------------------------------------------------------------------

@router.post("/redeem", response_model=RedeemCodeResponse)
async def redeem_access_code(
    body: RedeemCodeRequest,
    db: AsyncSession = Depends(get_db),
):
    """
    Redeem an access code to gain content access.

    This endpoint does NOT require authentication. It:
    1. Validates the code exists and is redeemable
    2. Checks the tenant license is valid
    3. Creates an anonymous user account (no email required)
    4. Links user to tenant as a learner
    5. Creates an entitlement for the licensed modules
    6. Returns a JWT for subsequent API calls

    Designed for correctional facilities where learners have a printed
    code card but no email address.
    """
    code_str = body.code.upper().strip()

    # Look up the access code
    result = await db.execute(
        select(AccessCode).where(AccessCode.code == code_str)
    )
    access_code = result.scalar_one_or_none()

    if not access_code:
        raise HTTPException(status_code=404, detail="Access code not found")

    if not access_code.is_redeemable:
        if not access_code.is_active:
            raise HTTPException(status_code=410, detail="This access code has been revoked")
        if access_code.times_used >= access_code.max_uses:
            raise HTTPException(status_code=410, detail="This access code has already been used")
        if access_code.expires_at and datetime.now(timezone.utc) > access_code.expires_at:
            raise HTTPException(status_code=410, detail="This access code has expired")
        raise HTTPException(status_code=400, detail="This access code cannot be redeemed")

    # Fetch tenant and validate license
    result = await db.execute(select(Tenant).where(Tenant.id == access_code.tenant_id))
    tenant = result.scalar_one_or_none()

    if not tenant or not tenant.is_license_valid:
        raise HTTPException(status_code=403, detail="The organization's license is no longer active")

    # Determine which modules are unlocked
    # Priority: code-specific modules > tenant config > all modules
    entitled_modules = access_code.modules or tenant.allowed_modules

    # Create anonymous user
    anon_email = f"anon-{uuid.uuid4().hex[:12]}@{tenant.slug}.local"
    display_name = body.display_name or f"Learner-{code_str[:4]}"

    user = User(
        email=anon_email,
        password_hash="ACCESS_CODE_USER",  # Cannot login via password
        first_name=display_name,
        is_active=True,
        is_verified=False,
        is_admin=False,
    )
    db.add(user)
    await db.flush()  # Get user.id without committing

    # Link user to tenant
    tenant_user = TenantUser(
        tenant_id=tenant.id,
        user_id=user.id,
        role=TenantRole.LEARNER,
    )
    db.add(tenant_user)

    # Create entitlement
    entitlement = Entitlement(
        user_id=user.id,
        academy_id=1,  # FSA default academy ID
        tenant_id=tenant.id,
        access_code_id=access_code.id,
        modules=entitled_modules or [],
        has_full_access=(entitled_modules is None),
        is_active=True,
        expires_at=access_code.expires_at or tenant.license_end,
    )
    db.add(entitlement)

    # Update access code usage
    access_code.times_used += 1
    access_code.last_used_at = datetime.now(timezone.utc)
    if access_code.max_uses == 1:
        access_code.assigned_to_user_id = user.id

    await db.commit()
    await db.refresh(user)

    # Generate JWT
    token = create_access_token(
        user_id=user.id,
        email=user.email,
        is_admin=False,
        expires_hours=24 * 90,  # 90-day token for institutional users
    )

    return RedeemCodeResponse(
        access_token=token,
        tenant_name=tenant.name,
        modules=entitled_modules,
        message=f"Welcome to {tenant.name}! You now have access to the learning platform.",
    )


@router.get("/verify", response_model=VerifyResponse)
async def verify_access(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """
    Verify a JWT is valid and return the user's entitled modules.

    Used by the frontend to check if a learner still has access
    and which modules they can view.
    """
    # Find tenant membership
    result = await db.execute(
        select(TenantUser).where(
            TenantUser.user_id == user.id,
            TenantUser.is_active == True,
        )
    )
    tenant_user = result.scalar_one_or_none()

    tenant_slug = None
    tenant_name = None
    if tenant_user:
        result = await db.execute(select(Tenant).where(Tenant.id == tenant_user.tenant_id))
        tenant = result.scalar_one_or_none()
        if tenant:
            tenant_slug = tenant.slug
            tenant_name = tenant.name

    # Find active entitlement
    result = await db.execute(
        select(Entitlement).where(
            Entitlement.user_id == user.id,
            Entitlement.is_active == True,
        )
    )
    entitlement = result.scalar_one_or_none()

    modules = None
    expires_at = None
    if entitlement:
        if entitlement.has_full_access:
            modules = None  # null = all modules
        else:
            modules = entitlement.modules
        if entitlement.expires_at:
            expires_at = entitlement.expires_at.isoformat()

    return VerifyResponse(
        valid=True,
        user_id=user.id,
        tenant_slug=tenant_slug,
        tenant_name=tenant_name,
        modules=modules,
        expires_at=expires_at,
    )
