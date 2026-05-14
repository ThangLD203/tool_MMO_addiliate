import React, { useState } from 'react';

export default function ConfigPanel() {
  const [temperature, setTemperature] = useState(0.7);

  return (
    <aside className="config-panel">
      <div className="panel-header">
        <h2>Cấu hình tham số</h2>
      </div>
      
      <div className="panel-section">
        <label>Model</label>
        <select className="config-select" defaultValue="Gemini 2.0 Flash">
          <option>Gemini 2.0 Flash</option>
          <option>Gemini 2.5 Pro</option>
          <option>Google Veo 2 (Video)</option>
          <option>Nanobana (Avatar)</option>
        </select>
      </div>

      <div className="panel-section">
        <div className="slider-header">
          <label>Temperature</label>
          <span className="slider-value">{temperature}</span>
        </div>
        <input 
          type="range" 
          className="config-slider" 
          min="0" max="1" step="0.1" 
          value={temperature}
          onChange={(e) => setTemperature(parseFloat(e.target.value))}
        />
      </div>

      <div className="panel-section">
        <label>Nền tảng mục tiêu</label>
        <div className="checkbox-group">
          <label className="checkbox-label"><input type="checkbox" defaultChecked /> TikTok VN</label>
          <label className="checkbox-label"><input type="checkbox" defaultChecked /> Facebook Reels</label>
          <label className="checkbox-label"><input type="checkbox" /> YouTube Shorts</label>
        </div>
      </div>

      <div className="panel-section">
        <label>Thời lượng Video (Giây)</label>
        <input type="number" className="config-input" defaultValue={30} />
      </div>
      
      <div className="panel-section">
        <label>Advanced Prompting</label>
        <button className="btn btn-outline" style={{ width: '100%', borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>Chỉnh sửa Context</button>
      </div>
    </aside>
  );
}
