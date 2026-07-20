import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Auth.css';

const fieldVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

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
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="auth-topbar">
          <div className="auth-logo">DevFlow</div>
          <Link to="/login" className="auth-topbar-link">
            Remembered it? <span>Log in</span>
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
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
            }}
          >
            <motion.h1 variants={fieldVariants}>Reset password</motion.h1>
            <motion.p className="auth-subtitle" variants={fieldVariants}>
              Enter your email and we'll send you reset instructions
            </motion.p>

            {submitted ? (
              <motion.div
                className="auth-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                If an account exists for {email}, a reset link has been sent.
              </motion.div>
            ) : (
              <>
                <motion.div variants={fieldVariants}>
                  <label>Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                </motion.div>
                <motion.button
                  type="submit"
                  className="auth-btn"
                  variants={fieldVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Reset Link
                </motion.button>
              </>
            )}
          </motion.form>
        </div>
      </motion.div>

      <motion.div
        className="auth-right"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="auth-blob auth-blob-1" />
        <div className="auth-blob auth-blob-2" />
        <motion.div
          className="auth-right-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h2>We've got you covered</h2>
          <p>Get back into your workspace in just a couple of clicks.</p>
        </motion.div>
      </motion.div>
    </div>
  );
}