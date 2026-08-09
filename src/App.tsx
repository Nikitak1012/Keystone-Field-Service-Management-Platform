import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './Context/AuthContext';
import MainLayout from './Components/Common/Layout/MainLayout';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import TechnicianDashboard from './Components/Technician/TechnicianDashboard';
import TechnicianJobs from './Components/Technician/TechnicianJobs';
import JobDetails from './Components/Technician/JobDetails';
import TimeLogs from './Pages/TimeLogs'; // <--- This import was already there, good!
import Profile from './Pages/Profile';

// ProtectedRoute component - MUST be inside AuthProvider
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          border: '4px solid #e5e7eb',
          borderTop: '4px solid #2563eb',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

// AppRoutes component - uses ProtectedRoute
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route path="/" element={
        <ProtectedRoute>
          <MainLayout>
            <TechnicianDashboard />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/my-jobs" element={
        <ProtectedRoute>
          <MainLayout>
            <TechnicianJobs />
          </MainLayout>
        </ProtectedRoute>
      } />

      {/* --- NEW ROUTE ADDED HERE --- */}
      <Route path="/time-logs/:woNumber" element={
  <ProtectedRoute>
    <MainLayout>
      <TimeLogs />
    </MainLayout>
  </ProtectedRoute>
} />
      {/* --------------------------- */}
      
      <Route path="/job/:woNumber" element={
        <ProtectedRoute>
          <MainLayout>
            <JobDetails />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/profile" element={
  <ProtectedRoute>
    <MainLayout>
      <Profile />
    </MainLayout>
  </ProtectedRoute>
} />
      
      <Route path="*" element={<Navigate to="/" />} />

    </Routes>
  );
};

// App component - AuthProvider wraps everything
function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
      </Router>
    </AuthProvider>
  );
}

export default App;