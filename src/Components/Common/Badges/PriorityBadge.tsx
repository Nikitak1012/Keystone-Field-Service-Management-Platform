import React from 'react';

interface PriorityBadgeProps {
  priority: string;
  size?: 'sm' | 'md' | 'lg';
}

const priorityConfig: Record<string, { color: string; icon: string; label: string }> = {
  LOW: { 
    color: 'bg-gray-100 text-gray-600', 
    icon: '🔵',
    label: 'Low'
  },
  MEDIUM: { 
    color: 'bg-blue-100 text-blue-700', 
    icon: '🟡',
    label: 'Medium'
  },
  HIGH: { 
    color: 'bg-orange-100 text-orange-700', 
    icon: '🟠',
    label: 'High'
  },
  URGENT: { 
    color: 'bg-red-100 text-red-700', 
    icon: '🔴',
    label: 'Urgent'
  },
};

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
  lg: 'px-3 py-1.5 text-base',
};

const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority, size = 'md' }) => {
  const config = priorityConfig[priority] || {
    color: 'bg-gray-100 text-gray-600',
    icon: '⚪',
    label: priority,
  };

  return (
    <span className={`inline-flex items-center gap-1 font-medium rounded-full ${config.color} ${sizeClasses[size]}`}>
      <span>{config.icon}</span>
      {config.label}
    </span>
  );
};

export default PriorityBadge;