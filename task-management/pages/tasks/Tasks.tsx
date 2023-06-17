import { TasksProvider, useTasks } from "@/app/contexts/TasksContext";

export default function Tasks() {
    let state = useTasks();
    console.log('state: ', state);
    return (
        <>
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Task List</h1>
                <ul className="bg-white divide-y divide-gray-300">
                    {state.tasks.map(task => {
                        return <>
                            <li key={task.id} className="flex items-center p-4">
                                <input type="checkbox" className="mr-2" />
                                <span className="flex-grow text-black">{task.name}</span>
                                <button className="text-red-500 hover:text-red-600 focus:outline-none focus:ring focus:border-blue-300">Delete</button>
                            </li>
                        </>
                    })}
                </ul>
            </div>
        </>
    )
}