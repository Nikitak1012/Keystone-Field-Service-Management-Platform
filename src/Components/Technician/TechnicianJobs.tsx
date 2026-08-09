import React, { useState, useEffect } from 'react';
import { useAuth } from '../../Context/AuthContext'; // ← Fixed: lowercase 'context'
import { jobService } from '../../Services/JobService'; // ← Fixed: lowercase 'services'
import { WorkOrder } from '../../types';
import StatusBadge from '../Common/Badges/StatusBadge'; // ← Fixed: lowercase 'common'
import PriorityBadge from '../Common/Badges/PriorityBadge'; // ← Fixed: lowercase 'common'
import { format } from 'date-fns';
import { 
  MagnifyingGlassIcon,
  EyeIcon,
  ChevronDownIcon // ← ADD THIS
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

const TechnicianJobs: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<WorkOrder[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<WorkOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [priorityFilter, setPriorityFilter] = useState<string>('ALL');

  useEffect(() => {
    const fetchJobs = async () => {
      if (!user) return;
      try {
        const data = await jobService.getTechnicianJobs(user.id);
        setJobs(data);
        setFilteredJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [user]);

  useEffect(() => {
    let filtered = jobs;

    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.woNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'ALL') {
      filtered = filtered.filter(job => job.status === statusFilter);
    }

    if (priorityFilter !== 'ALL') {
      filtered = filtered.filter(job => job.priority === priorityFilter);
    }

    setFilteredJobs(filtered);
  }, [searchTerm, statusFilter, priorityFilter, jobs]);

  const getStatusCount = (status: string) => {
    return jobs.filter(job => job.status === status).length;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Jobs</h1>
        <p className="text-gray-500 mt-1">View and manage all your assigned jobs</p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Total Jobs</p>
          <p className="text-2xl font-bold text-gray-900">{jobs.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">In Progress</p>
          <p className="text-2xl font-bold text-yellow-600">{getStatusCount('IN_PROGRESS')}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Completed</p>
          <p className="text-2xl font-bold text-green-600">{getStatusCount('COMPLETED')}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">On Hold</p>
          <p className="text-2xl font-bold text-red-600">{getStatusCount('ON_HOLD')}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by WO number or title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            >
              <option value="ALL">All Status</option>
              <option value="ASSIGNED">Assigned</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
              <option value="ON_HOLD">On Hold</option>
            </select>
            <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Priority Filter */}
          <div className="relative">
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            >
              <option value="ALL">All Priority</option>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="URGENT">Urgent</option>
            </select>
            <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Jobs List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {filteredJobs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No jobs found matching your filters</p>
            <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredJobs.map((job) => (
              <div
                key={job.woNumber}
                className="px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => navigate(`/job/${job.woNumber}`)}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-sm font-medium text-primary-600">
                        {job.woNumber}
                      </span>
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {job.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-3 mt-1 flex-wrap">
                      <PriorityBadge priority={job.priority} />
                      <StatusBadge status={job.status} />
                      <span className="text-xs text-gray-400">
                        Scheduled: {format(new Date(job.scheduledDate), 'MMM dd, yyyy')}
                      </span>
                      <span className="text-xs text-gray-400">
                        SLA: {format(new Date(job.slaDate), 'MMM dd, yyyy')}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/job/${job.woNumber}`);
                      }}
                      className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      <EyeIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TechnicianJobs;