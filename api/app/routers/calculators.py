from fastapi import APIRouter

router = APIRouter()


@router.get("/health")
async def calculators_health():
    return {"service": "calculators", "status": "ok"}

