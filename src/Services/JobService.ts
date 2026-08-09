import api from './api';
import { WorkOrder, DashboardStats } from '../types';

// Mock data for testing (remove this when backend is ready)
const MOCK_JOBS: WorkOrder[] = [
  {
    woNumber: 'WO-5008',
    title: 'Notification Test',
    description: 'Test notification system',
    priority: 'MEDIUM',
    status: 'COMPLETED',
    scheduledDate: '2026-07-15T17:27',
    slaDate: '2026-07-17T17:27',
    customerId: 1,
    customerName: 'Test Customer',
    assignedTo: 1,
    assignedToName: 'John Doe',
    createdAt: '2026-07-14T10:00',
    updatedAt: '2026-07-16T15:30'
  },
  {
    woNumber: 'WO-5010',
    title: 'AC Fundamental Repair',
    description: 'Repair AC unit',
    priority: 'MEDIUM',
    status: 'COMPLETED',
    scheduledDate: '2026-07-15T18:22',
    slaDate: '2026-07-17T18:22',
    customerId: 2,
    customerName: 'ABC Corp',
    assignedTo: 1,
    assignedToName: 'John Doe',
    createdAt: '2026-07-14T11:00',
    updatedAt: '2026-07-16T16:00'
  },
  {
    woNumber: 'WO-5012',
    title: 'AC-Mechanics',
    description: 'Mechanical inspection',
    priority: 'MEDIUM',
    status: 'COMPLETED',
    scheduledDate: '2026-07-15T20:19',
    slaDate: '2026-07-17T20:19',
    customerId: 3,
    customerName: 'XYZ Ltd',
    assignedTo: 1,
    assignedToName: 'John Doe',
    createdAt: '2026-07-14T12:00',
    updatedAt: '2026-07-16T17:00'
  },
  {
    woNumber: 'WO-6011',
    title: 'AC - Mechanic',
    description: 'Urgent AC repair',
    priority: 'HIGH',
    status: 'ASSIGNED',
    scheduledDate: '2026-08-17T20:58',
    slaDate: '2026-08-18T20:58',
    customerId: 4,
    customerName: 'Tech Solutions',
    assignedTo: 1,
    assignedToName: 'John Doe',
    createdAt: '2026-08-16T09:00',
    updatedAt: '2026-08-16T10:00'
  }
];

const MOCK_STATS: DashboardStats = {
  assigned: 1,
  inProgress: 0,
  completed: 3,
  onHold: 0,
  totalJobs: 4
};

