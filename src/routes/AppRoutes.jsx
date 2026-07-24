import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '@/routes/ProtectedRoute';
import Login from '@/pages/Auth/Login';
import Register from '@/pages/Auth/Register';
import ResetPassword from '@/pages/Auth/ResetPassword';
import Dashboard from '@/pages/Dashboard/Dashboard';
import Projects from '@/pages/Projects/Projects';
import Tasks from '@/pages/Tasks/Tasks';
import Bugs from '@/pages/Bugs/Bugs';
import Notes from '@/pages/Notes/Notes';
import Snippets from '@/pages/Snippets/Snippets';
import Apis from '@/pages/Apis/Apis';
import GitHubPage from '@/pages/GitHub/GitHubPage';
import TimeTracker from '@/pages/TimeTracker/TimeTracker';
import CalendarPage from '@/pages/Calendar/CalendarPage';
import Analytics from '@/pages/Analytics/Analytics';
import Settings from '@/pages/Settings/Settings';
import AiWorkspace from '@/pages/AiWorkspace/AiWorkspace';
import FileManager from '@/pages/FileManager/FileManager';
import DocsManager from '@/pages/DocsManager/DocsManager';
import Deployments from '@/pages/Deployments/Deployments';
import DatabaseExplorer from '@/pages/DatabaseExplorer/DatabaseExplorer';
import Profile from '@/pages/Profile/Profile';
import AdminPanel from '@/pages/AdminPanel/AdminPanel';
import NotFound from '@/pages/NotFound';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/ai-workspace" element={<ProtectedRoute><AiWorkspace /></ProtectedRoute>} />
      <Route path="/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
      <Route path="/tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
      <Route path="/bugs" element={<ProtectedRoute><Bugs /></ProtectedRoute>} />
      <Route path="/file-manager" element={<ProtectedRoute><FileManager /></ProtectedRoute>} />
      <Route path="/docs" element={<ProtectedRoute><DocsManager /></ProtectedRoute>} />
      <Route path="/notes" element={<ProtectedRoute><Notes /></ProtectedRoute>} />
      <Route path="/snippets" element={<ProtectedRoute><Snippets /></ProtectedRoute>} />
      <Route path="/apis" element={<ProtectedRoute><Apis /></ProtectedRoute>} />
      <Route path="/github" element={<ProtectedRoute><GitHubPage /></ProtectedRoute>} />
      <Route path="/deployments" element={<ProtectedRoute><Deployments /></ProtectedRoute>} />
      <Route path="/db-explorer" element={<ProtectedRoute><DatabaseExplorer /></ProtectedRoute>} />
      <Route path="/time-tracker" element={<ProtectedRoute><TimeTracker /></ProtectedRoute>} />
      <Route path="/calendar" element={<ProtectedRoute><CalendarPage /></ProtectedRoute>} />
      <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/admin" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
