import { useState } from 'react';
import ApiCard from './ApiCard';
import ApiForm from './ApiForm';
import { initialApis } from '../../data/apisData';
import './Apis.css';

export default function Apis() {
  const [apis, setApis] = useState(initialApis);
  const [showForm, setShowForm] = useState(false);
  const [editingApi, setEditingApi] = useState(null);

  const openNewForm = () => {
    setEditingApi(null);
    setShowForm(true);
  };

  const openEditForm = (api) => {
    setEditingApi(api);
    setShowForm(true);
  };

  const handleSave = (api) => {
    if (editingApi) {
      setApis(apis.map((a) => (a.id === api.id ? api : a)));
    } else {
      setApis([...apis, api]);
    }
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (confirm('Delete this API entry?')) {
      setApis(apis.filter((a) => a.id !== id));
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>API Collection</h1>
        <button className="btn-primary" onClick={openNewForm}>+ New API</button>
      </div>

      {apis.length === 0 ? (
        <p className="empty-state">No API endpoints saved yet.</p>
      ) : (
        <div className="apis-list">
          {apis.map((api) => (
            <ApiCard key={api.id} api={api} onEdit={openEditForm} onDelete={handleDelete} />
          ))}
        </div>
      )}

      {showForm && (
        <ApiForm existingApi={editingApi} onSave={handleSave} onClose={() => setShowForm(false)} />
      )}
    </div>
  );
}