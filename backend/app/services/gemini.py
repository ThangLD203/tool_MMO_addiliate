import google.generativeai as genai
import json
from sqlalchemy.orm import Session
from .. import models, schemas

def get_gemini_key(db: Session) -> str:
    record = db.query(models.ApiKeyConfig).filter(models.ApiKeyConfig.platform == "gemini").first()
    if not record or not record.key_value:
        raise ValueError("Google Gemini API Key is not configured in the database.")
    return record.key_value

def generate_tiktok_script(db: Session, request: schemas.ScriptGenRequest) -> schemas.ScriptGenResponse:
    # Get key and configure client
    api_key = get_gemini_key(db)
    genai.configure(api_key=api_key)
    
    # Init model
    model = genai.GenerativeModel('gemini-2.0-flash')
    
    # Construct Prompt based on Module 2 System Prompt
    prompt = f"""
Bạn là một AI chuyên gia về MMO và TikTok Affiliate Marketing.
NHIỆM VỤ: Tạo Kịch Bản Video Affiliate Mới

### Đầu vào:
- Sản phẩm: {request.product_name}
- Giá gốc: {request.original_price} — Giá sale: {request.sale_price}
- Link affiliate: {request.url}
- USP sản phẩm: {", ".join(request.usps)}
- Hook type tham khảo: {request.hook_type}
- Visual style tham khảo: {request.visual_style}
- Nhạc trending: {request.audio_trend}
- Thời lượng video mục tiêu: {request.target_duration}

### Yêu cầu xây dựng kịch bản theo cấu trúc:
[0 – 3 GIÂY] HOOK — Bắt đầu ngay, không lời chào hỏi.
[3 – 15 GIÂY] NỘI DUNG CHÍNH — Trình bày vấn đề và giới thiệu USP.
[15 – 25 GIÂY] BẰNG CHỨNG / SOCIAL PROOF.
[25 – 30 GIÂY] CTA — Kêu gọi hành động rõ ràng.

Trả về kết quả BẮT BUỘC theo cấu trúc JSON (đúng schema dưới đây), KHÔNG có code block markdown:
{{
  "script_full": "string (toàn bộ kịch bản)",
  "hook": {{ "text": "", "type": "", "overlay": "", "scene": "" }},
  "main_content": {{ "voiceover": "", "scenes": [""], "overlays": [""] }},
  "social_proof": {{ "type": "", "voiceover": "", "visual": "" }},
  "cta": {{ "text": "", "method": "", "overlay": "" }},
  "caption": "string",
  "hashtags_main": ["string", "string"],
  "hashtags_secondary": ["string", "string"],
  "audio_suggestion": "string",
  "post_time": "string",
  "thumbnail_suggestion": "string",
  "ab_variant_hook": "string"
}}
    """
    
    # Generate content with JSON mime type to enforce structure
    response = model.generate_content(
        prompt,
        generation_config=genai.GenerationConfig(
            response_mime_type="application/json",
            temperature=0.7
        )
    )
    
    # Parse JSON
    try:
        data = json.loads(response.text)
        return schemas.ScriptGenResponse(**data)
    except Exception as e:
        raise ValueError(f"Failed to parse Gemini response: {str(e)}\nResponse text: {response.text}")
