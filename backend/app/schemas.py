from pydantic import BaseModel
from typing import List, Optional

class ApiKeyUpdate(BaseModel):
    gemini_key: str | None = None
    veo_key: str | None = None
    nanobana_key: str | None = None
    tiktok_token: str | None = None

class ApiKeyResponse(BaseModel):
    gemini_key: str | None
    veo_key: str | None
    nanobana_key: str | None
    tiktok_token: str | None

class ScriptGenRequest(BaseModel):
    product_name: str
    original_price: str
    sale_price: str
    url: str
    usps: List[str]
    hook_type: str = "câu hỏi gây tò mò"
    visual_style: str = "aesthetic"
    audio_trend: str = "nhạc trending tiktok"
    target_duration: str = "30s"

class HookContent(BaseModel):
    text: str
    type: str
    overlay: str
    scene: str

class MainContent(BaseModel):
    voiceover: str
    scenes: List[str]
    overlays: List[str]

class SocialProof(BaseModel):
    type: str
    voiceover: str
    visual: str

class CTAContent(BaseModel):
    text: str
    method: str
    overlay: str

class ScriptGenResponse(BaseModel):
    script_full: str
    hook: HookContent
    main_content: MainContent
    social_proof: SocialProof
    cta: CTAContent
    caption: str
    hashtags_main: List[str]
    hashtags_secondary: List[str]
    audio_suggestion: str
    post_time: str
    thumbnail_suggestion: str
    ab_variant_hook: str

