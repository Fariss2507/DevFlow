import { useState, useEffect } from 'react';
import { Sparkles, Code2, Bug, FileText, BookOpen, HelpCircle, Database, Plug, History, Send, Copy, Check } from 'lucide-react';
import api from '@/services/api';
import './AiWorkspace.css';

const tools = [
  { id: 'chat', label: 'AI Chat Assistant', icon: Sparkles, desc: 'General dev assistant for architecture & logic' },
  { id: 'code', label: 'AI Code Generator', icon: Code2, desc: 'Generate React, Node, Python, or SQL code' },
  { id: 'bugfix', label: 'AI Bug Fixer', icon: Bug, desc: 'Paste stack traces or broken code for instant fixes' },
  { id: 'readme', label: 'AI README Generator', icon: FileText, desc: 'Generate professional GitHub README.md files' },
  { id: 'doc', label: 'AI Doc Generator', icon: BookOpen, desc: 'Generate technical architecture documentation' },
  { id: 'explainer', label: 'AI Code Explainer', icon: HelpCircle, desc: 'Line-by-line code explanation & complexity analysis' },
  { id: 'mongo', label: 'AI Mongo Query Gen', icon: Database, desc: 'Generate MongoDB aggregation pipelines' },
  { id: 'api', label: 'AI API Generator', icon: Plug, desc: 'Generate Next.js & Express API route handlers' },
];

export default function AiWorkspace() {
  const [activeTool, setActiveTool] = useState('chat');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await api.get('/ai');
      setHistory(res.data || []);
    } catch (err) {
      console.error('Failed to load AI history');
    }
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!prompt.trim() || loading) return;

    setLoading(true);
    setResult('');

    try {
      const res = await api.post('/ai', { tool: activeTool, prompt });
      setResult(res.data.response);
      fetchHistory();
    } catch (err) {
      setResult('Failed to process request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentToolObj = tools.find(t => t.id === activeTool);

  return (
    <div className="page-container ai-workspace-container">
      <div className="page-header">
        <div>
          <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Sparkles className="text-purple-400" /> DevForge AI Workspace
          </h1>
          <p className="page-subtitle">Unified AI engineering tools for rapid development and code generation</p>
        </div>
      </div>

      <div className="ai-workspace-layout">
        {/* Tool Navigation Sidebar */}
        <div className="ai-tools-menu glass-card">
          <div className="menu-header">AI Tool Suite</div>
          <div className="menu-list">
            {tools.map(tool => {
              const Icon = tool.icon;
              return (
                <button
                  key={tool.id}
                  className={`tool-btn ${activeTool === tool.id ? 'active' : ''}`}
                  onClick={() => { setActiveTool(tool.id); setResult(''); }}
                >
                  <Icon size={18} />
                  <span>{tool.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Workspace Main Interactive Panel */}
        <div className="ai-main-panel glass-card">
          <div className="panel-header">
            <h3>{currentToolObj?.label}</h3>
            <p>{currentToolObj?.desc}</p>
          </div>

          <form onSubmit={handleGenerate} className="ai-form">
            <textarea
              className="ai-textarea"
              placeholder={`Enter prompt for ${currentToolObj?.label}...`}
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              rows={4}
            />
            <button type="submit" className="ai-generate-btn" disabled={loading}>
              <Send size={16} />
              <span>{loading ? 'Processing with DevForge AI...' : 'Generate with AI'}</span>
            </button>
          </form>

          {result && (
            <div className="ai-result-card">
              <div className="result-header">
                <span>AI Output</span>
                <button className="copy-btn" onClick={handleCopy}>
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <pre className="result-content">{result}</pre>
            </div>
          )}
        </div>

        {/* History Sidebar */}
        <div className="ai-history-panel glass-card">
          <div className="history-header">
            <History size={16} />
            <span>AI Request History</span>
          </div>
          <div className="history-list">
            {history.length === 0 ? (
              <div className="empty-history">No prior AI requests logged.</div>
            ) : (
              history.map(item => (
                <div key={item._id} className="history-item" onClick={() => { setActiveTool(item.tool); setPrompt(item.prompt); setResult(item.response); }}>
                  <div className="history-tool">{item.tool}</div>
                  <div className="history-prompt">{item.prompt}</div>
                  <div className="history-time">{new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
