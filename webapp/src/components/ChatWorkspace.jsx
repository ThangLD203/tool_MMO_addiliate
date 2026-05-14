import React, { useState, useRef, useEffect } from 'react';
import { MdSave, MdPlayArrow, MdSettingsSuggest, MdSmartToy, MdPerson, MdAttachFile, MdModelTraining } from 'react-icons/md';

export default function ChatWorkspace() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'system',
      text: 'Chào bạn, tôi là trợ lý AI chuyên về TikTok Affiliate. Tôi đã nạp dữ liệu xu hướng mới nhất từ Module 1. Bạn muốn tôi làm gì hôm nay?'
    }
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: input }]);
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        id: Date.now(), 
        sender: 'system', 
        text: 'Đang xử lý yêu cầu của bạn...' 
      }]);
    }, 1000);
  };

  return (
    <main className="workspace">
      <header className="workspace-header">
        <div className="header-title">
          <h1>Chat AI (Module 7)</h1>
          <span className="badge">Gemini 2.0 Flash</span>
        </div>
        <div className="header-actions">
          <button className="btn btn-secondary">
            <MdSave /> Lưu Kịch Bản
          </button>
          <button className="btn btn-primary">
            <MdPlayArrow /> Tạo Video Ngay
          </button>
        </div>
      </header>

      <div className="workspace-content">
        <div className="system-instruction-box">
          <div className="box-header">
            <MdSettingsSuggest />
            <span>System Instructions</span>
          </div>
          <textarea 
            className="system-input" 
            placeholder="Bạn là chuyên gia tư vấn TikTok Affiliate Marketing..."
            defaultValue="Bạn là một AI chuyên gia về MMO (Make Money Online) và TikTok Affiliate Marketing.
Nhiệm vụ của bạn là hỗ trợ vận hành công cụ tự động hóa."
          />
        </div>

        <div className="chat-history">
          {messages.map((msg) => (
            <div key={msg.id} className={`chat-message ${msg.sender}`}>
              <div className="avatar">
                {msg.sender === 'user' ? <MdPerson size={20} /> : <MdSmartToy size={20} />}
              </div>
              <div className="message-content">
                <p>{msg.text}</p>
                {msg.id === 1 && (
                  <div className="quick-actions">
                    <button className="action-chip">Tạo kịch bản cho sản phẩm Hot</button>
                    <button className="action-chip">Xem danh sách video viral</button>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <div className="chat-input-wrapper">
          <textarea 
            className="chat-input" 
            placeholder="Nhập yêu cầu tạo video, kịch bản hoặc phân tích... (Nhấn Ctrl+Enter để gửi)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.ctrlKey && e.key === 'Enter') {
                handleSend();
              }
            }}
          />
          <div className="chat-controls">
            <button className="icon-btn tooltip" data-tooltip="Đính kèm file"><MdAttachFile /></button>
            <button className="icon-btn tooltip" data-tooltip="Chọn Model"><MdModelTraining /></button>
            <div className="spacer"></div>
            <button className="btn btn-run" onClick={handleSend}>Gửi</button>
          </div>
        </div>
      </div>
    </main>
  );
}
