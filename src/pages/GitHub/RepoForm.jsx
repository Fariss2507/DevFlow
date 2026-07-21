import { useState, useEffect } from 'react';
import './GitHub.css';

const emptyForm = {
  projectName: '',
  repoUrl: '',
  branch: 'main',
  commitMessage: '',
  commitAuthor: '',
  commitDate: '',
};

export default function RepoForm({ existingRepo, onSave, onClose }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (existingRepo) {
      setForm({
        projectName: existingRepo.projectName,
        repoUrl: existingRepo.repoUrl,
        branch: existingRepo.branch,
        commitMessage: existingRepo.lastCommit.message,
        commitAuthor: existingRepo.lastCommit.author,
        commitDate: existingRepo.lastCommit.date,
      });
    } else {
      setForm(emptyForm);
    }
  }, [existingRepo]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.projectName.trim() || !form.repoUrl.trim()) return;

    onSave({
      id: existingRepo ? existingRepo.id : Date.now(),
      projectName: form.projectName,
      repoUrl: form.repoUrl,
      branch: form.branch,
      lastCommit: {
        message: form.commitMessage,
        author: form.commitAuthor,
        date: form.commitDate,
      },
      pullRequests: existingRepo ? existingRepo.pullRequests : [],
      issues: existingRepo ? existingRepo.issues : [],
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h2>{existingRepo ? 'Edit Repository' : 'Link New Repository'}</h2>

        <form onSubmit={handleSubmit}>
          <label>Project Name</label>
          <input name="projectName" value={form.projectName} onChange={handleChange} placeholder="DevFlow" />

          <label>Repository URL</label>
          <input name="repoUrl" value={form.repoUrl} onChange={handleChange} placeholder="https://github.com/user/repo" />

          <label>Branch</label>
          <input name="branch" value={form.branch} onChange={handleChange} placeholder="main" />

          <div className="form-row">
            <div>
              <label>Last Commit Message</label>
              <input name="commitMessage" value={form.commitMessage} onChange={handleChange} placeholder="feat: add feature" />
            </div>
            <div>
              <label>Author</label>
              <input name="commitAuthor" value={form.commitAuthor} onChange={handleChange} placeholder="username" />
            </div>
          </div>

          <label>Commit Date</label>
          <input type="date" name="commitDate" value={form.commitDate} onChange={handleChange} />

          <p className="form-note">
            Pull requests & issues will sync automatically once GitHub API is connected (backend phase).
          </p>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">{existingRepo ? 'Save Changes' : 'Link Repository'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}