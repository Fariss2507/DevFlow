import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import PerspectiveGrid from '../../components/PerspectiveGrid';
import './Auth.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  if (!email || !password) {
    setError('Please fill in all fields.');
    return;
  }

  const result = await login(email, password);

  if (result.success) {
    navigate('/dashboard');
  } else {
    setError(result.message);
  }
};

  return (
    <div className="auth-split">
      <motion.div
        className="auth-left"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="auth-topbar">
          <div className="auth-logo">DevFlow</div>

          <Link to="/register" className="auth-topbar-link">
            New here? <span>Create account</span>
          </Link>
        </div>

        <div className="auth-form-wrap">
          <motion.form
            className="auth-form"
            onSubmit={handleSubmit}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.08,
                  delayChildren: 0.15,
                },
              },
            }}
          >
            <motion.h1 variants={fieldVariants}>
              Welcome back
            </motion.h1>

            <motion.p
              className="auth-subtitle"
              variants={fieldVariants}
            >
              Log in to continue to your workspace
            </motion.p>

            {error && (
              <motion.div
                className="auth-error"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {error}
              </motion.div>
            )}

            <motion.div variants={fieldVariants}>
              <label>Email</label>

              <input
                type="email"
                value={email}
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </motion.div>

            <motion.div variants={fieldVariants}>
              <label>Password</label>

              <input
                type="password"
                value={password}
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </motion.div>

            <motion.div
              className="auth-row"
              variants={fieldVariants}
            >
              <label className="auth-checkbox">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) =>
                    setRemember(e.target.checked)
                  }
                />

                Remember me
              </label>

              <Link
                to="/reset-password"
                className="auth-link-inline"
              >
                Forgot password?
              </Link>
            </motion.div>

            <motion.button
              type="submit"
              className="auth-btn"
              variants={fieldVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Sign In
            </motion.button>
          </motion.form>
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

const fieldVariants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};