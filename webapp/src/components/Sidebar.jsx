import React from 'react';
import { MdAutoAwesome, MdTrendingUp, MdEditNote, MdMovieCreation, MdFactCheck, MdSend, MdChat, MdSettings } from 'react-icons/md';

export default function Sidebar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'trend', icon: MdTrendingUp, tooltip: 'Module 1: Trend Analyzer' },
    { id: 'script', icon: MdEditNote, tooltip: 'Module 2: Script Gen' },
    { id: 'video', icon: MdMovieCreation, tooltip: 'Module 3: Video Studio' },
    { id: 'audit', icon: MdFactCheck, tooltip: 'Module 4: Admin Audit' },
    { id: 'publish', icon: MdSend, tooltip: 'Module 5: Multi-Publish' },
    { id: 'chat', icon: MdChat, tooltip: 'Module 7: AI Chat' },
  ];

  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <MdAutoAwesome className="logo-icon" />
      </div>
      
      <ul className="nav-links">
        {navItems.map((item) => (
          <li 
            key={item.id}
            className={`nav-item tooltip ${activeTab === item.id ? 'active' : ''}`} 
            data-tooltip={item.tooltip}
            onClick={() => setActiveTab(item.id)}
          >
            <item.icon size={24} />
          </li>
        ))}
      </ul>
      
      <div className="sidebar-footer">
        <li className="nav-item tooltip" data-tooltip="Settings">
          <MdSettings size={24} />
        </li>
      </div>
    </nav>
  );
}
