import './GitHub.css';

export default function RepoCard({ repo, onEdit, onDelete }) {
  return (
    <div className="repo-card">
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
        <p>{repo.lastCommit.message}</p>
        <span className="commit-meta">
          by {repo.lastCommit.author} on {repo.lastCommit.date}
        </span>
      </div>

      <div className="repo-lists">
        <div className="repo-list-col">
          <strong>Pull Requests</strong>
          {repo.pullRequests.length === 0 ? (
            <p className="empty-mini">No open PRs</p>
          ) : (
            <ul>
              {repo.pullRequests.map((pr) => (
                <li key={pr.id}>
                  <span className={`pill-status ${pr.status.toLowerCase()}`}>{pr.status}</span>
                  {pr.title}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="repo-list-col">
          <strong>Issues</strong>
          {repo.issues.length === 0 ? (
            <p className="empty-mini">No issues</p>
          ) : (
            <ul>
              {repo.issues.map((issue) => (
                <li key={issue.id}>
                  <span className={`pill-status ${issue.status.toLowerCase()}`}>{issue.status}</span>
                  {issue.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="repo-actions">
        <button className="btn-secondary" onClick={() => onEdit(repo)}>Edit</button>
        <button className="btn-danger" onClick={() => onDelete(repo.id)}>Delete</button>
      </div>
    </div>
  );
}