export type Priority = 'low' | 'medium' | 'high';
export type Status = 'will-do' | 'doing' | 'done';

export interface Task {
  id: string;
  user_id?: string;
  title: string;
  description: string;
  assigned_to?: string;
  dueDate: string;
  priority: Priority;
  status: Status;
  createdAt: string;
}