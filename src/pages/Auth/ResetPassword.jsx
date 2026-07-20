import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
  
    setSubmitted(true);
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Reset Password</h1>
        <p className="auth-subtitle">
          Enter your email and we'll send you reset instructions
        </p>

        {submitted ? (
          <div className="auth-success">
            If an account exists for {email}, a reset link has been sent.
          </div>
        ) : (
          <>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
            <button type="submit" className="auth-btn">Send Reset Link</button>
          </>
        )}

        <p className="auth-switch">
          <Link to="/login">Back to Login</Link>
        </p>
      </form>
    </div>
  );
}