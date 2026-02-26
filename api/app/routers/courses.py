from fastapi import APIRouter

router = APIRouter()


@router.get("/health")
async def courses_health():
    return {"service": "courses", "status": "ok"}

