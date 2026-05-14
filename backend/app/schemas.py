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

class TrendAnalyzeRequest(BaseModel):
    category: str
    timeframe: str = "7 ngày"

class AudioTrend(BaseModel):
    name: str
    bpm: int
    mood: str

class ViralVideo(BaseModel):
    video_id: str
    source: str
    url: str
    viral_score: int
    hook_type: str
    hook_text: str
    script_structure: str
    audio_trend: AudioTrend
    visual_style: str
    product_usp: List[str]
    hashtags: List[str]
    caption_keywords: List[str]
    top_reason_viral: List[str]
    estimated_reach: int
    affiliate_placement: str

class TrendingProduct(BaseModel):
    product_name: str
    product_url: str
    estimated_sales: int
    price_range: str
    viral_potential: int

class TrendAnalyzeResponse(BaseModel):
    trending_videos: List[ViralVideo]
    trending_products: List[TrendingProduct]

