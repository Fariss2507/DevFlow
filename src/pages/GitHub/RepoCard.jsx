import { motion } from 'framer-motion';
import './GitHub.css';

export default function RepoCard({ repo, onEdit, onDelete }) {
  return (
    <motion.div
      className="repo-card premium-card"
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div className="repo-card-header">
        <div>
          <h3>{repo.projectName}</h3>
          <a href={repo.repoUrl} target="_blank" rel="noreferrer" className="repo-link">
            {repo.repoUrl}
          </a>
        </div>
        <span className="branch-badge">🌿 {repo.branch}</span>
      </div>

      <div className="last-commit">
        <strong>Last Commit</strong>
        <p>{repo.lastCommit?.message}</p>
        <span className="commit-meta">
          by {repo.lastCommit?.author} on {repo.lastCommit?.date}
        </span>
      </div>

      <div className="repo-lists">
        <div className="repo-list-col">
          <strong>Pull Requests</strong>
          {(!repo.pullRequests || repo.pullRequests.length === 0) ? (
            <p className="empty-mini">No open PRs</p>
          ) : (
            <ul>
              {repo.pullRequests.map((pr, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <span className={`pill-status ${pr.status?.toLowerCase()}`}>{pr.status}</span>
                  {pr.title}
                </motion.li>
              ))}
            </ul>
          )}
        </div>

        <div className="repo-list-col">
          <strong>Issues</strong>
          {(!repo.issues || repo.issues.length === 0) ? (
            <p className="empty-mini">No issues</p>
          ) : (
            <ul>
              {repo.issues.map((issue, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <span className={`pill-status ${issue.status?.toLowerCase()}`}>{issue.status}</span>
                  {issue.title}
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="repo-actions">
        <motion.button
          className="btn-secondary"
          onClick={() => onEdit(repo)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Edit
        </motion.button>
        <motion.button
          className="btn-danger"
          onClick={() => onDelete(repo.id)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Delete
        </motion.button>
      </div>
    </motion.div>
  );
}