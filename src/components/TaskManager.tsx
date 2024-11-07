import React, { useState } from 'react';
import { Plus, LayoutDashboard } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';
import { TaskColumn } from './TaskColumn';
import { TaskModal } from './TaskModal';
import { useTasks } from '../hooks/useTasks';
import { Task, Status } from '../types';

const columns: { id: Status; title: string; icon: React.ReactNode }[] = [
  { id: 'will-do', title: 'Will Do', icon: '📋' },
  { id: 'doing', title: 'In Progress', icon: '⚡' },
  { id: 'done', title: 'Completed', icon: '✅' },
];

export default function TaskManager() {
  const { user } = useUser();
  const { tasks, addTask, updateTask } = useTasks(user?.id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();

  const handleSaveTask = async (task: Task) => {
    if (editingTask) {
      await updateTask(task);
    } else {
      await addTask({ ...task, user_id: user?.id });
    }
    setIsModalOpen(false);
    setEditingTask(undefined);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(undefined);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <LayoutDashboard className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Task Manager</h1>
                <p className="text-sm text-gray-500">Welcome back, {user?.firstName || 'User'}!</p>
              </div>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <Plus size={20} className="mr-2" />
              New Task
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map((column) => (
            <TaskColumn
              key={column.id}
              title={column.title}
              icon={column.icon}
              status={column.id}
              tasks={tasks.filter((task) => task.status === column.id)}
              onEditTask={handleEditTask}
            />
          ))}
        </div>
      </main>

      {isModalOpen && (
        <TaskModal
          task={editingTask}
          onClose={handleCloseModal}
          onSave={handleSaveTask}
        />
      )}
    </div>
  );
}