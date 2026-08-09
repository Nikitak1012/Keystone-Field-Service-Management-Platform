import React from 'react';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md' | 'lg';
}

const statusConfig: Record<string, { color: string; label: string; dotColor: string }> = {
  ASSIGNED: { 
    color: 'bg-blue-100 text-blue-800', 
    label: 'Assigned',
    dotColor: 'bg-blue-500'
  },
  IN_PROGRESS: { 
    color: 'bg-yellow-100 text-yellow-800', 
    label: 'In Progress',
    dotColor: 'bg-yellow-500'
  },
  COMPLETED: { 
    color: 'bg-green-100 text-green-800', 
    label: 'Completed',
    dotColor: 'bg-green-500'
  },
  ON_HOLD: { 
    color: 'bg-red-100 text-red-800', 
    label: 'On Hold',
    dotColor: 'bg-red-500'
  },
  CANCELLED: { 
    color: 'bg-gray-100 text-gray-800', 
    label: 'Cancelled',
    dotColor: 'bg-gray-500'
  },
};

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
  lg: 'px-3 py-1.5 text-base',
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const config = statusConfig[status] || {
    color: 'bg-gray-100 text-gray-800',
    label: status,
    dotColor: 'bg-gray-500',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 font-medium rounded-full ${config.color} ${sizeClasses[size]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dotColor}`}></span>
      {config.label}
    </span>
  );
};

export default StatusBadge;