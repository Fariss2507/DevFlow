import { useState, useEffect } from 'react';
import { statusOptions } from '@/data/projectsData';

import './Projects.css';

const emptyForm = {
  name: '',
  description: '',
  techStack: '',
  githubRepo: '',
  liveDemo: '',
  status: 'Planning',
  deadline: '',
  teamMembers: '',
};

export default function ProjectForm({ existingProject, onSave, onClose }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (existingProject) {
      setForm({
        ...existingProject,
        techStack: existingProject.techStack.join(', '),
        teamMembers: existingProject.teamMembers.join(', '),
      });
    } else {
      setForm(emptyForm);
    }
  }, [existingProject]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    onSave({
      ...form,
      id: existingProject ? existingProject.id : Date.now(),
      techStack: form.techStack.split(',').map((t) => t.trim()).filter(Boolean),
      teamMembers: form.teamMembers.split(',').map((t) => t.trim()).filter(Boolean),
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h2>{existingProject ? 'Edit Project' : 'New Project'}</h2>

        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Project name" />

          <label>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows={3} placeholder="Short description" />

          <label>Technology Stack (comma separated)</label>
          <input name="techStack" value={form.techStack} onChange={handleChange} placeholder="React, Node.js, MongoDB" />

          <div className="form-row">
            <div>
              <label>GitHub Repo</label>
              <input name="githubRepo" value={form.githubRepo} onChange={handleChange} placeholder="https://github.com/..." />
            </div>
            <div>
              <label>Live Demo</label>
              <input name="liveDemo" value={form.liveDemo} onChange={handleChange} placeholder="https://..." />
            </div>
          </div>

          <div className="form-row">
            <div>
              <label>Status</label>
              <select name="status" value={form.status} onChange={handleChange}>
                {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label>Deadline</label>
              <input type="date" name="deadline" value={form.deadline} onChange={handleChange} />
            </div>
          </div>

          <label>Team Members (comma separated)</label>
          <input name="teamMembers" value={form.teamMembers} onChange={handleChange} placeholder="You, Ali" />

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">{existingProject ? 'Save Changes' : 'Create Project'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}