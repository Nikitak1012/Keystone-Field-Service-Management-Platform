import React, { useState, useEffect } from 'react';
import { useAuth } from '../../Context/AuthContext';
import { jobService } from '../../Services/JobService';
import { WorkOrder, DashboardStats } from '../../types';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';


const TechnicianDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats>({
    assigned: 0,
    inProgress: 0,
    completed: 0,
    onHold: 0
  });
  const [jobs, setJobs] = useState<WorkOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const [statsData, jobsData] = await Promise.all([
          jobService.getTechnicianStats(user.id),
          jobService.getTechnicianJobs(user.id)
        ]);
        setStats(statsData);
        setJobs(jobsData);
        setError('');
      } catch (err: any) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, [user]);

  const handleStatusUpdate = async (woNumber: string, newStatus: string) => {
    // 1. Added a confirmation box so they don't click it by mistake
    if (newStatus === 'IN_PROGRESS') {
      const confirmStart = window.confirm(`Are you sure you want to start work on WO ${woNumber}?`);
      if (!confirmStart) return;
    }

    try {
      await jobService.updateJobStatus(woNumber, newStatus);
      if (user) {
        // Refresh the data so the UI updates immediately
        const [statsData, jobsData] = await Promise.all([
          jobService.getTechnicianStats(user.id),
          jobService.getTechnicianJobs(user.id)
        ]);
        setStats(statsData);
        setJobs(jobsData);
      }
    } catch (error) {
      console.error('Error updating job status:', error);
      alert('Failed to update job status');
    }
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '400px' 
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          border: '4px solid #e5e7eb',
          borderTop: '4px solid #3b82f6',
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

  if (error) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '400px',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <p style={{ color: '#dc2626', fontSize: '1.125rem' }}>{error}</p>
        <button 
          onClick={() => window.location.reload()}
          style={{
            padding: '0.5rem 1.5rem',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer'
          }}
        >
          Retry
        </button>
      </div>
    );
  }
  

  const statsCards = [
    {
      title: 'Assigned Jobs',
      value: stats.assigned,
      subtitle: `${jobs.filter(j => j.status === 'ASSIGNED').length} pending`,
      icon: '📋',
      onClick: () => navigate('/my-jobs?status=ASSIGNED')
    },
    {
      title: 'In Progress',
      value: stats.inProgress,
      subtitle: 'Currently working',
      icon: '⚡',
      onClick: () => navigate('/my-jobs?status=IN_PROGRESS')
    },
    {
      title: 'Completed Jobs',
      value: stats.completed,
      subtitle: '✅ Done',
      icon: '✅',
      onClick: () => navigate('/my-jobs?status=COMPLETED')
    },
    {
      title: 'On Hold Jobs',
      value: stats.onHold,
      subtitle: 'Waiting for resolution',
      icon: '⏸️',
      onClick: () => navigate('/my-jobs?status=ON_HOLD')
    }
  ];

  return (
    <div style={{ padding: '1.5rem', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#111827' }}>
          Technician Dashboard
        </h1>
        <p style={{ color: '#6b7280', marginTop: '0.25rem' }}>
          Manage your assigned jobs and track your progress
        </p>
      </div>

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        {statsCards.map((card, index) => (
          <div
            key={index}
            onClick={card.onClick}
            style={{
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '0.75rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              borderLeft: '4px solid #3b82f6',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              transform: 'scale(1)',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(59, 130, 246, 0.2)';
              e.currentTarget.style.backgroundColor = '#eff6ff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
              e.currentTarget.style.backgroundColor = 'white';
            }}
          >
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, #3b82f608, transparent)',
              opacity: 0,
              transition: 'opacity 0.3s ease',
              pointerEvents: 'none'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
            />
            
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>{card.title}</p>
                  <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3b82f6' }}>{card.value}</p>
                  <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>
                    {card.subtitle}
                  </p>
                </div>
                <span style={{ fontSize: '2rem' }}>{card.icon}</span>
              </div>
              <div style={{
                marginTop: '0.5rem',
                fontSize: '0.75rem',
                color: '#3b82f6',
                opacity: 0.6,
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}>
                Click to view →
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Jobs Table */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '0.75rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        <div style={{
          padding: '1rem 1.5rem',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#f8fafc'
        }}>
          <h2 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827' }}>
            My Assigned Jobs
          </h2>
          <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
            {jobs.length} jobs total
          </span>
        </div>

        {jobs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <p style={{ color: '#6b7280' }}>No jobs assigned yet</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ backgroundColor: '#f8fafc' }}>
                <tr>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#475569', textTransform: 'uppercase' }}>
                    WO Number
                  </th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#475569', textTransform: 'uppercase' }}>
                    Title
                  </th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#475569', textTransform: 'uppercase' }}>
                    Priority
                  </th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#475569', textTransform: 'uppercase' }}>
                    Status
                  </th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#475569', textTransform: 'uppercase' }}>
                    Scheduled
                  </th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#475569', textTransform: 'uppercase' }}>
                    SLA
                  </th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#475569', textTransform: 'uppercase' }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job.woNumber} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background-color 0.2s' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                  >
                    <td style={{ padding: '0.75rem 1rem', whiteSpace: 'nowrap' }}>
                      <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#3b82f6' }}>
                        {job.woNumber}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem 1rem', whiteSpace: 'nowrap' }}>
                      <span style={{ fontSize: '0.875rem', color: '#111827' }}>{job.title}</span>
                    </td>
                    <td style={{ padding: '0.75rem 1rem', whiteSpace: 'nowrap' }}>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: '500',
                        backgroundColor: job.priority === 'HIGH' ? '#fef3c7' : 
                                       job.priority === 'URGENT' ? '#fee2e2' : '#dbeafe',
                        color: job.priority === 'HIGH' ? '#d97706' : 
                               job.priority === 'URGENT' ? '#dc2626' : '#3b82f6'
                      }}>
                        {job.priority}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem 1rem', whiteSpace: 'nowrap' }}>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: '500',
                        backgroundColor: job.status === 'COMPLETED' ? '#dcfce7' :
                                       job.status === 'IN_PROGRESS' ? '#fef3c7' :
                                       job.status === 'ON_HOLD' ? '#fee2e2' : '#dbeafe',
                        color: job.status === 'COMPLETED' ? '#16a34a' :
                               job.status === 'IN_PROGRESS' ? '#d97706' :
                               job.status === 'ON_HOLD' ? '#dc2626' : '#3b82f6'
                      }}>
                        {job.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem 1rem', whiteSpace: 'nowrap', fontSize: '0.875rem', color: '#64748b' }}>
                      {format(new Date(job.scheduledDate), 'MMM dd, yyyy')}
                    </td>
                    <td style={{ padding: '0.75rem 1rem', whiteSpace: 'nowrap', fontSize: '0.875rem', color: '#64748b' }}>
                      {format(new Date(job.slaDate), 'MMM dd, yyyy')}
                    </td>
                    <td style={{ padding: '0.75rem 1rem', whiteSpace: 'nowrap' }}>
                      <button
                        onClick={() => navigate(`/job/${job.woNumber}`)}
                        style={{
                          padding: '0.25rem 0.75rem',
                          backgroundColor: '#3b82f6',
                          color: 'white',
                          border: 'none',
                          borderRadius: '0.375rem',
                          fontSize: '0.75rem',
                          cursor: 'pointer',
                          marginRight: '0.5rem',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
                      >
                        View
                      </button>

                      {/* START BUTTON - Only shows if status is ASSIGNED */}
                      {job.status === 'ASSIGNED' && (
                        <button
                          onClick={() => handleStatusUpdate(job.woNumber, 'IN_PROGRESS')}
                          style={{
                            padding: '0.25rem 0.75rem',
                            backgroundColor: '#10b981', // Changed color to GREEN to stand out
                            color: 'white',
                            border: 'none',
                            borderRadius: '0.375rem',
                            fontSize: '0.75rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#059669'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#10b981'}
                        >
                          Start
                        </button>
                      )}

                      {/* NEW: LOG TIME BUTTON - Shows if status is IN_PROGRESS */}
                      {job.status === 'IN_PROGRESS' && (
                        <button
                          onClick={() => navigate(`/time-logs/${job.woNumber}`)}
                          style={{
                            padding: '0.25rem 0.75rem',
                            backgroundColor: '#f59e0b', // Amber color to distinguish it
                            color: 'white',
                            border: 'none',
                            borderRadius: '0.375rem',
                            fontSize: '0.75rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d97706'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f59e0b'}
                        >
                          Log Time
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TechnicianDashboard;