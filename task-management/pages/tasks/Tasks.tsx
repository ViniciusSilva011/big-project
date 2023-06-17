import { useTasks } from '@/app/contexts/TasksContext'
import Loading from '../Loading'

export default function Tasks() {
  const { tasks, isLoading } = useTasks()
  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Task List</h1>
        <ul className="bg-slate-800 divide-y divide-gray-900">
          {isLoading && <Loading />}
          {tasks &&
            tasks.map((task: any) => {
              return (
                <li key={task.id} className="flex items-center p-4">
                  <input type="checkbox" className="mr-2" />
                  <span className="flex-grow text-white">
                    {task.id} - {task.name}
                  </span>
                  <button className="text-red-500 hover:text-red-600 focus:outline-none focus:ring focus:border-blue-300">
                    Delete
                  </button>
                </li>
              )
            })}
        </ul>
      </div>
    </>
  )
}
