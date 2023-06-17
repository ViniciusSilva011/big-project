import { createContext, useContext, useEffect, useReducer } from 'react'

const initialState = {
  tasks: [],
  isLoading: false,
  currentTask: {},
  error: ''
}

const TasksContext = createContext()

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true }

    case 'tasks/loaded':
      return { ...state, isLoading: false, tasks: action.payload }

    case 'rejected':
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }

    default:
      throw new Error('Unknown action type')
  }
}

function TasksProvider({ children }: any) {
  const [{ tasks, isLoading, currentTask, error }, dispatch] = useReducer(
    reducer,
    initialState
  )

  useEffect(() => {
    async function fetchTasks() {
      dispatch({ type: 'loading' })

      try {
        const response = await fetch(`/api/tasks`)
        const tasks = await response.json()
        dispatch({ type: 'tasks/loaded', payload: tasks })
      } catch {
        console.log()
        dispatch({
          type: 'rejected',
          payload: 'There was an error loading tasks'
        })
      }
    }
    fetchTasks()
  }, [])

  return (
    <TasksContext.Provider value={{ tasks, isLoading, currentTask, error }}>
      {children}
    </TasksContext.Provider>
  )
}

function useTasks() {
  const context = useContext(TasksContext)
  if (context === undefined)
    throw new Error('TasksContext was used outside ok TasksProvider')

  return context
}

export { TasksProvider, useTasks }
