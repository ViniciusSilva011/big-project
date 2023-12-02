import { useState } from "react";
import CreateIssueModal from "../CreateIssueModal";
import { useTasks } from "@/app/contexts/TasksContext";

export default function InsertTaskButton() {
    const [isOpen, setIsOpen] = useState(false);
    const { fetchTasks } = useTasks()
    async function closeModal() {
        setIsOpen(false);
        await fetchTasks();
    }
    return (
        <>
            <CreateIssueModal isOpen={isOpen} closeModal={async () => await closeModal()}></CreateIssueModal>
            <button type="button" className="bg-gray-500 text-white rounded-md px-3 py-2 text-md font-medium"
                onClick={() => setIsOpen(true)}
            >
                Insert Task
            </button>
        </>
    );
}