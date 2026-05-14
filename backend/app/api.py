from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from . import models, schemas, database
from .services import gemini

router = APIRouter()

def get_key(db: Session, platform: str) -> str | None:
    record = db.query(models.ApiKeyConfig).filter(models.ApiKeyConfig.platform == platform).first()
    return record.key_value if record else None

def set_key(db: Session, platform: str, key_value: str | None):
    if key_value is None:
        return
    record = db.query(models.ApiKeyConfig).filter(models.ApiKeyConfig.platform == platform).first()
    if record:
        record.key_value = key_value
    else:
        new_record = models.ApiKeyConfig(platform=platform, key_value=key_value)
        db.add(new_record)

@router.get("/config/keys", response_model=schemas.ApiKeyResponse)
def read_keys(db: Session = Depends(database.get_db)):
    return schemas.ApiKeyResponse(
        gemini_key=get_key(db, "gemini"),
        veo_key=get_key(db, "veo"),
        nanobana_key=get_key(db, "nanobana"),
        tiktok_token=get_key(db, "tiktok")
    )

@router.post("/config/keys")
def update_keys(keys: schemas.ApiKeyUpdate, db: Session = Depends(database.get_db)):
    set_key(db, "gemini", keys.gemini_key)
    set_key(db, "veo", keys.veo_key)
    set_key(db, "nanobana", keys.nanobana_key)
    set_key(db, "tiktok", keys.tiktok_token)
    db.commit()
    return {"message": "API Keys updated successfully"}

@router.post("/scripts/generate", response_model=schemas.ScriptGenResponse)
def generate_script(request: schemas.ScriptGenRequest, db: Session = Depends(database.get_db)):
    try:
        response = gemini.generate_tiktok_script(db, request)
        return response
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")

from .services import trend_analyzer
@router.post("/trends/analyze", response_model=schemas.TrendAnalyzeResponse)
async def analyze_trends(request: schemas.TrendAnalyzeRequest):
    try:
        # Currently using mock data as requested
        return await trend_analyzer.generate_mock_trends(request.category)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
