import { motion } from 'framer-motion';
import { GitBranch, GitPullRequest, AlertCircle, ExternalLink, Edit2, Trash2 } from 'lucide-react';

export default function RepoCard({ repo, onEdit, onDelete }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="repo-card-premium"
    >
      {/* Header */}
      <div className="repo-card-header">
        <div className="min-w-0 flex-1">
          <h3 className="repo-card-title truncate" title={repo.projectName}>{repo.projectName}</h3>
          <a 
            href={repo.repoUrl} 
            target="_blank" 
            rel="noreferrer" 
            className="repo-link-text truncate"
          >
            <ExternalLink size={12} />
            {repo.repoUrl}
          </a>
        </div>
        <span className="repo-branch-tag">
          <GitBranch size={12} style={{ display: 'inline', marginRight: '4px' }} />
          {repo.branch}
        </span>
      </div>

      {/* Main content block */}
      <div className="repo-card-body">
        
        {/* Last Commit Info */}
        <div className="commit-panel-glass">
          <strong className="commit-panel-title">Last Commit</strong>
          <p className="commit-panel-message">{repo.lastCommit?.message || 'No commits yet'}</p>
          <span className="commit-panel-meta">
            by {repo.lastCommit?.author || 'Unknown'} on {repo.lastCommit?.date || '—'}
          </span>
        </div>

        {/* PRs and Issues Split grid */}
        <div className="repo-split-grid">
          {/* PRs column */}
          <div className="repo-sub-col">
            <strong className="repo-sub-title">
              <GitPullRequest size={12} style={{ display: 'inline', marginRight: '4px' }} />
              PRs
            </strong>
            {(!repo.pullRequests || repo.pullRequests.length === 0) ? (
              <p className="repo-sub-empty">No open PRs</p>
            ) : (
              <div className="repo-sub-list">
                {repo.pullRequests.map((pr, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="repo-sub-item"
                  >
                    <span className={`pr-badge-status ${pr.status?.toLowerCase() === 'open' ? 'pr-badge-open' : 'pr-badge-closed'}`}>
                      {pr.status}
                    </span>
                    <span className="truncate" title={pr.title}>{pr.title}</span>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Issues column */}
          <div className="repo-sub-col">
            <strong className="repo-sub-title">
              <AlertCircle size={12} style={{ display: 'inline', marginRight: '4px' }} />
              Issues
            </strong>
            {(!repo.issues || repo.issues.length === 0) ? (
              <p className="repo-sub-empty">No open issues</p>
            ) : (
              <div className="repo-sub-list">
                {repo.issues.map((issue, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="repo-sub-item"
                  >
                    <span className={`pr-badge-status ${issue.status?.toLowerCase() === 'open' ? 'issue-badge-open' : 'issue-badge-closed'}`}>
                      {issue.status}
                    </span>
                    <span className="truncate" title={issue.title}>{issue.title}</span>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Actions Footer */}
      <div className="repo-card-footer">
        <button
          className="btn-card-edit"
          onClick={() => onEdit(repo)}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Edit2 size={12} />
            Edit
          </span>
        </button>
        <button
          className="btn-card-delete"
          onClick={() => onDelete(repo.id)}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Trash2 size={12} />
            Delete
          </span>
        </button>
      </div>
    </motion.div>
  );
}