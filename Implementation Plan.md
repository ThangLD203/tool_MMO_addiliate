# Kế Hoạch Triển Khai Module 1 (Trend Analyzer)

**Yêu cầu:** Thu thập thông tin từ TikTok Việt Nam và Douyin (Trung Quốc) để phân tích 10 video xu hướng và 10 sản phẩm trending.

---

## 🛑 THÔNG TIN CẦN BẠN XÁC NHẬN (USER REVIEW REQUIRED)

Việc trực tiếp "cào" (crawl) dữ liệu từ TikTok và Douyin bằng code Python thông thường là **rất khó và kém ổn định** do cơ chế chống bot mạnh mẽ của họ. 

Để hệ thống chạy ổn định và chuyên nghiệp, chúng ta có **3 hướng giải quyết** cho phần "Thu Thập":

1. **Sử dụng Dữ liệu Giả lập (Mock Data) — KHUYÊN DÙNG TRONG GIAI ĐOẠN NÀY:**
   Tạm thời chúng ta cho hệ thống tự động sinh ra 10 video/sản phẩm trend giả định (hoặc dùng Gemini dự đoán) để hoàn thiện luồng UI, Backend và hiển thị dữ liệu trước. Việc này giúp tiết kiệm thời gian và tiền bạc khi đang phát triển.

2. **Sử dụng API bên thứ 3:**
   Dùng các dịch vụ có sẵn chuyên cào TikTok như **Apify** hoặc **RapidAPI** (cần mua key hoặc gói free). Hệ thống của ta sẽ gọi API của họ lấy data, sau đó đưa vào Gemini phân tích.

3. **Cài đặt Tự Động Hóa (Playwright/Selenium):**
   Cài trình duyệt ảo vào Docker để tự cào. Cách này rất nặng, dễ bị khóa IP và tốn nhiều công bảo trì.

> **Câu hỏi mở (Open Question):** Bạn muốn chọn phương án nào? Nếu bạn chưa có API Key của bên thứ 3, hãy chọn Phương án 1 nhé!

---

## 🛠️ CÁC BƯỚC THỰC HIỆN ĐỀ XUẤT (PROPOSED CHANGES)

### 1. Cấu Trúc Backend (`backend/app/schemas.py`)
- Thêm `TrendAnalyzeRequest` (chứa keyword ngành hàng).
- Thêm `TrendAnalyzeResponse` (chuẩn hóa JSON chứa 10 video và 10 sản phẩm theo yêu cầu của Module 1).

### 2. Xây Dựng Service Phân Tích (`backend/app/services/trend_analyzer.py`)
- Viết logic `fetch_tiktok_data()` (Thu thập data thực hoặc trả về Mock Data tùy theo lựa chọn của bạn).
- Viết logic `analyze_trends_with_gemini(raw_data)`: Tiêm dữ liệu thô vào prompt Module 1, yêu cầu Gemini đánh giá độ viral, hook, visual style và chọn lọc ra Top 10.

### 3. Mở rộng Router (`backend/app/api.py`)
- Cung cấp endpoint: `POST /api/trends/analyze`.

### 4. Tích Hợp Frontend
- Xây dựng giao diện cho "Module 1: Trend Analyzer" dạng bảng hoặc thẻ (card) để hiển thị trực quan 10 video + 10 sản phẩm.

---

## 🧪 KẾ HOẠCH KIỂM THỬ (VERIFICATION PLAN)
- Bấm nút "Phân Tích Xu Hướng" trên UI.
- Kiểm tra xem 10 video và 10 sản phẩm có được hiển thị với đầy đủ thông số (viral score, hook type, audio trend...) từ Backend trả về hay không.
