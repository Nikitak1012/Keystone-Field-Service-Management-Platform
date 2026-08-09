import api from './api';
import { LoginRequest, LoginResponse, RegisterRequest, User } from '../types'; // ← Import from types.ts

export const authService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    try {
      const mockUser: User = {
        id: 1,
        username: credentials.email.split('@')[0] || 'tech_user',
        email: credentials.email,
        firstName: 'John',
        lastName: 'Doe',
        role: 'TECHNICIAN',
        permissions: ['VIEW_JOBS', 'UPDATE_STATUS'],
        active: true,
        createdAt: new Date().toISOString()
      };
      
      return {
        token: 'mock-jwt-token-123456',
        user: mockUser
      };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  register: async (userData: RegisterRequest): Promise<User> => {
    try {
      const newUser: User = {
        id: Date.now(),
        username: userData.username,
        email: userData.email,
        firstName: userData.username,
        role: 'TECHNICIAN',
        permissions: ['VIEW_JOBS', 'UPDATE_STATUS'],
        active: true,
        createdAt: new Date().toISOString()
      };
      return Promise.resolve(newUser);
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  },

  getCurrentUser: async (): Promise<User> => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        return JSON.parse(storedUser);
      }
      throw new Error('User not found');
    } catch (error) {
      console.error('Error getting current user:', error);
      throw error;
    }
  },

  logout: (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  forgotPassword: async (email: string): Promise<void> => {
    try {
      console.log('Forgot password for:', email);
    } catch (error) {
      console.error('Forgot password error:', error);
      throw error;
    }
  },

  resetPassword: async (token: string, newPassword: string): Promise<void> => {
    try {
      console.log('Reset password with token:', token);
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  },
};