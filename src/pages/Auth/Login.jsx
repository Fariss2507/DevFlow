import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    const result = login(email, password);
    if (result.success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <div className="auth-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2L4 5v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V5l-8-3z"
              fill="var(--color-bg-light)"
            />
            <path
              d="M8.5 12l2.3 2.3L15.5 9.5"
              stroke="var(--color-primary-dark)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h1>Welcome Back</h1>
        <p className="auth-subtitle">Log in to your account to continue</p>

        {error && <div className="auth-error">{error}</div>}

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />

        <div className="auth-row">
          <label className="auth-checkbox">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            Remember me
          </label>
          <Link to="/reset-password" className="auth-link-inline">
            Forgot Password?
          </Link>
        </div>

        <button type="submit" className="auth-btn">Sign In</button>

        <p className="auth-switch">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}