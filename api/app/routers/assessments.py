from fastapi import APIRouter

router = APIRouter()


@router.get("/health")
async def assessments_health():
    return {"service": "assessments", "status": "ok"}

