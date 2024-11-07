import React from 'react';
import { Calendar, User, Flag } from 'lucide-react';
import { Task, Priority } from '../types';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
}

const priorityConfig: Record<Priority, { color: string; label: string }> = {
  low: { color: 'bg-blue-100 text-blue-800 border-blue-200', label: 'Low Priority' },
  medium: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', label: 'Medium Priority' },
  high: { color: 'bg-red-100 text-red-800 border-red-200', label: 'High Priority' },
};

export function TaskCard({ task, onEdit }: TaskCardProps) {
  const priorityStyle = priorityConfig[task.priority];
  const dueDate = new Date(task.dueDate);
  const isOverdue = dueDate < new Date() && task.status !== 'done';

  return (
    <div 
      className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all cursor-pointer transform hover:-translate-y-1"
      onClick={() => onEdit(task)}
    >
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-medium text-gray-900 flex-1">{task.title}</h3>
          <span className={`text-xs px-2 py-1 rounded-full ${priorityStyle.color} border`}>
            {priorityStyle.label}
          </span>
        </div>
        
        {task.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>
        )}
        
        <div className="flex flex-col gap-2 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <User size={14} className="text-gray-400" />
            <span>{task.assignedTo || 'Unassigned'}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Calendar size={14} className={isOverdue ? 'text-red-500' : 'text-gray-400'} />
            <span className={isOverdue ? 'text-red-500 font-medium' : ''}>
              {isOverdue ? 'Overdue - ' : ''}{dueDate.toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}