import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  hasPermission: (permission: string) => boolean;
  // Add 'profileImage?' here too:
  updateUserProfile: (updates: { displayName: string; profileImage?: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USER: User = {
  id: 1,
  username: 'tech_user',
  email: 'tech@example.com',
  firstName: 'John',
  lastName: 'Doe',
  role: 'TECHNICIAN',
  permissions: ['VIEW_JOBS', 'UPDATE_STATUS'],
  active: true,
  createdAt: new Date().toISOString()
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // For demo, accept any credentials
      const mockUser = {
        ...MOCK_USER,
        email: email,
        username: email.split('@')[0] || 'tech_user',
        // Initialize displayName based on email if it doesn't exist
        displayName: email.split('@')[0] || 'Technician'
      };
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: any) => {
    setIsLoading(true);
    try {
      const newUser = {
        ...MOCK_USER,
        ...userData,
        id: Date.now(),
        displayName: userData.displayName || userData.email?.split('@')[0] || 'Technician'
      };
      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  // --- FIXED updateUserProfile FUNCTION ---
  // Inside AuthContext.tsx
const updateUserProfile = async (updates: { displayName: string; profileImage?: string }) => {
  if (!user) {
    throw new Error("No user is logged in");
  }

  const updatedUser = { ...user, ...updates };
  setUser(updatedUser);
  localStorage.setItem('user', JSON.stringify(updatedUser));
};
  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    return user.permissions?.includes(permission) || false;
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      isLoading, 
      hasPermission,
      updateUserProfile // <--- FIXED: MADE SURE THIS IS EXPORTED
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};