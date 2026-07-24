import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { KeyRound, Mail } from 'lucide-react';
import { PerspectiveGrid } from '@/components/features';
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
    <div className="auth-split">
      <motion.div
        className="auth-left"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="auth-topbar">
          <div className="auth-logo">DevForge AI</div>
          <Link to="/login" className="auth-topbar-link">
            Remembered it? <span>Log in</span>
          </Link>
        </div>

        <div className="auth-form-wrap">
          <motion.div
            className="auth-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {/* Top Glass Badge Icon */}
            <div className="auth-header-icon">
              <KeyRound size={24} />
            </div>

            <h1>Reset Password</h1>
            <p className="auth-subtitle">
              Enter your email address below and we'll send you password recovery instructions.
            </p>

            {submitted ? (
              <motion.div
                className="auth-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                If an account exists for <b>{email}</b>, a reset link has been sent to your inbox.
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="auth-form">
                <div className="auth-field">
                  <div className="input-with-icon">
                    <Mail className="input-icon-left" size={18} />
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <button type="submit" className="auth-btn" style={{ marginTop: '10px' }}>
                  Send Reset Link
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="auth-right"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <PerspectiveGrid />
      </motion.div>
    </div>
  );
}