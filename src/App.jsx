import { BrowserRouter, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import AppRoutes from './routes/AppRoutes';
import './App.css';

const AUTH_PATHS = ['/login', '/register', '/reset-password'];

function Layout() {
  const location = useLocation();
  const isAuthPage = AUTH_PATHS.includes(location.pathname);

  if (isAuthPage) {
    return <AppRoutes />;
  }

  return (
    <>
      <Navbar />
      <div className="app-layout">
        <Sidebar />
        <main className="main-content">
          <AppRoutes />
        </main>
      </div>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;