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
  error: string
}

interface Action {
  type: 'loading' | 'tasks/loaded' | 'tasks/deleted' | 'tasks/created' | 'rejected',
  payload?: Task[] | number | string
}

const initialState = {
  tasks: [] as Task[],
  isLoading: false,
  error: '',
  deleteTask: (a: any) => { },
  createTask: (a: any) => { },
  fetchTasks: (a: any) => { }
}

const TasksContext = createContext(initialState);

function TasksProvider({ children }: { children: React.ReactNode }) {
  const [{ tasks, isLoading, error }, dispatch] = useReducer(reducer, initialState)

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
  useEffect(() => {
    fetchTasks()
  }, [])

  async function deleteTask(id: string) {
    dispatch({ type: 'loading' })

    try {

      await fetch(`/api/tasks/${id}`, {
        method: 'DELETE'
      })

      dispatch({ type: 'tasks/deleted', payload: id })
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error deleting the city...'
      })
    }

  }

  async function createTask(newTask: Task) {
    dispatch({ type: "loading" });

    try {
      const res = await fetch(`api/tasks`, {
        method: "POST",
        body: JSON.stringify(newTask),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      dispatch({ type: "tasks/created", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error creating the task...",
      });
    }
  }


  function reducer(state: State, action: Action) {
    switch (action.type) {
      case 'loading':
        return { ...state, isLoading: true }

      case 'tasks/loaded':
        return { ...state, isLoading: false, tasks: action.payload as Task[] }

      // TODO: provisorio ate usar callback
      case 'tasks/deleted':
        return {
          ...state,
          isLoading: false,
          tasks: state.tasks.filter(task => task.id !== action.payload as number)
        }

      case "tasks/created":
        return {
          ...state,
          isLoading: false,
          cities: [...state.tasks, action.payload],
          currentCity: action.payload,
        };


      case 'rejected':
        return {
          ...state,
          isLoading: false,
          error: action.payload as string
        }

      default:
        throw new Error('Unknown action type')
    }
  }

  const value = useMemo(() => {
    return {
      tasks,
      isLoading,
      error,
      deleteTask,
      createTask,
      fetchTasks
    }
  }, [tasks, isLoading, error])

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
}

type Context = {
  tasks: Task[],
  isLoading: boolean,
  error: string,
  deleteTask: (id: string) => Promise<void>,
  createTask: (task: Task) => Promise<void>,
  fetchTasks: () => Promise<void>,
}

function useTasks() {
  const context = useContext(TasksContext) as unknown as Context
  if (context === undefined)
    throw new Error('TasksContext was used outside ok Tasks Provider')
  return context
}

export { TasksProvider, useTasks }
