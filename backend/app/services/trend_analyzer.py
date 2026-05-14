import asyncio
from .. import schemas

async def generate_mock_trends(category: str) -> schemas.TrendAnalyzeResponse:
    # Simulate network delay for realistic feel
    await asyncio.sleep(2)
    
    videos = []
    products = []
    
    # Generate 10 mock viral videos
    for i in range(1, 11):
        videos.append({
            "video_id": f"vid_{i}00{i}",
            "source": "tiktok_vn" if i % 2 == 0 else "douyin",
            "url": f"https://tiktok.com/@user/video/{i}00{i}",
            "viral_score": 95 - i,
            "hook_type": "Câu hỏi gây tò mò" if i % 2 == 0 else "Kết quả bất ngờ (Before/After)",
            "hook_text": f"Bạn có biết tại sao {category} lại hot thế này?",
            "script_structure": "Hook -> Giới thiệu vấn đề -> Giải pháp -> CTA",
            "audio_trend": {
                "name": f"Trending Sound {i}",
                "bpm": 120 + i*5,
                "mood": "Sôi động"
            },
            "visual_style": "Review cận cảnh, màu sắc tươi sáng",
            "product_usp": ["Giá rẻ", "Hiệu quả nhanh"],
            "hashtags": [f"#{category.replace(' ', '')}", "#xuhuong", "#review"],
            "caption_keywords": [category, "hot", "chốt đơn"],
            "top_reason_viral": [
                f"Video sử dụng cấu trúc Hook '{'Câu hỏi gây tò mò' if i % 2 == 0 else 'Kết quả bất ngờ (Before/After)'}' đánh trúng trực tiếp vào nỗi đau của khách hàng mục tiêu trong 3 giây đầu tiên.",
                f"Sự kết hợp hoàn hảo giữa âm thanh '{'Sôi động' if i % 2 == 0 else 'Chữa lành'}' (BPM: {120 + i*5}) và góc máy quay { 'cận cảnh chân thực' if i % 2 == 0 else 'từ trên xuống (top-down)' } tạo ra trải nghiệm thị giác cuốn hút, giữ chân người dùng xem hết video.",
                f"Có chứa bằng chứng xã hội (Social Proof) mạnh mẽ thông qua { 'lời khen ngợi từ khách hàng cũ' if i % 2 == 0 else 'đoạn review so sánh tính năng' }, giúp tăng độ tin cậy để chốt đơn."
            ],
            "estimated_reach": 500000 + i*10000,
            "affiliate_placement": "Gắn link ở caption và comment ghim"
        })
        
        products.append({
            "product_name": f"Sản phẩm {category} siêu hot {i}",
            "product_url": f"https://shop.tiktok.com/view/product/{i}00{i}",
            "estimated_sales": 1000 + i*150,
            "price_range": "150.000đ - 300.000đ",
            "viral_potential": 90 - i
        })
        
    return schemas.TrendAnalyzeResponse(
        trending_videos=videos,
        trending_products=products
    )
