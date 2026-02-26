from fastapi import APIRouter

router = APIRouter()


@router.get("/health")
async def modules_health():
    return {"service": "modules", "status": "ok"}

