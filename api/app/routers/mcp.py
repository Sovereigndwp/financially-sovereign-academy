from pathlib import Path
from fastapi import APIRouter, HTTPException

router = APIRouter()

PROJECT_ROOT = Path(__file__).resolve().parents[3]
MCP_DIR = PROJECT_ROOT / "mcp"
PROMPTS_DIR = MCP_DIR / "prompts"
BUILDER_FILE = MCP_DIR / "fsa-builder.js"


@router.get("/health")
async def mcp_health():
    return {
        "service": "mcp",
        "status": "ok",
        "builder_exists": BUILDER_FILE.exists(),
        "prompts_dir_exists": PROMPTS_DIR.exists(),
    }


@router.get("/prompts")
async def list_mcp_prompts():
    if not PROMPTS_DIR.exists():
        return {"prompts": []}
    prompts = sorted([p.name for p in PROMPTS_DIR.glob("*.txt") if p.is_file()])
    return {"prompts": prompts}


@router.get("/prompts/{prompt_name}")
async def get_mcp_prompt(prompt_name: str):
    safe_name = Path(prompt_name).name
    prompt_path = PROMPTS_DIR / safe_name

    if not prompt_path.exists() or not prompt_path.is_file():
        raise HTTPException(status_code=404, detail="Prompt not found")

    try:
        content = prompt_path.read_text(encoding="utf-8")
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Failed to read prompt: {exc}")

    return {
        "name": safe_name,
        "content": content,
    }


@router.get("/builder")
async def get_mcp_builder_source():
    if not BUILDER_FILE.exists():
        raise HTTPException(status_code=404, detail="Builder file not found")

    try:
        content = BUILDER_FILE.read_text(encoding="utf-8")
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Failed to read builder: {exc}")

    return {
        "name": BUILDER_FILE.name,
        "content": content,
    }
