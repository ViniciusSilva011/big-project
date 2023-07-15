import { signIn, signOut, useSession } from 'next-auth/react'

import './globals.css'
import Header from '@/app/components/menu/Header'
import Loading from './Loading'
import NavBar from '@/app/components/menu/NavBar'
import CreateIssueModal from '@/app/components/CreateIssueModal'

import Login from './auth/Login'
import { useTasks } from '@/app/contexts/TasksContext'
import { useState } from 'react'

const IndexPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { status, data: session } = useSession()
  const { tasks, isLoading } = useTasks()

  if (status === 'loading') {
    return <Loading />
  }

  if (session) {
    const userLoggedName = session?.user?.name ?? ''
    return (
      <div className="m-3">
        <NavBar user={userLoggedName} />
        <main className="min-h-screen mt-8">
          <header className="bg-slate-800 shadow">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-gray-100 ">
                Dashboard
              </h1>
            </div>
          </header>
          <main className="mt-4">
            <h1 className="p-3">Task title</h1>
            <div className="flex gap-2">
              <div className="flex flex-col w-8/12 border border-slate-800">
                {/* NAV LINK dividir */}
                <nav className="flex gap-2 p-2">
                  <button className="px-4 py-2 font-semibold text-sm bg-slate-800 text-gray-100 rounded-lg shadow-sm">
                    Attach
                  </button>
                  <button className="px-4 py-2 font-semibold text-sm bg-slate-800 text-gray-100 rounded-lg shadow-sm">
                    Create subtask
                  </button>
                  <button className="px-4 py-2 font-semibold text-sm bg-slate-800 text-gray-100 rounded-lg shadow-sm">
                    Link issue
                  </button>
                  <button className="px-4 py-2 font-semibold text-sm bg-slate-800 text-gray-100 rounded-lg shadow-sm">
                    ...
                  </button>
                </nav>

                {/* continuo */}

                <div className="flex flex-col gap-2 grow p-2 bg-slate-900 text-sm">
                  <div className="teste">Description</div>
                  <textarea
                    name=""
                    id=""
                    cols={10}
                    rows={4}
                    className="bg-gray-900 border-2 border-slate-800 p-2 text-neutral-300"
                    placeholder="write something oh burro..."
                  ></textarea>
                  <CreateIssueModal isOpen={isOpen} closeModal={() => setIsOpen(false)}></CreateIssueModal>
                  <button onClick={() => setIsOpen(true)} className="px-4 py-2 font-semibold text-sm bg-slate-800 text-gray-100 rounded-lg shadow-sm">
                    Create
                  </button>
                  {/* provisory tasks */}
                  {isLoading && <Loading />}
                  {tasks &&
                    tasks.map((task: any) => (
                      <div className="" key={task.id}>
                        <title>{task.name}</title>
                        <p>{task.description}</p>
                      </div>
                    ))}
                </div>

                {/* continuo */}

                <div className="flex flex-col gap-2 grow p-2 bg-slate-900 text-sm">
                  <div className="teste">Activity</div>
                </div>
              </div>
              <div className="flex-auto w-4/12 border border-slate-800 ">
                <div className="cta-task flex  space-x-1 p-2">
                  <button
                    type="button"
                    className="px-4 py-2 font-semibold text-sm bg-slate-700 text-white rounded-lg shadow-sm capitalize"
                  >
                    TODO
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 font-semibold text-sm text-white rounded-lg shadow-sm capitalize"
                  >
                    ACTIONS
                  </button>
                </div>
                <div className="flex flex-col gap-2 grow p-2 bg-slate-900 text-sm">
                  <div className="flex grow items-center">
                    <div className="w-5/12 text-sm">Assignee</div>
                    <span className="flex items-center justify-center gap-2">
                      <img
                        src="http://localhost:3000/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1472099645785-5658abf4ff4e%3Fixlib%3Drb-1.2.1%26ixid%3DeyJhcHBfaWQiOjEyMDd9%26auto%3Dformat%26fit%3Dfacearea%26facepad%3D2%26w%3D256%26h%3D256%26q%3D80&w=96&q=75"
                        alt=""
                        className="h-6 w-6 rounded-full"
                      />
                      Marco Rodrigues
                    </span>
                  </div>
                  <div className="flex grow items-center">
                    <div className="w-5/12  text-sm">Reporter</div>
                    <span className="flex items-center justify-center gap-2">
                      <img
                        src="http://localhost:3000/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1472099645785-5658abf4ff4e%3Fixlib%3Drb-1.2.1%26ixid%3DeyJhcHBfaWQiOjEyMDd9%26auto%3Dformat%26fit%3Dfacearea%26facepad%3D2%26w%3D256%26h%3D256%26q%3D80&w=96&q=75"
                        alt=""
                        className="h-6 w-6 rounded-full"
                      />
                      Vinicius Silva
                    </span>
                  </div>
                  <div className="flex grow items-center">
                    <div className="w-5/12  text-sm">Labels</div>
                    <span className="flex items-center justify-center gap-2 text-slate-700">
                      None
                    </span>
                  </div>
                  <div className="flex grow items-center">
                    <div className="w-5/12  text-sm">Priority</div>
                    <span className="flex items-center justify-center gap-2 text-slate-700">
                      Medium
                    </span>
                  </div>

                  <div className="flex grow items-center">
                    <div className="w-5/12  text-sm">Original estimate</div>
                    <span className="flex items-center justify-center gap-2 text-slate-700 round bg-slate-800 rounded-lg p-1 text-sm">
                      0 m
                    </span>
                  </div>

                  <div className="flex grow items-center">
                    <div className="w-5/12  text-sm">Time tracking</div>
                    <span className="flex items-center justify-center gap-2 text-slate-700">
                      No time logged
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </main>
      </div>
    )
  } else {
    return (
      <div>
        <button onClick={() => signIn()}>Sign in</button>
        <Login />
      </div>
    )
  }
}
export default IndexPage
