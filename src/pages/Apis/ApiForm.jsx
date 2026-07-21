import { useState, useEffect } from 'react';
import { methodOptions } from '../../data/apisData';
import './Apis.css';

const emptyForm = {
  name: '',
  method: 'GET',
  endpoint: '',
  headers: '',
  requestBody: '',
  responseExample: '',
  authDetails: '',
};

export default function ApiForm({ existingApi, onSave, onClose }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    setForm(existingApi ? existingApi : emptyForm);
  }, [existingApi]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.endpoint.trim()) return;

    onSave({
      ...form,
      id: existingApi ? existingApi.id : Date.now(),
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h2>{existingApi ? 'Edit API' : 'New API Endpoint'}</h2>

        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Login User" />

          <div className="form-row">
            <div>
              <label>Method</label>
              <select name="method" value={form.method} onChange={handleChange}>
                {methodOptions.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label>Endpoint</label>
              <input name="endpoint" value={form.endpoint} onChange={handleChange} placeholder="/api/auth/login" />
            </div>
          </div>

          <label>Headers</label>
          <textarea name="headers" value={form.headers} onChange={handleChange} rows={2} className="code-textarea" placeholder="Content-Type: application/json" />

          <label>Request Body</label>
          <textarea name="requestBody" value={form.requestBody} onChange={handleChange} rows={4} className="code-textarea" placeholder='{ "key": "value" }' />

          <label>Response Example</label>
          <textarea name="responseExample" value={form.responseExample} onChange={handleChange} rows={4} className="code-textarea" placeholder='{ "success": true }' />

          <label>Authentication Details</label>
          <input name="authDetails" value={form.authDetails} onChange={handleChange} placeholder="e.g. Requires JWT Bearer token" />

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">{existingApi ? 'Save Changes' : 'Create API'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}