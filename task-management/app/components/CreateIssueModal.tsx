import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ArchiveBoxIcon } from '@heroicons/react/24/outline'
import Loading from './ui/Loading';

export default function CreateIssueModal({ closeModal, isOpen }: { closeModal: () => void, isOpen: boolean }) {
    const cancelButtonRef = useRef(null)
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    async function submit() {
        setIsLoading(true);
        const response = await fetch('/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                description: description
            })
        });
        setIsLoading(false);
        console.log('response.json()', response.json());
        closeModal();
    }

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog className="relative z-10" initialFocus={cancelButtonRef} onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto ">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                {isLoading && <Loading />}
                                <div className="bg-gray-800 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-black  -100 sm:mx-0 sm:h-10 sm:w-10">
                                            <ArchiveBoxIcon className="h-6 w-6 text-white-900" aria-hidden="true" />
                                        </div>
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                            <Dialog.Title className="text-base font-semibold leading-6 text-white-900 mt-2">
                                                New Task
                                            </Dialog.Title>


                                            <div className="">
                                                <form className='flex flex-col gap-1'>

                                                    <label htmlFor='message' className='mt-4'>Name</label>


                                                    <input autoComplete='off' type="text" name='message' placeholder='Name' id='message' className="bg-slate-700 invalid:border-red-500 
                                                    placeholder-shown:border-gray-700 placeholder:text-slate-500 placeholder:text-sm text-slate-400 py-2 px-3 focus:outline-none focus:border-gren-600 
                                                    ring ring-slate-600 rounded focus:ring-slate-500 " onChange={(e) => setName(e.target.value)} />
                                                    <label htmlFor='message' className='mt-4'>Description</label>


                                                    <input autoComplete='off' type="text" name='message' placeholder='Description' id='message' className="bg-slate-700 invalid:border-red-500 
placeholder-shown:border-gray-700 placeholder:text-slate-500 placeholder:text-sm text-slate-400 py-2 px-3 focus:outline-none focus:border-gren-600 
ring ring-slate-600 rounded focus:ring-slate-500 "
                                                        onChange={(e) => setDescription(e.target.value)} />
                                                </form>
                                            </div>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    In the future the description will be able to hold more features.
                                                </p>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-800 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                                        onClick={() => submit()}
                                    >
                                        Create
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        onClick={() => closeModal()}
                                        ref={cancelButtonRef}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root >
    )
}