import React from 'react';
import { ClerkProvider, SignIn, SignedIn, SignedOut } from '@clerk/clerk-react';
import { Toaster } from 'react-hot-toast';
import TaskManager from './components/TaskManager';

const clerkPubKey = 'pk_test_Zm9uZC13aGlwcGV0LTUzLmNsZXJrLmFjY291bnRzLmRldiQ';


export async function fetchTasks(userId: string) {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Fetch tasks error:", error);
    throw error;
  }
  
  console.log("Fetched tasks:", data);
  return data as Task[];
}


function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <Toaster position="top-right" />
      <SignedIn>
        <TaskManager />
      </SignedIn>
      <SignedOut>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Task Manager</h1>
              <p className="text-gray-600">Sign in to manage your tasks efficiently</p>
            </div>
            <SignIn />
          </div>
        </div>
      </SignedOut>
    </ClerkProvider>
  );
}

export default App;