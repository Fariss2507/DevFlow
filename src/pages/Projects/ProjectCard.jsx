import './Projects.css';

const statusColors = {
  Planning: '#9ca3af',
  'In Progress': 'var(--color-accent)',
  'On Hold': '#d97706',
  Completed: 'var(--color-primary)',
};

export default function ProjectCard({ project, onEdit, onDelete }) {
  return (
    <div className="project-card">
      <div className="project-card-header">
        <h3>{project.name}</h3>
        <span
          className="status-badge"
          style={{ background: statusColors[project.status] || '#9ca3af' }}
        >
          {project.status}
        </span>
      </div>

      <p className="project-desc">{project.description}</p>

      <div className="tech-tags">
        {project.techStack.map((tech) => (
          <span className="tech-tag" key={tech}>{tech}</span>
        ))}
      </div>

      <div className="project-meta">
        <span>📅 {project.deadline || 'No deadline'}</span>
        <span>👥 {project.teamMembers.join(', ') || 'Unassigned'}</span>
      </div>

      <div className="project-links">
        {project.githubRepo && (
          <a href={project.githubRepo} target="_blank" rel="noreferrer">GitHub</a>
        )}
        {project.liveDemo && (
          <a href={project.liveDemo} target="_blank" rel="noreferrer">Live Demo</a>
        )}
      </div>

      <div className="project-actions">
        <button className="btn-secondary" onClick={() => onEdit(project)}>Edit</button>
        <button className="btn-danger" onClick={() => onDelete(project.id)}>Delete</button>
      </div>
    </div>
  );
}