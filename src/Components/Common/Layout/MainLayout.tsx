import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f3f4f6' }}>
      <Sidebar />
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        overflow: 'hidden',
        minWidth: 0
      }}>
        <Header />
        <main style={{ 
          flex: 1, 
          overflowY: 'auto', 
          padding: '1.5rem',
          backgroundColor: '#f3f4f6'
        }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;