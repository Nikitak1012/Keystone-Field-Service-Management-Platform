export interface User {
  id: number;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: 'TECHNICIAN' | 'DISPATCHER' | 'MANAGER' | 'CUSTOMER';
  permissions: string[];
  active: boolean;
  createdAt: string;
}

export interface WorkOrder {
  woNumber: string;
  title: string;
  description?: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT' | 'CRITICAL';
  status: 'ASSIGNED' | 'IN_PROGRESS' | 'COMPLETED' | 'ON_HOLD' | 'CANCELLED' | 'PENDING';
  scheduledDate: string;
  slaDate: string;
  assignedTo?: number;
  assignedToName?: string;
  customerId: number;
  customerName?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  assigned: number;
  inProgress: number;
  completed: number;
  onHold: number;
  totalJobs?: number;
}

export interface Notification {
  id: number;
  message: string;
  type: 'INFO' | 'WARNING' | 'SUCCESS' | 'ERROR';
  read: boolean;
  createdAt: string;
  woNumber?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  role?: string;
}

export interface Technician {
  id: number;
  name: string;
  email: string;
  skill: string;
  currentJobs: number;
  status: 'AVAILABLE' | 'BUSY' | 'OFFLINE';
}

export interface ManagerStats {
  totalJobs: number;
  completionRate: number;
  avgCompletionTime: number;
  totalTechnicians: number;
  totalCustomers: number;
}

export interface TeamPerformance {
  technicianId: number;
  technicianName: string;
  completedJobs: number;
  avgCompletionTime: number;
  rating: number;
}