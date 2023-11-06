import { useTasks } from '@/app/contexts/TasksContext'
import Loading from '../Loading'
import Link from 'next/link'
import Show from '@/app/components/users/Show'
import { formatDate } from '@/utils/helpers'

import RandomTasks from '@/app/components/tasks/RandomTasks'
import { useEffect, useState } from 'react'

export default function Tasks() {
  const { tasks, isLoading, deleteTask, fetchTasks } = useTasks()

  return (
    <>

      <div className="container mx-auto p-4">
        <RandomTasks></RandomTasks>
        <h1 className="text-2xl font-bold mb-4">Task List</h1>
        <ul className="bg-slate-800 divide-y divide-gray-900">
          {!tasks && isLoading && <Loading />}
          {tasks &&
            tasks.map((task: any) => {
              return isLoading ? (
                <Loading />
              ) : (
                <li key={task.id} className="flex gap-10 items-center p-4 hover:bg-slate-700 text-slate-400">
                  {/* <input type="checkbox" className="mr-2" /> */}
                  <span className="flex-grow ">
                    <Link href={`/tasks/${task.id}`}>
                      {task.name}
                    </Link>
                  </span>




                  {/* TODO: do assignees */}
                  <Show name={task?.reporter?.name || ''} avatar={task?.reporter?.avatar || ''} />
                  <span>{formatDate(task.createdAt)}</span>
                  <span>{formatDate(task.updatedAt)}</span>
                  <span>{task.priority.name}</span>
                  <button
                    className="text-red-500 hover:text-red-600 focus:outline-none focus:ring focus:border-blue-300"
                    onClick={e => {
                      e.preventDefault()
                      deleteTask(task.id)
                    }}
                  >
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
