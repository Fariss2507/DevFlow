import { useState, useEffect } from 'react';
import { Database, Table, FileJson, RefreshCw } from 'lucide-react';
import api from '@/services/api';
import './DatabaseExplorer.css';

export default function DatabaseExplorer() {
  const [collectionsData, setCollectionsData] = useState({});
  const [activeCollection, setActiveCollection] = useState('Projects');
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDbData();
  }, []);

  const fetchDbData = async () => {
    setLoading(true);
    try {
      const res = await api.get('/db-explorer');
      setCollectionsData(res.data.collections || {});
    } catch (err) {
      console.error('Failed to load database collections');
    } finally {
      setLoading(false);
    }
  };

  const collectionNames = Object.keys(collectionsData);
  const currentDocs = collectionsData[activeCollection] || [];

  return (
    <div className="page-container db-explorer-container">
      <div className="page-header">
        <div>
          <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Database className="text-blue-400" /> Database Explorer
          </h1>
          <p className="page-subtitle">Visual MongoDB collection inspector and live document viewer</p>
        </div>
        <button className="btn-primary" onClick={fetchDbData} disabled={loading}>
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} /> Refresh Collections
        </button>
      </div>

      <div className="db-explorer-layout">
        {/* Collections List */}
        <div className="collections-menu glass-card">
          <div className="menu-title">MongoDB Collections</div>
          <div className="menu-list">
            {collectionNames.map(name => (
              <button
                key={name}
                className={`coll-btn ${activeCollection === name ? 'active' : ''}`}
                onClick={() => { setActiveCollection(name); setSelectedDoc(null); }}
              >
                <Table size={16} />
                <span>{name}</span>
                <span className="coll-count">{collectionsData[name]?.length || 0}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Documents Table */}
        <div className="documents-main glass-card">
          <div className="main-header">
            <h3>Collection: {activeCollection}</h3>
            <span className="count-label">{currentDocs.length} Documents</span>
          </div>

          <div className="docs-table-wrapper">
            {currentDocs.length === 0 ? (
              <div className="empty-state">No documents in collection "{activeCollection}".</div>
            ) : (
              <table className="db-table">
                <thead>
                  <tr>
                    <th>_id</th>
                    <th>Summary / Title</th>
                    <th>Created At</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentDocs.map(doc => (
                    <tr key={doc._id} className={selectedDoc?._id === doc._id ? 'selected-row' : ''}>
                      <td className="font-mono text-purple-400">{doc._id}</td>
                      <td>{doc.name || doc.title || doc.email || doc.action || 'Document'}</td>
                      <td>{doc.createdAt ? new Date(doc.createdAt).toLocaleDateString() : 'N/A'}</td>
                      <td>
                        <button className="btn-inspect" onClick={() => setSelectedDoc(doc)}>
                          <FileJson size={14} /> Inspect JSON
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* JSON Inspector Sidebar */}
        <div className="json-inspector glass-card">
          <div className="inspector-header">
            <FileJson size={16} />
            <span>Document Inspector</span>
          </div>
          {selectedDoc ? (
            <pre className="json-code">
              {JSON.stringify(selectedDoc, null, 2)}
            </pre>
          ) : (
            <div className="empty-state text-sm">Click "Inspect JSON" on any row to view full BSON data payload.</div>
          )}
        </div>
      </div>
    </div>
  );
}
