import { useState, useEffect, useRef } from 'react';
import { Folder, File, Upload, Search, Eye, Trash2 } from 'lucide-react';
import api from '@/services/api';
import './FileManager.css';

export default function FileManager() {
  const [files, setFiles] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState('All');
  const [search, setSearch] = useState('');
  const [previewFile, setPreviewFile] = useState(null);
  const fileInputRef = useRef(null);

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

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRealFileUpload = async (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Format size
    const sizeInKB = Math.round(selectedFile.size / 1024);
    const formattedSize = sizeInKB > 1024 ? `${(sizeInKB / 1024).toFixed(1)} MB` : `${sizeInKB} KB`;

    // Read file content with FileReader
    const reader = new FileReader();
    reader.onload = async (event) => {
      const fileContent = event.target.result;

      const newFileObj = {
        name: selectedFile.name,
        folder: selectedFolder === 'All' ? 'Root' : selectedFolder,
        category: selectedFile.type.startsWith('image/') ? 'Image' : 'Document',
        size: formattedSize,
        fileType: selectedFile.name.split('.').pop() || 'file',
        content: fileContent || '[Binary / Media Content]'
      };

      try {
        const res = await api.post('/files', newFileObj);
        setFiles(prev => [res.data || newFileObj, ...prev]);
      } catch (err) {
        // Fallback for UI responsiveness if backend is offline
        setFiles(prev => [{ ...newFileObj, _id: Date.now() }, ...prev]);
      }
    };

    if (selectedFile.type.startsWith('text/') || selectedFile.name.match(/\.(js|jsx|ts|tsx|json|md|css|html|txt|csv|py|java|c|cpp)$/i)) {
      reader.readAsText(selectedFile);
    } else {
      reader.readAsDataURL(selectedFile);
    }

    // Reset input
    e.target.value = '';
  };

  const handleDeleteFile = async (e, id) => {
    e.stopPropagation();
    try {
      await api.delete(`/files/${id}`);
      setFiles(files.filter(f => f._id !== id));
    } catch (err) {
      setFiles(files.filter(f => f._id !== id));
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
      {/* Hidden Native Local File Picker */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleRealFileUpload}
        style={{ display: 'none' }}
      />

      <div className="page-header">
        <div>
          <h1 className="page-title">File Manager</h1>
          <p className="page-subtitle">Upload and inspect local system assets, code files, and documents</p>
        </div>
        <button className="btn-primary" onClick={handleUploadClick}>
          <Upload size={16} /> Upload Local File
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
              <div className="empty-state">No files uploaded yet. Click "Upload Local File" to pick files from your computer.</div>
            ) : (
              filteredFiles.map(file => (
                <div key={file._id || file.name} className="file-card">
                  <div className="file-icon-badge">
                    <File size={28} />
                  </div>
                  <div className="file-details">
                    <div className="file-name" title={file.name}>{file.name}</div>
                    <div className="file-meta">{file.folder} • {file.size}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
                    <button className="preview-btn" onClick={() => setPreviewFile(file)}>
                      <Eye size={14} /> Preview
                    </button>
                    <button
                      className="preview-btn"
                      style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)' }}
                      onClick={(e) => handleDeleteFile(e, file._id)}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
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
              <p><strong>Size:</strong> {previewFile.size}</p>
              <p><strong>Type:</strong> {previewFile.fileType}</p>
              <div className="file-preview-box">
                {previewFile.content || `[Real file content for ${previewFile.name}]`}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
