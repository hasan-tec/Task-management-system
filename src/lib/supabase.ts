import { createClient } from '@supabase/supabase-js';
import { Task } from '../types';

const supabaseUrl = 'https://vptmjtrnpznuaxblbssr.supabase.co';
const supabaseKey ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZwdG1qdHJucHpudWF4Ymxic3NyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA5OTIxMDAsImV4cCI6MjA0NjU2ODEwMH0.yPUKFfAW3j6FP_iXaFHwWlKg0Jk-LKkvHkDGWI38fmM';


export const supabase = createClient(supabaseUrl, supabaseKey);

export async function fetchTasks(userId: string) {
  const { data, error } = await supabase
    .from('tasks')
    .select('*, user_id')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Task[];
}

export async function createTask(task: Task) {
  const { error } = await supabase
    .from('tasks')
    .insert([
      {
        title: task.title,
        description: task.description,
        assigned_to: task.assigned_to,
        due_date: task.dueDate,
        priority: task.priority,
        status: task.status,
        user_id: task.user_id,
      },
    ]);

  if (error) throw error;
}

export async function updateTaskInDb(task: Task) {
  const { error } = await supabase
    .from('tasks')
    .update({
      title: task.title,
      description: task.description,
      assigned_to: task.assigned_to,
      due_date: task.dueDate,
      priority: task.priority,
      status: task.status,
    })
    .eq('id', task.id);

  if (error) throw error;
}

export async function deleteTaskFromDb(taskId: string) {
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', taskId);

  if (error) throw error;
}

