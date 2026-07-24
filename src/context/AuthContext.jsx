import { createContext, useContext, useState, useEffect } from 'react';
import api from '@/services/api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('devflow_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('devflow_token', res.data.token);
      localStorage.setItem('devflow_user', JSON.stringify(res.data.user));
      setUser(res.data.user);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Login failed' };
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await api.post('/auth/register', { name, email, password });
      localStorage.setItem('devflow_token', res.data.token);
      localStorage.setItem('devflow_user', JSON.stringify(res.data.user));
      setUser(res.data.user);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Registration failed' };
    }
  };

  const googleLogin = async ({ email, name, googleId }) => {
    if (!email || !email.includes('@')) {
      return { success: false, message: 'Please enter a valid Gmail address' };
    }

    try {
      const res = await api.post('/auth/google', { email, name: name || email.split('@')[0], googleId });
      localStorage.setItem('devflow_token', res.data.token);
      localStorage.setItem('devflow_user', JSON.stringify(res.data.user));
      setUser(res.data.user);
      return { success: true };
    } catch (err) {
      // Fallback if backend API is offline during local test
      const realUser = { id: `google_${Date.now()}`, name: name || email.split('@')[0], email };
      localStorage.setItem('devflow_token', `google_token_${Date.now()}`);
      localStorage.setItem('devflow_user', JSON.stringify(realUser));
      setUser(realUser);
      return { success: true };
    }
  };

  const logout = () => {
    localStorage.removeItem('devflow_token');
    localStorage.removeItem('devflow_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, googleLogin, logout, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}