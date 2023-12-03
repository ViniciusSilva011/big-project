import CreateIssueModal from "@/app/components/CreateIssueModal";
import { useTasks } from "@/app/contexts/TasksContext";
import { useRouter } from "next/router";
import { useState } from "react";
import Loading from "../Loading";
import Show from "@/app/components/users/Show";

const Task = ({
  params,

}: {
  params: {
    id: string;
  };
}) => {
  const router = useRouter();

  // Get the query parameter from the URL
  const { id } = router.query;

  const [isOpen, setIsOpen] = useState(false);
  const { tasks, isLoading } = useTasks();

  return (
    <div className="m-3">
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
                  <Show name={tasks[0]?.reporter?.name || ''} avatar={tasks[0]?.reporter?.avatar} />
                </div>
                <div className="flex grow items-center">
                  <div className="w-5/12  text-sm">Reporter</div>
                  <Show name={tasks[1]?.reporter?.name || ''} avatar={tasks[1]?.reporter?.avatar} />
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

  );
}

export default Task;