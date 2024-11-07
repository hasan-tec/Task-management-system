import React from 'react';
import { Task, Status } from '../types';
import { TaskCard } from './TaskCard';

interface TaskColumnProps {
  title: string;
  icon: React.ReactNode;
  status: Status;
  tasks: Task[];
  onEditTask: (task: Task) => void;
}

export function TaskColumn({ title, icon, tasks, onEditTask }: TaskColumnProps) {
  return (
    <div className="flex flex-col bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl">{icon}</span>
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          </div>
          <span className="bg-gray-100 text-gray-700 text-sm px-2.5 py-0.5 rounded-full font-medium">
            {tasks.length}
          </span>
        </div>
      </div>
      
      <div className="p-4 flex-1 bg-gray-50 rounded-b-lg">
        <div className="flex flex-col gap-3 min-h-[200px]">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} onEdit={onEditTask} />
          ))}
          
          {tasks.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full py-8 text-gray-400">
              <p className="text-center">No tasks here yet</p>
              <p className="text-sm">Tasks will appear here when added</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}