export const jobService = {
  // Technician endpoints
  getTechnicianJobs: async (technicianId: number): Promise<WorkOrder[]> => {
    try {
      // Uncomment this when backend is ready
      // const response = await api.get(`/technician/${technicianId}/jobs`);
      // return response.data;
      
      // Using mock data for testing
      return Promise.resolve(MOCK_JOBS);
    } catch (error) {
      console.error('Error fetching technician jobs:', error);
      throw error;
    }
  },

  getTechnicianStats: async (technicianId: number): Promise<DashboardStats> => {
    try {
      // Uncomment this when backend is ready
      // const response = await api.get(`/technician/${technicianId}/stats`);
      // return response.data;
      
      // Using mock data for testing
      return Promise.resolve(MOCK_STATS);
    } catch (error) {
      console.error('Error fetching technician stats:', error);
      throw error;
    }
  },

  updateJobStatus: async (woNumber: string, status: string): Promise<WorkOrder> => {
    try {
      // Uncomment this when backend is ready
      // const response = await api.patch(`/jobs/${woNumber}/status`, { status });
      // return response.data;
      
      // Using mock data for testing
      const job = MOCK_JOBS.find(j => j.woNumber === woNumber);
      if (job) {
        job.status = status as any;
        job.updatedAt = new Date().toISOString();
        return Promise.resolve(job);
      }
      throw new Error('Job not found');
    } catch (error) {
      console.error('Error updating job status:', error);
      throw error;
    }
  },

  // Dispatcher endpoints
  getAllJobs: async (): Promise<WorkOrder[]> => {
    try {
      // const response = await api.get('/jobs');
      // return response.data;
      return Promise.resolve(MOCK_JOBS);
    } catch (error) {
      console.error('Error fetching all jobs:', error);
      throw error;
    }
  },

  getDispatcherStats: async (): Promise<any> => {
    try {
      // const response = await api.get('/dispatcher/stats');
      // return response.data;
      return Promise.resolve({
        totalJobs: 4,
        pendingAssignment: 1,
        inProgress: 0,
        completedToday: 0
      });
    } catch (error) {
      console.error('Error fetching dispatcher stats:', error);
      throw error;
    }
  },

  assignJob: async (woNumber: string, technicianId: number): Promise<WorkOrder> => {
    try {
      // const response = await api.patch(`/jobs/${woNumber}/assign`, { technicianId });
      // return response.data;
      
      const job = MOCK_JOBS.find(j => j.woNumber === woNumber);
      if (job) {
        job.assignedTo = technicianId;
        job.status = 'ASSIGNED';
        return Promise.resolve(job);
      }
      throw new Error('Job not found');
    } catch (error) {
      console.error('Error assigning job:', error);
      throw error;
    }
  },

  getAvailableTechnicians: async (): Promise<any[]> => {
    try {
      // const response = await api.get('/technicians/available');
      // return response.data;
      return Promise.resolve([
        { id: 1, name: 'John Doe', skill: 'AC Repair', currentJobs: 1 },
        { id: 2, name: 'Jane Smith', skill: 'Electrical', currentJobs: 0 },
        { id: 3, name: 'Bob Johnson', skill: 'Plumbing', currentJobs: 2 }
      ]);
    } catch (error) {
      console.error('Error fetching available technicians:', error);
      throw error;
    }
  },

  // Manager endpoints
  getManagerStats: async (): Promise<any> => {
    try {
      // const response = await api.get('/manager/stats');
      // return response.data;
      return Promise.resolve({
        totalJobs: 4,
        completionRate: 75,
        avgCompletionTime: 2.5,
        totalTechnicians: 3
      });
    } catch (error) {
      console.error('Error fetching manager stats:', error);
      throw error;
    }
  },

  getTeamPerformance: async (): Promise<any> => {
    try {
      // const response = await api.get('/manager/team-performance');
      // return response.data;
      return Promise.resolve([]);
    } catch (error) {
      console.error('Error fetching team performance:', error);
      throw error;
    }
  },

  getTeamMembers: async (): Promise<any[]> => {
    try {
      // const response = await api.get('/manager/team-members');
      // return response.data;
      return Promise.resolve([]);
    } catch (error) {
      console.error('Error fetching team members:', error);
      throw error;
    }
  },

  // Customer endpoints
  getCustomerJobs: async (customerId: number): Promise<WorkOrder[]> => {
    try {
      // const response = await api.get(`/customer/${customerId}/jobs`);
      // return response.data;
      return Promise.resolve(MOCK_JOBS.filter(j => j.customerId === customerId));
    } catch (error) {
      console.error('Error fetching customer jobs:', error);
      throw error;
    }
  },

  createJob: async (jobData: Partial<WorkOrder>): Promise<WorkOrder> => {
    try {
      // const response = await api.post('/jobs', jobData);
      // return response.data;
      
      const newJob: WorkOrder = {
        woNumber: `WO-${Date.now()}`,
        title: jobData.title || 'New Job',
        description: jobData.description || '',
        priority: jobData.priority || 'MEDIUM',
        status: 'ASSIGNED',
        scheduledDate: jobData.scheduledDate || new Date().toISOString(),
        slaDate: jobData.slaDate || new Date(Date.now() + 7*24*60*60*1000).toISOString(),
        customerId: jobData.customerId || 1,
        customerName: jobData.customerName || 'Customer',
        assignedTo: jobData.assignedTo || 1,
        assignedToName: 'John Doe',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      MOCK_JOBS.push(newJob);
      return Promise.resolve(newJob);
    } catch (error) {
      console.error('Error creating job:', error);
      throw error;
    }
  },

  getNotifications: async (userId: number): Promise<any[]> => {
    try {
      // const response = await api.get(`/users/${userId}/notifications`);
      // return response.data;
      return Promise.resolve([
        {
          id: 1,
          message: 'New job assigned: WO-6011',
          type: 'INFO',
          read: false,
          createdAt: new Date().toISOString(),
          woNumber: 'WO-6011'
        },
        {
          id: 2,
          message: 'Job WO-5012 completed successfully',
          type: 'SUCCESS',
          read: true,
          createdAt: new Date(Date.now() - 2*24*60*60*1000).toISOString(),
          woNumber: 'WO-5012'
        }
      ]);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }
  },
};