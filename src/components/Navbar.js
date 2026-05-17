import React from 'react';
import { Home, User, Zap, TrendingUp } from 'lucide-react';

function Navbar({ currentPage, onNavigate, selectedPlayer }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'training', label: 'Training', icon: Zap },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <h1>E.S.T</h1>
          <p>Egoist Soccer Training Tracker</p>
        </div>
        
        <div className="navbar-menu">
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
                onClick={() => onNavigate(item.id)}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {selectedPlayer && (
          <div className="navbar-player">
            <span className="player-name">{selectedPlayer.name}</span>
            <span className="player-position">{selectedPlayer.position}</span>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
