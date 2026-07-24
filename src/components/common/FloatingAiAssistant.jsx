import { useState } from 'react';
import { Sparkles, Send, X, Bot } from 'lucide-react';
import api from '@/services/api';
import './FloatingAiAssistant.css';

export default function FloatingAiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hi! I am DevForge AI. Ask me to generate code, fix bugs, explain syntax, or write docs!' }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!prompt.trim() || loading) return;

    const userMsg = prompt;
    setPrompt('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const res = await api.post('/ai', { tool: 'chat', prompt: userMsg });
      setMessages(prev => [...prev, { role: 'assistant', text: res.data.response }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', text: 'Sorry, I encountered an error responding to your prompt.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="floating-ai-container">
      {isOpen && (
        <div className="floating-ai-card glass-card">
          <div className="floating-ai-header">
            <div className="ai-title">
              <Bot size={20} className="ai-icon-pulse" />
              <span>DevForge AI Assistant</span>
            </div>
            <button className="ai-close-btn" onClick={() => setIsOpen(false)}><X size={16} /></button>
          </div>

          <div className="floating-ai-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`ai-msg ${msg.role}`}>
                {msg.text}
              </div>
            ))}
            {loading && <div className="ai-msg assistant loading">DevForge AI is thinking...</div>}
          </div>

          <form className="floating-ai-input" onSubmit={handleSend}>
            <input
              type="text"
              placeholder="Ask DevForge AI..."
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
            />
            <button type="submit" disabled={loading}><Send size={15} /></button>
          </form>
        </div>
      )}

      <button className="floating-ai-trigger-btn" onClick={() => setIsOpen(!isOpen)} title="Open DevForge AI Assistant">
        <Sparkles size={22} />
      </button>
    </div>
  );
}
