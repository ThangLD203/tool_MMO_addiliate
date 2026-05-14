import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdAutoAwesome, MdContentCopy } from 'react-icons/md';

export default function ScriptGenWorkspace({ initialContext }) {
  const [formData, setFormData] = useState({
    product_name: '',
    original_price: '200.000đ',
    sale_price: '150.000đ',
    url: '',
    usps: 'Chất lượng tốt, Giá siêu rẻ',
    hook_type: 'Câu hỏi gây tò mò',
    visual_style: 'Chân thực, Cận cảnh',
    audio_trend: 'Nhạc Tiktok Trending',
    target_duration: '30s'
  });

  const [loading, setLoading] = useState(false);
  const [scriptResult, setScriptResult] = useState(null);

  // Auto-fill form when context from Module 1 changes
  useEffect(() => {
    if (initialContext) {
      if (initialContext.type === 'video') {
        const vid = initialContext.data;
        setFormData(prev => ({
          ...prev,
          hook_type: vid.hook_type,
          visual_style: vid.visual_style,
          audio_trend: vid.audio_trend?.name || prev.audio_trend,
          usps: vid.product_usp ? vid.product_usp.join(', ') : prev.usps
        }));
      } else if (initialContext.type === 'product') {
        const prod = initialContext.data;
        setFormData(prev => ({
          ...prev,
          product_name: prod.product_name,
          url: prod.product_url,
          original_price: prod.price_range.split('-')[1] || prev.original_price,
          sale_price: prod.price_range.split('-')[0] || prev.sale_price
        }));
      }
    }
  }, [initialContext]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenerate = async () => {
    if (!formData.product_name) return alert("Vui lòng nhập tên sản phẩm!");
    setLoading(true);
    try {
      const payload = {
        ...formData,
        usps: formData.usps.split(',').map(s => s.trim())
      };
      const res = await axios.post('/api/scripts/generate', payload);
      setScriptResult(res.data);
    } catch (error) {
      console.error("Error generating script:", error);
      alert("Lỗi khi sinh kịch bản. Vui lòng kiểm tra lại cấu hình API Gemini trong bảng điều khiển.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="workspace" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <header className="workspace-header">
        <div className="header-title">
          <h1>Module 2: AI Script Generation</h1>
          <span className="badge">Gemini 2.0 Flash</span>
        </div>
      </header>

      <div className="workspace-content" style={{ display: 'flex', gap: '20px', padding: '20px', overflowY: 'auto', flex: 1 }}>
        
        {/* Form Cấu hình kịch bản */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div className="system-instruction-box">
            <h3 style={{ marginTop: 0, fontSize: '15px', color: 'var(--text-primary)' }}>Thông Tin Sản Phẩm & Context</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div className="input-group">
                <label>Tên sản phẩm *</label>
                <input type="text" name="product_name" value={formData.product_name} onChange={handleChange} className="config-input" />
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <div className="input-group" style={{ flex: 1 }}>
                  <label>Giá gốc</label>
                  <input type="text" name="original_price" value={formData.original_price} onChange={handleChange} className="config-input" />
                </div>
                <div className="input-group" style={{ flex: 1 }}>
                  <label>Giá sale</label>
                  <input type="text" name="sale_price" value={formData.sale_price} onChange={handleChange} className="config-input" />
                </div>
              </div>

              <div className="input-group">
                <label>Link Sản Phẩm (Tiktok Shop)</label>
                <input type="text" name="url" value={formData.url} onChange={handleChange} className="config-input" />
              </div>

              <div className="input-group">
                <label>USPs (Cách nhau dấu phẩy)</label>
                <textarea name="usps" value={formData.usps} onChange={handleChange} className="config-input" style={{ minHeight: '60px' }}></textarea>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <div className="input-group" style={{ flex: 1 }}>
                  <label>Kiểu Hook (Tham khảo)</label>
                  <input type="text" name="hook_type" value={formData.hook_type} onChange={handleChange} className="config-input" />
                </div>
                <div className="input-group" style={{ flex: 1 }}>
                  <label>Thời lượng</label>
                  <input type="text" name="target_duration" value={formData.target_duration} onChange={handleChange} className="config-input" />
                </div>
              </div>

              <div className="input-group">
                <label>Visual Style</label>
                <input type="text" name="visual_style" value={formData.visual_style} onChange={handleChange} className="config-input" />
              </div>

              <button className="btn btn-primary" onClick={handleGenerate} disabled={loading} style={{ marginTop: '10px', width: '100%' }}>
                {loading ? 'Đang gọi Gemini AI...' : <><MdAutoAwesome /> Sinh Kịch Bản TikTok Chuẩn</>}
              </button>
            </div>
          </div>
        </div>

        {/* Kết quả trả về */}
        <div style={{ flex: 1.5, display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {scriptResult ? (
            <div className="system-instruction-box" style={{ height: '100%', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h3 style={{ margin: 0, color: 'var(--accent-color)' }}>✅ Kịch Bản Đã Sinh Thành Công</h3>
                <button className="icon-btn tooltip" data-tooltip="Copy Kịch Bản" onClick={() => navigator.clipboard.writeText(scriptResult.script_full)}>
                  <MdContentCopy />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {/* Toàn bộ kịch bản thô */}
                <div style={{ background: 'var(--bg-app)', padding: '15px', borderRadius: '8px' }}>
                  <h4 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>📜 Kịch bản thô (Copy ném vào Teleprompter):</h4>
                  <p style={{ margin: 0, fontSize: '14px', whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>{scriptResult.script_full}</p>
                </div>

                {/* Phân rã cấu trúc */}
                <h4 style={{ margin: '10px 0 0 0', fontSize: '14px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>🔍 Cấu Trúc Bóc Tách (Gửi vào AI Video)</h4>
                
                {/* Hook */}
                <div style={{ background: 'var(--bg-input)', padding: '10px', borderRadius: '6px', borderLeft: '3px solid #ff4757' }}>
                  <strong style={{ fontSize: '13px' }}>[0-3s] HOOK - {scriptResult.hook.type}</strong>
                  <p style={{ fontSize: '13px', margin: '5px 0' }}><strong>Voice:</strong> {scriptResult.hook.text}</p>
                  <p style={{ fontSize: '13px', margin: '5px 0' }}><strong>Cảnh:</strong> {scriptResult.hook.scene}</p>
                  <p style={{ fontSize: '13px', margin: '0' }}><strong>Chữ chạy:</strong> {scriptResult.hook.overlay}</p>
                </div>

                {/* Main Content */}
                <div style={{ background: 'var(--bg-input)', padding: '10px', borderRadius: '6px', borderLeft: '3px solid #2ed573' }}>
                  <strong style={{ fontSize: '13px' }}>[3-15s] MAIN CONTENT (USP)</strong>
                  <p style={{ fontSize: '13px', margin: '5px 0' }}><strong>Voice:</strong> {scriptResult.main_content.voiceover}</p>
                  <ul style={{ fontSize: '13px', margin: '5px 0', paddingLeft: '20px' }}>
                    {scriptResult.main_content.scenes.map((sc, i) => <li key={i}>{sc}</li>)}
                  </ul>
                </div>

                {/* Social Proof */}
                <div style={{ background: 'var(--bg-input)', padding: '10px', borderRadius: '6px', borderLeft: '3px solid #1e90ff' }}>
                  <strong style={{ fontSize: '13px' }}>[15-25s] SOCIAL PROOF</strong>
                  <p style={{ fontSize: '13px', margin: '5px 0' }}><strong>Voice:</strong> {scriptResult.social_proof.voiceover}</p>
                  <p style={{ fontSize: '13px', margin: '0' }}><strong>Cảnh:</strong> {scriptResult.social_proof.visual}</p>
                </div>

                {/* CTA */}
                <div style={{ background: 'var(--bg-input)', padding: '10px', borderRadius: '6px', borderLeft: '3px solid #ffa502' }}>
                  <strong style={{ fontSize: '13px' }}>[25-30s] CALL TO ACTION</strong>
                  <p style={{ fontSize: '13px', margin: '5px 0' }}><strong>Voice:</strong> {scriptResult.cta.text}</p>
                  <p style={{ fontSize: '13px', margin: '0' }}><strong>Phương thức:</strong> {scriptResult.cta.method}</p>
                </div>

                {/* Metadata */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div style={{ background: 'var(--bg-app)', padding: '10px', borderRadius: '6px' }}>
                    <strong style={{ fontSize: '13px' }}>Hashtags</strong>
                    <p style={{ fontSize: '12px', margin: '5px 0 0 0', color: 'var(--text-secondary)' }}>{scriptResult.hashtags_main.join(' ')} {scriptResult.hashtags_secondary.join(' ')}</p>
                  </div>
                  <div style={{ background: 'var(--bg-app)', padding: '10px', borderRadius: '6px' }}>
                    <strong style={{ fontSize: '13px' }}>Gợi ý Giờ Đăng & Nhạc</strong>
                    <p style={{ fontSize: '12px', margin: '5px 0 0 0', color: 'var(--text-secondary)' }}>{scriptResult.post_time} | {scriptResult.audio_suggestion}</p>
                  </div>
                </div>

              </div>
            </div>
          ) : (
            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed var(--border-color)', borderRadius: '8px', color: 'var(--text-secondary)' }}>
              Hãy nhập thông tin và bấm "Sinh Kịch Bản" để thấy kết quả.
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
