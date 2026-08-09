import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../Context/AuthContext';

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
  { path: '/', label: 'Dashboard', icon: '📊' },
  { path: '/my-jobs', label: 'My Jobs', icon: '📋' },
  { path: '/time-logs/:woNumber', label: 'Time Logs', icon: '⏱️' }, // <--- Add :woNumber
];

  return (
    <div style={{
      width: '240px',
      backgroundColor: '#1e293b', // Navy Blue sidebar
      boxShadow: '2px 0 4px rgba(0,0,0,0.1)',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      position: 'sticky',
      top: 0
    }}>
      {/* Logo */}
      <div style={{ 
        padding: '1.5rem', 
        borderBottom: '1px solid #334155',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
          borderRadius: '0.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '1.25rem'
        }}>
          T
        </div>
        <div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white' }}>TechHub</h1>
          <span style={{ 
            fontSize: '0.625rem', 
            backgroundColor: '#3b82f6', 
            color: 'white', 
            padding: '0.125rem 0.5rem', 
            borderRadius: '9999px',
            display: 'inline-block'
          }}>
            {user?.role || 'User'}
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ 
        flex: 1, 
        padding: '1rem', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '0.25rem' 
      }}>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              borderRadius: '0.5rem',
              textDecoration: 'none',
              fontSize: '0.875rem',
              fontWeight: 500,
              backgroundColor: isActive ? '#3b82f6' : 'transparent',
              color: isActive ? 'white' : '#94a3b8',
              transition: 'all 0.2s'
            })}
            onMouseEnter={(e) => {
              if (!e.currentTarget.style.backgroundColor || e.currentTarget.style.backgroundColor === 'transparent') {
                e.currentTarget.style.backgroundColor = '#334155';
                e.currentTarget.style.color = 'white';
              }
            }}
            onMouseLeave={(e) => {
              if (e.currentTarget.style.backgroundColor === '#334155') {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#94a3b8';
              }
            }}
          >
            <span style={{ fontSize: '1.25rem' }}>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div style={{ 
        padding: '1rem', 
        borderTop: '1px solid #334155',
      }}>
        <button
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem 1rem',
            width: '100%',
            borderRadius: '0.5rem',
            border: 'none',
            backgroundColor: 'transparent',
            color: '#94a3b8',
            fontSize: '0.875rem',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#334155';
            e.currentTarget.style.color = '#ef4444';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#94a3b8';
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;