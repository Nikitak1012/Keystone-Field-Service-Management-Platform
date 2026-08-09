import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { jobService } from '../../Services/JobService';
import { WorkOrder } from '../../types';
import StatusBadge from '../Common/Badges/StatusBadge';
import PriorityBadge from '../Common/Badges/PriorityBadge';
import { format } from 'date-fns';
import { 
  ArrowLeftIcon,
  CheckCircleIcon,
  PlayIcon,
  PauseIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
  CalendarIcon,
  ClockIcon,
  FlagIcon,
  DocumentArrowUpIcon, // <--- Added this import
  XMarkIcon            // <--- Added this import
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const JobDetails: React.FC = () => {
  const { woNumber } = useParams<{ woNumber: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [job, setJob] = useState<WorkOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // --- NEW STATE FOR PROJECT SUBMISSION MODAL ---
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchJobDetails = async () => {
      if (!woNumber) return;
      try {
        if (!user) return;
        const jobs = await jobService.getTechnicianJobs(user.id);
        const foundJob = jobs.find(j => j.woNumber === woNumber);
        if (foundJob) {
          setJob(foundJob);
        } else {
          toast.error('Job not found');
          navigate('/');
        }
      } catch (error) {
        console.error('Error fetching job details:', error);
        toast.error('Failed to load job details');
      } finally {
        setLoading(false);
      }
    };
    fetchJobDetails();
  }, [woNumber, user, navigate]);

  const handleStatusUpdate = async (newStatus: string) => {
    if (!job) return;
    setUpdating(true);
    try {
      await jobService.updateJobStatus(job.woNumber, newStatus);
      toast.success(`Job status updated to ${newStatus}`);
      setJob({ ...job, status: newStatus as any });
    } catch (error) {
      console.error('Error updating job status:', error);
      toast.error('Failed to update job status');
    } finally {
      setUpdating(false);
    }
  };

  const getStatusActions = () => {
    if (!job) return [];
    const actions = [];
    switch (job.status) {
      case 'ASSIGNED':
        actions.push({
          label: 'Start Job',
          icon: PlayIcon,
          color: 'bg-green-600 hover:bg-green-700',
          onClick: () => navigate(`/time-logs/${job.woNumber}`)
        });
        break;
      case 'IN_PROGRESS':
        actions.push({
          label: 'Complete Job',
          icon: CheckCircleIcon,
          color: 'bg-blue-600 hover:bg-blue-700',
          onClick: () => handleStatusUpdate('COMPLETED')
        });
        actions.push({
          label: 'Put on Hold',
          icon: PauseIcon,
          color: 'bg-yellow-600 hover:bg-yellow-700',
          onClick: () => handleStatusUpdate('ON_HOLD')
        });
        break;
      case 'ON_HOLD':
        actions.push({
          label: 'Resume Job',
          icon: PlayIcon,
          color: 'bg-green-600 hover:bg-green-700',
          onClick: () => handleStatusUpdate('IN_PROGRESS')
        });
        break;
      
      // --- NEW CASE ADDED HERE ---
      case 'COMPLETED':
        actions.push({
          label: 'Submit Project',
          icon: DocumentArrowUpIcon,
          color: 'bg-purple-600 hover:bg-purple-700',
          onClick: () => setIsSubmissionModalOpen(true)
        });
        break;
    }
    return actions;
  };

  // --- SUBMISSION HANDLER (Placeholder until we build the backend) ---
    const handleProjectSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      
      // Add the Work Order Number manually so the backend knows which job it is
      formData.append('woNumber', job!.woNumber);

      // THIS IS THE URL WE JUST CREATED IN SPRING BOOT
      const response = await fetch('http://localhost:7373/api/work-orders/submit-project', {
        method: 'POST',
        body: formData, 
        // DO NOT add 'Content-Type': 'multipart/form-data' header manually. 
        // The browser automatically handles this for FormData.
      });

      if (!response.ok) {
        throw new Error('Failed to submit project');
      }

      toast.success('Project submitted successfully!');
      setIsSubmissionModalOpen(false);
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Failed to submit project. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="text-center py-12">
        <ExclamationTriangleIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">Job not found</p>
        <button
          onClick={() => navigate('/')}
          className="btn-primary mt-4"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  const isSLAExpired = new Date(job.slaDate) < new Date() && job.status !== 'COMPLETED';
  const actions = getStatusActions();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{job.woNumber}</h1>
            <p className="text-gray-500">{job.title}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge status={job.status} size="lg" />
          <PriorityBadge priority={job.priority} />
        </div>
      </div>

      {/* Action Buttons */}
      {actions.length > 0 && (
        <div className="flex gap-2">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              disabled={updating}
              className={`px-4 py-2 rounded-lg text-white font-medium flex items-center gap-2 transition-colors ${action.color} ${
                updating ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <action.icon className="w-5 h-5" />
              {action.label}
            </button>
          ))}
        </div>
      )}

      {/* Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <DocumentTextIcon className="w-5 h-5 text-gray-400" />
              Job Details
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Description</p>
                <p className="text-gray-800 mt-1">{job.description || 'No description provided'}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-3 border-t">
                <div>
                  <p className="text-sm text-gray-500">Customer</p>
                  <p className="text-gray-800 font-medium">{job.customerName || `Customer #${job.customerId}`}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Assigned To</p>
                  <p className="text-gray-800 font-medium">{job.assignedToName || `Technician #${job.assignedTo}`}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <ClockIcon className="w-5 h-5 text-gray-400" />
              Timeline
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <CheckCircleIcon className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Created</p>
                  <p className="text-sm text-gray-500">{format(new Date(job.createdAt), 'MMM dd, yyyy HH:mm')}</p>
                </div>
              </div>
              {job.status !== 'ASSIGNED' && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <PlayIcon className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Started</p>
                    <p className="text-sm text-gray-500">{format(new Date(job.updatedAt), 'MMM dd, yyyy HH:mm')}</p>
                  </div>
                </div>
              )}
              {job.status === 'COMPLETED' && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <FlagIcon className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Completed</p>
                    <p className="text-sm text-gray-500">{format(new Date(job.updatedAt), 'MMM dd, yyyy HH:mm')}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-4">Schedule Information</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-400">Scheduled Date</p>
                <p className="text-sm text-gray-800 font-medium flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-gray-400" />
                  {format(new Date(job.scheduledDate), 'MMM dd, yyyy HH:mm')}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400">SLA Date</p>
                <p className={`text-sm font-medium flex items-center gap-2 ${
                  isSLAExpired ? 'text-red-600' : 'text-gray-800'
                }`}>
                  <FlagIcon className={`w-4 h-4 ${isSLAExpired ? 'text-red-500' : 'text-gray-400'}`} />
                  {format(new Date(job.slaDate), 'MMM dd, yyyy HH:mm')}
                  {isSLAExpired && (
                    <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">
                      EXPIRED
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button
                onClick={() => window.print()}
                className="w-full px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                🖨️ Print Job Details
              </button>
              <button
                onClick={() => navigator.clipboard.writeText(job.woNumber)}
                className="w-full px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                📋 Copy WO Number
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- PROJECT SUBMISSION MODAL --- */}
      {isSubmissionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <span className="text-blue-600 text-2xl">ⓘ</span> Submit Project ({job.woNumber})
              </h2>
              <button 
                onClick={() => setIsSubmissionModalOpen(false)} 
                className="text-gray-500 hover:text-gray-800 p-1 rounded-full hover:bg-gray-100"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleProjectSubmission} className="p-6 overflow-y-auto flex-1 space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-800 mb-1">1. Source Code</h3>
                <input 
                  type="text" 
                  placeholder="Paste GitHub/Drive URL here..."
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-800 mb-1">2. Live Deployment</h3>
                <input 
                  type="url" 
                  placeholder="Paste hosted URL here..."
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-800 mb-1">3. Demo Video</h3>
                <input 
                  type="url" 
                  placeholder="Paste YouTube/Drive URL here..."
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-800 mb-1">4. Feedback Video</h3>
                <input 
                  type="url" 
                  placeholder="Paste URL here..."
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-800 mb-1">5. Project Report</h3>
                <input 
                  type="file" 
                  accept=".pdf,.doc,.docx"
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  required
                />
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button 
                  type="button" 
                  onClick={() => setIsSubmissionModalOpen(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetails;