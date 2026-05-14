import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/config/keys';

export default function ApiKeyModal({ isOpen, onClose }) {
  const [keys, setKeys] = useState({
    gemini_key: '',
    veo_key: '',
    nanobana_key: '',
    tiktok_token: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      axios.get(API_URL).then(res => {
        setKeys({
          gemini_key: res.data.gemini_key || '',
          veo_key: res.data.veo_key || '',
          nanobana_key: res.data.nanobana_key || '',
          tiktok_token: res.data.tiktok_token || ''
        });
      }).catch(err => console.error("Error fetching keys:", err));
    }
  }, [isOpen]);

  const handleChange = (e) => {
    setKeys({ ...keys, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await axios.post(API_URL, keys);
      alert('Đã lưu cấu hình API Keys thành công!');
      onClose();
    } catch (err) {
      console.error("Error saving keys:", err);
      alert('Lỗi khi lưu cấu hình.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Cấu hình API Keys</h2>
          <button className="icon-btn" style={{fontSize: '20px', padding: 0, width: '30px', height: '30px'}} onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <div className="input-group">
            <label>Google Gemini API Key</label>
            <input type="password" name="gemini_key" value={keys.gemini_key} onChange={handleChange} placeholder="AIzaSy..." className="config-input" />
          </div>
          <div className="input-group">
            <label>Google Veo API Key</label>
            <input type="password" name="veo_key" value={keys.veo_key} onChange={handleChange} placeholder="..." className="config-input" />
          </div>
          <div className="input-group">
            <label>Nanobana API Key</label>
            <input type="password" name="nanobana_key" value={keys.nanobana_key} onChange={handleChange} placeholder="..." className="config-input" />
          </div>
          <div className="input-group">
            <label>TikTok Access Token</label>
            <input type="password" name="tiktok_token" value={keys.tiktok_token} onChange={handleChange} placeholder="..." className="config-input" />
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Hủy</button>
          <button className="btn btn-primary" onClick={handleSave} disabled={loading}>
            {loading ? 'Đang lưu...' : 'Lưu Keys'}
          </button>
        </div>
      </div>
    </div>
  );
}
