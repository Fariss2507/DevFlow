import { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import ProjectForm from './ProjectForm';
import api from '@/services/api';

import './Projects.css';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await api.get('/projects');
      const mapped = res.data.map((p) => ({ ...p, id: p._id }));
      setProjects(mapped);
    } catch (err) {
      console.error('Failed to fetch projects', err);
    } finally {
      setLoading(false);
    }
  };

  const openNewForm = () => {
    setEditingProject(null);
    setShowForm(true);
  };

  const openEditForm = (project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleSave = async (project) => {
    try {
      if (editingProject) {
        const res = await api.put(`/projects/${editingProject.id}`, project);
        const updated = { ...res.data, id: res.data._id };
        setProjects(projects.map((p) => (p.id === updated.id ? updated : p)));
      } else {
        const res = await api.post('/projects', project);
        const created = { ...res.data, id: res.data._id };
        setProjects([...projects, created]);
      }
      setShowForm(false);
    } catch (err) {
      console.error('Failed to save project', err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return;
    try {
      await api.delete(`/projects/${id}`);
      setProjects(projects.filter((p) => p.id !== id));
    } catch (err) {
      console.error('Failed to delete project', err);
    }
  };

  if (loading) {
    return (
      <div className="page">
        <h1>Projects</h1>
        <p className="empty-state">Loading projects...</p>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Projects</h1>
        <button className="btn-primary" onClick={openNewForm}>+ New Project</button>
      </div>

      {projects.length === 0 ? (
        <p className="empty-state">No projects yet. Create your first one!</p>
      ) : (
        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={openEditForm}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {showForm && (
        <ProjectForm
          existingProject={editingProject}
          onSave={handleSave}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}