import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import ChatWorkspace from './components/ChatWorkspace'
import TrendAnalyzerWorkspace from './components/TrendAnalyzerWorkspace'
import ScriptGenWorkspace from './components/ScriptGenWorkspace'
import ConfigPanel from './components/ConfigPanel'

import './styles/tokens.css'
import './styles/layout.css'
import './styles/components.css'

function App() {
  const [activeTab, setActiveTab] = useState('trend');
  const [selectedContext, setSelectedContext] = useState(null);

  const handleSelectForScriptGen = (type, data) => {
    setSelectedContext({ type, data });
    setActiveTab('script');
  };

  return (
    <div className="app-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'chat' ? (
        <ChatWorkspace />
      ) : activeTab === 'trend' ? (
        <TrendAnalyzerWorkspace onSelectForScriptGen={handleSelectForScriptGen} />
      ) : activeTab === 'script' ? (
        <ScriptGenWorkspace initialContext={selectedContext} />
      ) : (
        <main className="workspace">
          <header className="workspace-header">
            <div className="header-title">
              <h1>Module đang phát triển</h1>
            </div>
          </header>
          <div className="workspace-content" style={{ alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <p style={{ color: 'var(--text-secondary)' }}>Màn hình này đang được xây dựng...</p>
          </div>
        </main>
      )}
      <ConfigPanel />
    </div>
  )
}

export default App
