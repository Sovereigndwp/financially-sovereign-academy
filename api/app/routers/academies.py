from fastapi import APIRouter

router = APIRouter()


@router.get("/health")
async def academies_health():
    return {"service": "academies", "status": "ok"}

