"""
Usage reporting service for institutional clients.

Provides aggregated metrics that municipal grant programs and DOC contracts
require for compliance: completion rates, seat utilization, active users, etc.
"""
from datetime import datetime, timedelta, timezone

from sqlalchemy import select, func, and_
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.tenant import Tenant, TenantUser
from app.models.access_code import AccessCode
from app.models.payment import Entitlement
from app.models.progress import UserProgress
from app.models.module import Module
from app.models.user import User


async def get_tenant_usage_report(db: AsyncSession, tenant: Tenant) -> dict:
    """
    Generate a comprehensive usage report for a tenant.

    Returns metrics needed for grant compliance and institutional reporting:
    - Seat utilization
    - Active user counts (7d / 30d)
    - Module completion rates
    - Average time spent
    - Access code redemption stats
    """
    now = datetime.now(timezone.utc)
    seven_days_ago = now - timedelta(days=7)
    thirty_days_ago = now - timedelta(days=30)

    # ── Seat utilization ──────────────────────────────────────────────
    total_members = await db.scalar(
        select(func.count(TenantUser.id)).where(
            TenantUser.tenant_id == tenant.id,
            TenantUser.is_active == True,
        )
    ) or 0

    learner_count = await db.scalar(
        select(func.count(TenantUser.id)).where(
            TenantUser.tenant_id == tenant.id,
            TenantUser.is_active == True,
            TenantUser.role == "learner",
        )
    ) or 0

    # ── Active users (learners with progress in last N days) ──────────
    # Subquery: user_ids in this tenant
    tenant_user_ids = select(TenantUser.user_id).where(
        TenantUser.tenant_id == tenant.id,
        TenantUser.is_active == True,
    ).scalar_subquery()

    active_7d = await db.scalar(
        select(func.count(func.distinct(UserProgress.user_id))).where(
            UserProgress.user_id.in_(select(TenantUser.user_id).where(
                TenantUser.tenant_id == tenant.id, TenantUser.is_active == True
            )),
            UserProgress.last_accessed_at >= seven_days_ago,
        )
    ) or 0

    active_30d = await db.scalar(
        select(func.count(func.distinct(UserProgress.user_id))).where(
            UserProgress.user_id.in_(select(TenantUser.user_id).where(
                TenantUser.tenant_id == tenant.id, TenantUser.is_active == True
            )),
            UserProgress.last_accessed_at >= thirty_days_ago,
        )
    ) or 0

    # ── Module completion rates ───────────────────────────────────────
    # Total progress records for tenant learners
    total_started = await db.scalar(
        select(func.count(UserProgress.id)).where(
            UserProgress.user_id.in_(select(TenantUser.user_id).where(
                TenantUser.tenant_id == tenant.id, TenantUser.is_active == True
            )),
            UserProgress.is_started == True,
        )
    ) or 0

    total_completed = await db.scalar(
        select(func.count(UserProgress.id)).where(
            UserProgress.user_id.in_(select(TenantUser.user_id).where(
                TenantUser.tenant_id == tenant.id, TenantUser.is_active == True
            )),
            UserProgress.is_completed == True,
        )
    ) or 0

    completion_rate = round(total_completed / total_started * 100, 1) if total_started > 0 else 0.0

    # ── Average time spent ────────────────────────────────────────────
    avg_time = await db.scalar(
        select(func.avg(UserProgress.time_spent_seconds)).where(
            UserProgress.user_id.in_(select(TenantUser.user_id).where(
                TenantUser.tenant_id == tenant.id, TenantUser.is_active == True
            )),
            UserProgress.time_spent_seconds > 0,
        )
    )
    avg_time_minutes = round((avg_time or 0) / 60, 1)

    # ── Access code stats ─────────────────────────────────────────────
    total_codes = await db.scalar(
        select(func.count(AccessCode.id)).where(AccessCode.tenant_id == tenant.id)
    ) or 0

    redeemed_codes = await db.scalar(
        select(func.count(AccessCode.id)).where(
            AccessCode.tenant_id == tenant.id,
            AccessCode.times_used > 0,
        )
    ) or 0

    active_codes = await db.scalar(
        select(func.count(AccessCode.id)).where(
            AccessCode.tenant_id == tenant.id,
            AccessCode.is_active == True,
            AccessCode.times_used < AccessCode.max_uses,
        )
    ) or 0

    return {
        "tenant_slug": tenant.slug,
        "tenant_name": tenant.name,
        "report_generated_at": now.isoformat(),
        "license": {
            "tier": tenant.license_tier,
            "max_seats": tenant.max_seats,
            "start": tenant.license_start.isoformat() if tenant.license_start else None,
            "end": tenant.license_end.isoformat() if tenant.license_end else None,
            "is_valid": tenant.is_license_valid,
        },
        "seats": {
            "total_members": total_members,
            "learners": learner_count,
            "utilization_percent": round(learner_count / tenant.max_seats * 100, 1) if tenant.max_seats > 0 else 0.0,
        },
        "activity": {
            "active_last_7_days": active_7d,
            "active_last_30_days": active_30d,
        },
        "progress": {
            "modules_started": total_started,
            "modules_completed": total_completed,
            "completion_rate_percent": completion_rate,
            "avg_time_per_module_minutes": avg_time_minutes,
        },
        "access_codes": {
            "total_generated": total_codes,
            "redeemed": redeemed_codes,
            "still_available": active_codes,
            "redemption_rate_percent": round(redeemed_codes / total_codes * 100, 1) if total_codes > 0 else 0.0,
        },
    }
