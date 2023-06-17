<<<<<<< HEAD
import { createContext, useContext, useEffect, useReducer } from 'react'
=======
import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState
} from 'react'
>>>>>>> refs/remotes/origin/main

interface Task {
  id: number
  name: string
  description: string
}

interface State {
  tasks: Task[]
  isLoading: boolean
  currentTask: Task | null
  error: string
}

interface Action {
  type: 'loading' | 'tasks/loaded' | 'rejected'
  tasks?: Task[]
  error?: string
}

const initialState = {
  tasks: [],
  isLoading: false,
  currentTask: null,
  error: ''
}

const TasksContext = createContext()

function taskReducer(state: State, action: Action) {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true }

    case 'tasks/loaded':
      return { ...state, isLoading: false, tasks: action.tasks! }

    case 'rejected':
      return {
        ...state,
        isLoading: false,
        error: action.error!
      }

    default:
      throw new Error('Unknown action type: ' + action.type)
  }
}

function TasksProvider({ children }: {
  children: React.ReactNode
}) {
  const [state, dispatch] = useReducer(
    taskReducer,
    initialState
  )

  useEffect(() => {
    async function fetchTasks() {
      dispatch({ type: 'loading' })
<<<<<<< HEAD

      try {
        const response = await fetch(`/api/tasks`)
        const tasks = await response.json()
        dispatch({ type: 'tasks/loaded', payload: tasks })
      } catch {
        console.log()
=======
      try {
        const response = await fetch(`/api/tasks`)
        const tasks = (await response.json()).tasks as Task[]
        dispatch({ type: 'tasks/loaded', tasks })

      } catch (e) {
        console.error('error: ', e)
>>>>>>> refs/remotes/origin/main
        dispatch({
          type: 'rejected',
          error: 'There was an error loading tasks'
        })
      }
    }
    fetchTasks()
  }, [])

  return (
    <TasksContext.Provider value={state}>
      {children}
    </TasksContext.Provider>
  )
}

function useTasks() {
  const context = useContext(TasksContext)
  if (context === undefined)
<<<<<<< HEAD
    throw new Error('TasksContext was used outside ok TasksProvider')

  return context
=======
    throw new Error('TasksContext was used outside ok Tasks Provider')
  return context;
>>>>>>> refs/remotes/origin/main
}

export { TasksProvider, useTasks, TasksContext }
