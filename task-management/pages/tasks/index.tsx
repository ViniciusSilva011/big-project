import Tasks from './Tasks'
import '../globals.css'
import RootLayout from '../layout'

const TaskPage = () => {
  return (
    <RootLayout>
      <main className="min-h-screen mt-8">
        <Tasks></Tasks>
      </main>
    </RootLayout>
  )
}

export default TaskPage
