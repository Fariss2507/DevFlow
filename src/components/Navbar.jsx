import GlobalSearch from './GlobalSearch';
import './Navbar.css';

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-logo">DevFlow</div>
      <GlobalSearch />
      <div className="navbar-actions">
        <span className="navbar-user">👤 Profile</span>
      </div>
    </header>
  );
}