import React, { useState } from 'react';
import axios from 'axios';
import { MdSearch, MdDataExploration, MdVideoLibrary, MdStore, MdEditNote } from 'react-icons/md';

export default function TrendAnalyzerWorkspace({ onSelectForScriptGen }) {
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const handleAnalyze = async () => {
    if (!category.trim()) return alert("Vui lòng nhập ngành hàng!");
    setLoading(true);
    try {
      const res = await axios.post('/api/trends/analyze', { category, timeframe: '7 ngày' });
      setData(res.data);
    } catch (error) {
      console.error("Error analyzing trends:", error);
      alert("Lỗi khi phân tích xu hướng");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="workspace" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <header className="workspace-header">
        <div className="header-title">
          <h1>Module 1: Trend Analyzer</h1>
          <span className="badge">TikTok VN & Douyin</span>
        </div>
      </header>

      <div className="workspace-content" style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px', overflowY: 'auto' }}>
        
        {/* Search Box */}
        <div className="system-instruction-box" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <MdSearch size={24} color="var(--text-secondary)" />
          <input 
            type="text" 
            className="system-input" 
            style={{ minHeight: 'auto', fontSize: '16px', padding: '10px' }}
            placeholder="Nhập tên ngành hàng (vd: Thời trang nữ, Đồ gia dụng...)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
          />
          <button className="btn btn-primary" onClick={handleAnalyze} disabled={loading}>
            {loading ? 'Đang cào dữ liệu...' : 'Phân Tích'}
          </button>
        </div>

        {/* Results */}
        {data && (
          <div style={{ display: 'flex', gap: '20px', flex: 1 }}>
            
            {/* Top 10 Videos */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><MdVideoLibrary /> Top 10 Video Viral</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto', maxHeight: '600px' }}>
                {data.trending_videos.map((vid, idx) => (
                  <div key={idx} style={{ background: 'var(--bg-panel)', padding: '15px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <strong>#{idx+1} Cực Hot (Điểm Viral: {vid.viral_score})</strong>
                      <span className="badge">{vid.source}</span>
                    </div>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '0 0 5px 0' }}><strong>Hook:</strong> {vid.hook_type} - "{vid.hook_text}"</p>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '0 0 5px 0' }}><strong>Nhạc:</strong> {vid.audio_trend.name}</p>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '0 0 5px 0' }}><strong>Hashtags:</strong> {vid.hashtags.join(' ')}</p>
                    
                    <div style={{ margin: '10px 0', padding: '10px', backgroundColor: 'var(--bg-input)', borderRadius: '6px', borderLeft: '3px solid var(--accent-color)' }}>
                      <strong style={{ fontSize: '13px', display: 'block', marginBottom: '5px' }}>💡 Phân tích nguyên nhân Viral:</strong>
                      <ul style={{ margin: 0, paddingLeft: '15px', fontSize: '13px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {vid.top_reason_viral.map((reason, rIdx) => (
                          <li key={rIdx}>{reason}</li>
                        ))}
                      </ul>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
                      <p style={{ fontSize: '13px', margin: '0' }}><a href={vid.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-color)', textDecoration: 'none' }}>Xem Video ↗</a></p>
                      <button className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => onSelectForScriptGen('video', vid)}>
                        <MdEditNote size={16} /> Dùng Video Này
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top 10 Products */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><MdStore /> Top 10 Sản Phẩm Trending</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto', maxHeight: '600px' }}>
                {data.trending_products.map((prod, idx) => (
                  <div key={idx} style={{ background: 'var(--bg-panel)', padding: '15px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <strong>{prod.product_name}</strong>
                      <span style={{ color: 'var(--accent-color)', fontWeight: 'bold' }}>{prod.viral_potential}/100 Điểm</span>
                    </div>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '0 0 5px 0' }}><strong>Khoảng giá:</strong> {prod.price_range}</p>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '0 0 5px 0' }}><strong>Doanh số ước tính:</strong> {prod.estimated_sales} lượt bán</p>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
                      <p style={{ fontSize: '13px', margin: '0' }}><a href={prod.product_url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-color)', textDecoration: 'none' }}>Xem Sản Phẩm ↗</a></p>
                      <button className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => onSelectForScriptGen('product', prod)}>
                        <MdEditNote size={16} /> Bán Sản Phẩm Này
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </main>
  );
}
