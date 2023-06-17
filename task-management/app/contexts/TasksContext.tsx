import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState
} from 'react'

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
} as State

const TasksContext = createContext(initialState)

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
  const [taskState, dispatch] = useReducer(
    taskReducer,
    initialState
  )

  useEffect(() => {
    async function fetchTasks() {
      dispatch({ type: 'loading' })
      console.log('taskState.isLoading:', taskState.isLoading)
      try {
        const response = await fetch(`/api/tasks`)
        const tasks = (await response.json()).tasks as Task[]
        console.log('tasks:', tasks)
        console.log('taskState.isLoading:', taskState.isLoading)
        dispatch({ type: 'tasks/loaded', tasks })
        console.log('taskState.isLoading:', taskState.isLoading)

      } catch (e) {
        console.log('error: ', e)
        dispatch({
          type: 'rejected',
          error: 'There was an error loading tasks'
        })
      }
    }
    fetchTasks()
  }, [])

  return (
    <TasksContext.Provider value={taskState}>
      {children}
    </TasksContext.Provider>
  )
}

function useTasks() {
  const context = useContext(TasksContext)
  if (context === undefined)
    throw new Error('TasksContext was used outside ok Tasks Provider')
  return context;
}

export { TasksProvider, useTasks, TasksContext }
