import { useState } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { TimerProvider } from '@/context/TimerContext';
import { Navbar, Sidebar } from '@/components/layout';
import AppRoutes from '@/routes/AppRoutes';
import '@/styles/index.css';
import './App.css';

const AUTH_PATHS = ['/login', '/register', '/reset-password'];

function Layout() {
  const location = useLocation();
  const isAuthPage = AUTH_PATHS.includes(location.pathname);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (isAuthPage) {
    return <AppRoutes />;
  }

  return (
    <>
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="app-layout">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="main-content">
          <AppRoutes />
        </main>
      </div>
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <TimerProvider>
          <BrowserRouter>
            <Layout />
          </BrowserRouter>
        </TimerProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;