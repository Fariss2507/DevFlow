import { useState } from 'react';
import { BrowserRouter, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { TimerProvider } from '@/context/TimerContext';
import { Sidebar, Navbar } from '@/components/layout';
import AppRoutes from '@/routes/AppRoutes';
import CommandPalette from '@/components/common/CommandPalette';
import FloatingAiAssistant from '@/components/common/FloatingAiAssistant';
import '@/styles/index.css';
import './App.css';

const AUTH_PATHS = ['/login', '/register', '/reset-password'];

function Layout() {
  const { user, loading } = useAuth();
  const location = useLocation();
  const isAuthPage = AUTH_PATHS.includes(location.pathname);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);

  if (loading) {
    return (
      <div className="loading-screen" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'var(--color-bg)', color: 'var(--color-text)', fontFamily: 'var(--font-family)', fontWeight: '700' }}>
        Loading DevForge AI...
      </div>
    );
  }

  if (isAuthPage) {
    return <AppRoutes />;
  }

  if (!user) {
    // If not authenticated, force redirect to login immediately for any workspace routes
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="app-layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="main-wrapper">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="main-content">
          <AppRoutes />
        </main>
      </div>
      <CommandPalette isOpen={cmdOpen} onClose={(toggle) => setCmdOpen(toggle ?? false)} />
      <FloatingAiAssistant />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <TimerProvider>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </TimerProvider>
    </AuthProvider>
  );
}

export default App;