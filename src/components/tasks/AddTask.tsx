import { Dialog, Transition } from "@headlessui/react";
import { PlusCircleIcon } from "@heroicons/react/outline";
import { Fragment, useState } from "react";
import { createTask } from "../../utils/fetchHelpers";

export const AddTask = ({
  page,
  user,
  addedCounter,
  setAddedCounter
}: {
  page: string;
  user: string;
  addedCounter: number;
  setAddedCounter: React.Dispatch<React.SetStateAction<number>>;
}): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [task, setTask] = useState("");

  const taskCreator = async () => {
    await createTask({
      page_id: page,
      todo_description: task,
      user_id: user
    });
    setAddedCounter(addedCounter + 1);
    setTask("");
  };

  return (
    <div>
      <div className="flex items-center justify-center">
        <button
          type="button"
          aria-label="Add a task!"
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          <PlusCircleIcon className="w-6 h-6" />
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => setIsOpen(false)}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden align-middle transition-all transform bg-theme-blueGray-800 shadow-xl rounded-2xl space-y-5">
                <Dialog.Title
                  as="h3"
                  className="text-2xl font-medium leading-6 text-white"
                >
                  Add a task
                </Dialog.Title>
                <div className="mt-2">
                  <input
                    className="text-xl text-gray-500 w-full p-2"
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        taskCreator();
                      } else if (event.key === "Escape") {
                        setIsOpen(false);
                      }
                    }}
                    onChange={({ target }) => setTask(target.value)}
                    value={task}
                  />
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    aria-label="Close add tasks popup"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-theme-fuchsia-200 bg-theme-primary-500/60 border border-transparent rounded-md hover:bg-theme-primary-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    Done!
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};
