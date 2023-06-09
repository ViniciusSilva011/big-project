import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer
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
  currentTask: {},
  error: ''
}

const TasksContext = createContext()

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true }

    case 'tasks/loaded':
      return { ...state, isLoading: false, tasks: action.payload }

    // TODO: provisorio ate usar callback
    case 'tasks/deleted':
      return {
        ...state,
        isLoading: false,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      }

    case 'rejected':
      return {
        ...state,
        isLoading: false,
        error: action.payload!
      }

    default:
      throw new Error('Unknown action type')
  }
}

function TasksProvider({ children }: { children: React.ReactNode }) {
  const [{ tasks, isLoading, currentTask, error }, dispatch] = useReducer(
    reducer,
    initialState
  )

  useEffect(() => {
    async function fetchTasks() {
      dispatch({ type: 'loading' })

      try {
        const response = await fetch(`/api/tasks`)
        const { tasks } = await response.json()
        dispatch({ type: 'tasks/loaded', payload: tasks })
      } catch {
        dispatch({
          type: 'rejected',
          payload: 'There was an error loading tasks'
        })
      }
    }
    fetchTasks()
  }, [])

  async function deleteTask(id: string) {
    dispatch({ type: 'loading' })

    try {
      //TODO: when api is ok
      // await fetch(`/api/tasks/${id}`, {
      //   method: 'DELETE'
      // })

      dispatch({ type: 'tasks/deleted', payload: id })
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error deleting the city...'
      })
    }
  }

  const value = useMemo(() => {
    return {
      tasks,
      isLoading,
      currentTask,
      error,
      deleteTask
    }
  }, [tasks, isLoading, currentTask, error])

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
}

function useTasks() {
  const context = useContext(TasksContext)
  if (context === undefined)
    throw new Error('TasksContext was used outside ok Tasks Provider')
  return context
}

export { TasksProvider, useTasks }
