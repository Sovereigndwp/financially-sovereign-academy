from fastapi import APIRouter

router = APIRouter()


@router.get("/health")
async def payments_health():
    return {"service": "payments", "status": "ok"}

