import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import PerspectiveGrid from '../../components/PerspectiveGrid';
import './Auth.css';

const fieldVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const { register } = useAuth();
  const navigate = useNavigate();

  // ✅ Real Backend API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const result = await register(name, email, password);

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

          <Link to="/login" className="auth-topbar-link">
            Already have an account? <span>Log in</span>
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
              Create your account
            </motion.h1>

            <motion.p
              className="auth-subtitle"
              variants={fieldVariants}
            >
              Start organizing your dev workflow
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
              <label>Full Name</label>

              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </motion.div>

            <motion.div variants={fieldVariants}>
              <label>Email</label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </motion.div>

            <motion.div variants={fieldVariants}>
              <label>Password</label>

              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </motion.div>

            <motion.div variants={fieldVariants}>
              <label>Confirm Password</label>

              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </motion.div>

            <motion.button
              type="submit"
              className="auth-btn"
              variants={fieldVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Create Account
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