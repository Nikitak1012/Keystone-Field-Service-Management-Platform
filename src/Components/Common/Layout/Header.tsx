import React, { useState } from 'react';
import { useAuth } from '../../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    {
      id: 1,
      message: 'New job assigned: WO-6011',
      time: '2 min ago',
      read: false
    },
    {
      id: 2,
      message: 'Job WO-5012 completed successfully',
      time: '1 hour ago',
      read: true
    },
    {
      id: 3,
      message: 'SLA deadline approaching for WO-5008',
      time: '3 hours ago',
      read: true
    }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header style={{
      backgroundColor: 'white',
      padding: '1rem 2rem',
      borderBottom: '1px solid #e5e7eb',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div>
        <h2 style={{ 
          fontSize: '1.25rem', 
          fontWeight: '600', 
          color: '#111827',
          margin: 0
        }}>
          {/* CHANGE 1: Changed user?.username to user?.displayName */}
          Welcome back, {user?.displayName || user?.username || 'User'}!
        </h2>
        <p style={{ 
          fontSize: '0.875rem', 
          color: '#6b7280', 
          margin: '0.125rem 0 0 0'
        }}>
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        {/* Notification Icon */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            style={{
              padding: '0.5rem',
              borderRadius: '0.5rem',
              border: 'none',
              backgroundColor: showNotifications ? '#eff6ff' : 'transparent',
              cursor: 'pointer',
              position: 'relative',
              fontSize: '1.25rem',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              if (!showNotifications) {
                e.currentTarget.style.backgroundColor = '#f3f4f6';
              }
            }}
            onMouseLeave={(e) => {
              if (!showNotifications) {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            🔔
            {unreadCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '0.25rem',
                right: '0.25rem',
                width: '1rem',
                height: '1rem',
                backgroundColor: '#ef4444',
                color: 'white',
                borderRadius: '50%',
                fontSize: '0.625rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold'
              }}>
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notification Dropdown */}
          {showNotifications && (
            <div style={{
              position: 'absolute',
              top: 'calc(100% + 0.5rem)',
              right: 0,
              width: '320px',
              backgroundColor: 'white',
              borderRadius: '0.75rem',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
              border: '1px solid #e5e7eb',
              zIndex: 1000,
              maxHeight: '400px',
              overflowY: 'auto'
            }}>
              <div style={{
                padding: '1rem',
                borderBottom: '1px solid #e5e7eb',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#111827', margin: 0 }}>
                  Notifications
                </h3>
                <button
                  onClick={() => setShowNotifications(false)}
                  style={{
                    border: 'none',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    color: '#6b7280'
                  }}
                >
                  ✕
                </button>
              </div>
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  style={{
                    padding: '0.75rem 1rem',
                    borderBottom: '1px solid #f3f4f6',
                    backgroundColor: notification.read ? 'white' : '#eff6ff',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = notification.read ? 'white' : '#eff6ff';
                  }}
                >
                  <p style={{ fontSize: '0.875rem', color: '#111827', margin: 0 }}>
                    {notification.message}
                  </p>
                  <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: '0.25rem 0 0 0' }}>
                    {notification.time}
                  </p>
                </div>
              ))}
              <div style={{ padding: '0.75rem', textAlign: 'center' }}>
                <button
                  onClick={() => {
                    setShowNotifications(false);
                    navigate('/notifications');
                  }}
                  style={{
                    border: 'none',
                    backgroundColor: 'transparent',
                    color: '#3b82f6',
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    fontWeight: '500'
                  }}
                >
                  View all notifications →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* CHANGE 2: Profile clickable WITH IMAGE SUPPORT */}
        <div
          onClick={() => navigate('/profile')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            cursor: 'pointer',
            padding: '0.25rem 0.5rem',
            borderRadius: '0.5rem',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          {/* REPLACED THE EMOJI WITH THIS AVATAR LOGIC */}
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '2px solid #e5e7eb',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#3b82f6'
          }}>
            {user?.profileImage ? (
              <img 
                src={user.profileImage} 
                alt="Profile" 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover' 
                }}
              />
            ) : (
              <span style={{ 
                color: 'white', 
                fontWeight: 'bold', 
                fontSize: '1rem' 
              }}>
                {/* Changed from username to displayName to match profile */}
                {(user?.displayName || user?.username || 'U').charAt(0).toUpperCase()}
              </span>
            )}
          </div>

          <div>
            <p style={{ 
              fontSize: '0.875rem', 
              fontWeight: '500', 
              color: '#111827',
              margin: 0
            }}>
              {/* CHANGE 3: Updated to show displayName */}
              {user?.displayName || user?.username}
            </p>
            <p style={{ 
              fontSize: '0.75rem', 
              color: '#6b7280',
              margin: 0
            }}>
              {user?.role}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;