import { useState, useEffect } from 'react';
import { Folder, File, Upload, Search, Filter, Eye, Trash2, Plus } from 'lucide-react';
import api from '@/services/api';
import './FileManager.css';

export default function FileManager() {
  const [files, setFiles] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState('All');
  const [search, setSearch] = useState('');
  const [previewFile, setPreviewFile] = useState(null);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const res = await api.get('/files');
      setFiles(res.data || []);
    } catch (err) {
      console.error('Failed to load files');
    }
  };

  const handleUpload = async (e) => {
    const fileName = prompt('Enter file name to upload:');
    if (!fileName) return;

    try {
      const newFile = {
        name: fileName,
        folder: selectedFolder === 'All' ? 'Root' : selectedFolder,
        category: 'Document',
        size: `${Math.floor(Math.random() * 500) + 50} KB`,
        fileType: fileName.split('.').pop() || 'txt'
      };
      await api.post('/files', newFile);
      fetchFiles();
    } catch (err) {
      alert('File upload failed');
    }
  };

  const filteredFiles = files.filter(f => {
    const matchesFolder = selectedFolder === 'All' || f.folder === selectedFolder;
    const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase());
    return matchesFolder && matchesSearch;
  });

  const folders = ['All', 'Root', 'Docs', 'Assets', 'Source', 'Config'];

  return (
    <div className="page-container file-manager-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">File Manager</h1>
          <p className="page-subtitle">Organize project assets, documents, and code uploads</p>
        </div>
        <button className="btn-primary" onClick={handleUpload}>
          <Upload size={16} /> Upload File
        </button>
      </div>

      <div className="file-manager-layout">
        {/* Folder Sidebar */}
        <div className="folder-sidebar glass-card">
          <div className="folder-title">Folders</div>
          <div className="folder-list">
            {folders.map(f => (
              <button
                key={f}
                className={`folder-btn ${selectedFolder === f ? 'active' : ''}`}
                onClick={() => setSelectedFolder(f)}
              >
                <Folder size={16} />
                <span>{f}</span>
              </button>
            ))}
          </div>
        </div>

        {/* File Grid */}
        <div className="file-main-content glass-card">
          <div className="file-controls">
            <div className="search-bar">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search files by name..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="files-grid">
            {filteredFiles.length === 0 ? (
              <div className="empty-state">No files found in this category.</div>
            ) : (
              filteredFiles.map(file => (
                <div key={file._id} className="file-card">
                  <div className="file-icon-badge">
                    <File size={28} />
                  </div>
                  <div className="file-details">
                    <div className="file-name" title={file.name}>{file.name}</div>
                    <div className="file-meta">{file.folder} • {file.size}</div>
                  </div>
                  <button className="preview-btn" onClick={() => setPreviewFile(file)}>
                    <Eye size={14} /> Preview
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* File Preview Modal */}
      {previewFile && (
        <div className="preview-modal-backdrop" onClick={() => setPreviewFile(null)}>
          <div className="preview-modal glass-card" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>File Preview: {previewFile.name}</h3>
              <button onClick={() => setPreviewFile(null)}>✕</button>
            </div>
            <div className="modal-body">
              <p><strong>Folder:</strong> {previewFile.folder}</p>
              <p><strong>Category:</strong> {previewFile.category}</p>
              <p><strong>Size:</strong> {previewFile.size}</p>
              <p><strong>Type:</strong> {previewFile.fileType}</p>
              <div className="file-preview-box">
                {`[Preview Content for ${previewFile.name}]\nSample data payload rendered successfully in preview viewport.`}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
