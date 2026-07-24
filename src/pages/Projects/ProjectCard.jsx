import { motion } from "framer-motion";
import { Calendar, Users, ExternalLink, GitBranch } from 'lucide-react';

const statusClassMap = {
  Planning: 'status-planning',
  'In Progress': 'status-in-progress',
  'On Hold': 'status-on-hold',
  Completed: 'status-completed',
};

export default function ProjectCard({ project, onEdit, onDelete }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="project-card-premium"
    >
      {/* Header */}
      <div className="project-card-header">
        <h3 className="project-card-title truncate" title={project.name}>{project.name}</h3>
        <span className={`project-status-badge ${statusClassMap[project.status] || 'status-planning'}`}>
          {project.status}
        </span>
      </div>

      {/* Description Block */}
      <div className="project-card-body">
        <p className="project-card-desc line-clamp-3">{project.description}</p>

        {project.techStack && project.techStack.length > 0 && (
          <div className="project-tech-tags">
            {project.techStack.map((tech) => (
              <span className="project-tech-tag" key={tech}>
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="project-meta-info font-mono">
          <div className="project-meta-item">
            <Calendar size={13} />
            <span>Deadline: {project.deadline || 'No deadline'}</span>
          </div>
          <div className="project-meta-item">
            <Users size={13} />
            <span className="truncate">Team: {project.teamMembers.join(', ') || 'Unassigned'}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="project-card-footer">
        {/* Links */}
        <div className="project-links-wrap">
          {project.githubRepo && (
            <a 
              href={project.githubRepo} 
              target="_blank" 
              rel="noreferrer" 
              className="project-link-item"
            >
              <GitBranch size={13} />
              <span>Git</span>
            </a>
          )}
          {project.liveDemo && (
            <a 
              href={project.liveDemo} 
              target="_blank" 
              rel="noreferrer" 
              className="project-link-item"
              style={{ color: 'var(--color-pending)' }}
            >
              <ExternalLink size={13} />
              <span>Live</span>
            </a>
          )}
        </div>

        {/* Actions */}
        <div className="project-card-actions">
          <button 
            className="btn-card-edit" 
            onClick={() => onEdit(project)}
          >
            Edit
          </button>
          <button 
            className="btn-card-delete" 
            onClick={() => onDelete(project.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </motion.div>
  );
}