import { useState, useEffect, useRef } from 'react';
import { BookOpen, Sparkles, Plus, History, Edit3, Upload } from 'lucide-react';
import api from '@/services/api';
import './DocsManager.css';

export default function DocsManager() {
  const [docs, setDocs] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [content, setContent] = useState('');
  const [loadingAi, setLoadingAi] = useState(false);
  const docFileInputRef = useRef(null);

  useEffect(() => {
    fetchDocs();
  }, []);

  const fetchDocs = async () => {
    try {
      const res = await api.get('/docs');
      setDocs(res.data || []);
      if (res.data.length > 0 && !selectedDoc) {
        setSelectedDoc(res.data[0]);
        setContent(res.data[0].content);
      }
    } catch (err) {
      console.error('Failed to load docs');
    }
  };

  const handleSelectDoc = (doc) => {
    setSelectedDoc(doc);
    setContent(doc.content);
  };

  const handleCreateDoc = async () => {
    const title = prompt('Enter Document Title:');
    if (!title) return;

    try {
      const res = await api.post('/docs', { title, content: `# ${title}\n\nStart writing documentation here...` });
      setDocs([res.data, ...docs]);
      setSelectedDoc(res.data);
      setContent(res.data.content);
    } catch (err) {
      const newDocObj = { _id: Date.now(), title, content: `# ${title}\n\nStart writing documentation here...` };
      setDocs([newDocObj, ...docs]);
      setSelectedDoc(newDocObj);
      setContent(newDocObj.content);
    }
  };

  const handleImportClick = () => {
    if (docFileInputRef.current) {
      docFileInputRef.current.click();
    }
  };

  const handleImportLocalDoc = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const importedText = event.target.result || '';
      const docTitle = file.name.replace(/\.[^/.]+$/, ''); // Strip extension

      const newDocObj = {
        title: docTitle,
        content: importedText
      };

      try {
        const res = await api.post('/docs', newDocObj);
        setDocs([res.data || { ...newDocObj, _id: Date.now() }, ...docs]);
        setSelectedDoc(res.data || newDocObj);
        setContent(importedText);
      } catch (err) {
        const fallbackDoc = { ...newDocObj, _id: Date.now() };
        setDocs([fallbackDoc, ...docs]);
        setSelectedDoc(fallbackDoc);
        setContent(importedText);
      }
    };

    reader.readAsText(file);
    e.target.value = '';
  };

  const handleAiSummary = async () => {
    if (!content) return;
    setLoadingAi(true);
    try {
      const res = await api.post('/ai', { tool: 'doc', prompt: `Summarize this documentation:\n${content}` });
      setContent(prev => `${prev}\n\n---\n### 🤖 AI Summary\n${res.data.response}`);
    } catch (err) {
      alert('AI Summary failed');
    } finally {
      setLoadingAi(false);
    }
  };

  const handleAiRewrite = async () => {
    if (!content) return;
    setLoadingAi(true);
    try {
      const res = await api.post('/ai', { tool: 'doc', prompt: `Rewrite and improve clarity of:\n${content}` });
      setContent(res.data.response);
    } catch (err) {
      alert('AI Rewrite failed');
    } finally {
      setLoadingAi(false);
    }
  };

  return (
    <div className="page-container docs-manager-container">
      {/* Native Hidden File Picker for Importing Documents */}
      <input
        type="file"
        ref={docFileInputRef}
        onChange={handleImportLocalDoc}
        accept=".md,.txt,.json,.js,.ts,.html,.css"
        style={{ display: 'none' }}
      />

      <div className="page-header">
        <div>
          <h1 className="page-title">Documentation Hub</h1>
          <p className="page-subtitle">Markdown system specs, version control, and local document import</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn-secondary" onClick={handleImportClick}>
            <Upload size={16} /> Import Local Doc
          </button>
          <button className="btn-primary" onClick={handleCreateDoc}>
            <Plus size={16} /> New Document
          </button>
        </div>
      </div>

      <div className="docs-layout">
        {/* Document List Sidebar */}
        <div className="docs-sidebar glass-card">
          <div className="sidebar-header">Documents</div>
          <div className="doc-list">
            {docs.map(doc => (
              <div
                key={doc._id}
                className={`doc-item ${selectedDoc?._id === doc._id ? 'active' : ''}`}
                onClick={() => handleSelectDoc(doc)}
              >
                <BookOpen size={16} />
                <span>{doc.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Editor View */}
        <div className="docs-editor glass-card">
          {selectedDoc ? (
            <>
              <div className="editor-toolbar">
                <h2>{selectedDoc.title}</h2>
                <div className="toolbar-actions">
                  <button className="btn-secondary" onClick={handleAiSummary} disabled={loadingAi}>
                    <Sparkles size={14} /> AI Summary
                  </button>
                  <button className="btn-secondary" onClick={handleAiRewrite} disabled={loadingAi}>
                    <Edit3 size={14} /> AI Rewrite
                  </button>
                </div>
              </div>

              <textarea
                className="doc-textarea"
                value={content}
                onChange={e => setContent(e.target.value)}
                rows={18}
              />

              <div className="version-history-section">
                <h4><History size={14} /> Version History</h4>
                <div className="version-list">
                  {selectedDoc.versionHistory?.map((v, i) => (
                    <div key={i} className="version-chip">
                      v{v.version} • {new Date(v.updatedAt || Date.now()).toLocaleDateString()}
                    </div>
                  )) || (
                    <div className="version-chip">v1.0 • {new Date().toLocaleDateString()}</div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="empty-state">Select a document or click "Import Local Doc" to begin editing.</div>
          )}
        </div>
      </div>
    </div>
  );
}
