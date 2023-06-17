import { TasksProvider } from '@/app/contexts/TasksContext';
import Tasks from './Tasks';
import '../globals.css'

const TaskPage = () => {
  return (
    <>
      <TasksProvider>
        <main className="min-h-screen mt-8">
          <Tasks></Tasks>
        </main>
      </TasksProvider >
    </>
  );
};

export default TaskPage;
