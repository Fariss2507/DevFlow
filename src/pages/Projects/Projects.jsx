import { useState } from 'react';
import ProjectCard from './ProjectCard';
import ProjectForm from './ProjectForm';
import { initialProjects } from '../../data/projectsData';
import './Projects.css';

export default function Projects() {
  const [projects, setProjects] = useState(initialProjects);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const openNewForm = () => {
    setEditingProject(null);
    setShowForm(true);
  };

  const openEditForm = (project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleSave = (project) => {
    if (editingProject) {
      setProjects(projects.map((p) => (p.id === project.id ? project : p)));
    } else {
      setProjects([...projects, project]);
    }
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (confirm('Delete this project?')) {
      setProjects(projects.filter((p) => p.id !== id));
    }
  };

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