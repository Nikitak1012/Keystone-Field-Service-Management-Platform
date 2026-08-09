import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await login(email, password);
      navigate('/');
    } catch (err: any) {
      console.error('Login failed:', err);
      setError(err?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #e0e7ff 0%, #ede9fe 50%, #fce7f3 100%)',
      padding: '1rem',
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '2rem',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        width: '100%',
        maxWidth: '420px',
        padding: '2.5rem',
        border: '1px solid #f3f4f6',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '4rem',
            height: '4rem',
            background: 'linear-gradient(135deg, #2563eb, #4f46e5)',
            borderRadius: '1rem',
            boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.3)',
            marginBottom: '1rem',
          }}>
            <span style={{ fontSize: '1.75rem', fontWeight: 'bold', color: 'white' }}>T</span>
          </div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827' }}>TechHub</h1>
          <p style={{ color: '#6b7280', marginTop: '0.25rem', fontSize: '0.875rem' }}>Sign in to your account</p>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            marginBottom: '1rem',
            padding: '0.75rem',
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#dc2626',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
          }}>
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                transition: 'all 0.2s',
                outline: 'none',
              }}
              onFocus={(e) => e.target.style.borderColor = '#2563eb'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              placeholder="you@example.com"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                transition: 'all 0.2s',
                outline: 'none',
              }}
              onFocus={(e) => e.target.style.borderColor = '#2563eb'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              placeholder="••••••••"
              required
              disabled={loading}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="checkbox"
                style={{
                  width: '1rem',
                  height: '1rem',
                  accentColor: '#2563eb',
                  borderRadius: '0.25rem',
                  border: '1px solid #d1d5db',
                }}
              />
              <span style={{ marginLeft: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>Remember me</span>
            </label>
            <Link to="/forgot-password" style={{ fontSize: '0.875rem', color: '#2563eb', textDecoration: 'none' }}>
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: 'linear-gradient(135deg, #2563eb, #4f46e5)',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              fontSize: '1rem',
              fontWeight: '500',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.5 : 1,
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.background = 'linear-gradient(135deg, #1d4ed8, #4338ca)';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.background = 'linear-gradient(135deg, #2563eb, #4f46e5)';
              }
            }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Register Link */}
        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: '#2563eb', fontWeight: '500', textDecoration: 'none' }}>
              Create one
            </Link>
          </p>
        </div>

        {/* Demo Credentials */}
        <div style={{
          marginTop: '1.5rem',
          padding: '0.75rem 1rem',
          backgroundColor: '#f9fafb',
          borderRadius: '0.5rem',
          border: '1px solid #e5e7eb',
        }}>
          <p style={{ fontSize: '0.75rem', color: '#6b7280', textAlign: 'center' }}>
            🔑 Demo: tech@example.com / password
          </p>
        </div>

        {/* Footer */}
        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <p style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
            © 2026 TechHub. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;