import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Task } from '../types';
import { fetchTasks, createTask, updateTaskInDb, deleteTaskFromDb } from '../lib/supabase';

export function useTasks(userId?: string) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      loadTasks();
    }
  }, [userId]);

  async function loadTasks() {
    try {
      const data = await fetchTasks(userId!);
      setTasks(data);
    } catch (error) {
      toast.error('Failed to load tasks');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const addTask = async (task: Task) => {
    try {
      await createTask(task);
      setTasks([task, ...tasks]);
      toast.success('Task created successfully');
    } catch (error) {
      toast.error('Failed to create task');
      console.error(error);
    }
  };

  const updateTask = async (updatedTask: Task) => {
    try {
      await updateTaskInDb(updatedTask);
      setTasks(tasks.map(task => 
        task.id === updatedTask.id ? updatedTask : task
      ));
      toast.success('Task updated successfully');
    } catch (error) {
      toast.error('Failed to update task');
      console.error(error);
    }
  };
  

  const deleteTask = async (taskId: string) => {
    try {
      await deleteTaskFromDb(taskId);
      setTasks(tasks.filter(task => task.id !== taskId));
      toast.success('Task deleted successfully');
    } catch (error) {
      toast.error('Failed to delete task');
      console.error(error);
    }
  };

  

  return {
    tasks,
    loading,
    addTask,
    updateTask,
    deleteTask,
  };
}
