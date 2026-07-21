import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import Dashboard from '../pages/Dashboard/Dashboard';
import Projects from '../pages/Projects/Projects';
import Tasks from '../pages/Tasks/Tasks';
import Bugs from '../pages/Bugs/Bugs';
import Notes from '../pages/Notes/Notes';
import Snippets from '../pages/Snippets/Snippets';
import Apis from '../pages/Apis/Apis';
import CalendarPage from '../pages/Calendar/CalendarPage';
import Analytics from '../pages/Analytics/Analytics';
import Settings from '../pages/Settings/Settings';
import NotFound from '../pages/NotFound';
import ResetPassword from '../pages/Auth/ResetPassword';
import GitHubPage from '../pages/GitHub/GitHubPage';
import TimeTracker from '../pages/TimeTracker/TimeTracker';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/bugs" element={<Bugs />} />
      <Route path="/notes" element={<Notes />} />
      <Route path="/snippets" element={<Snippets />} />
      <Route path="/apis" element={<Apis />} />
      <Route path="/github" element={<GitHubPage />} />
      <Route path="/time-tracker" element={<TimeTracker />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/settings" element={<Settings />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}