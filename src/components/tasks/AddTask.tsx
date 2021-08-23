import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import {
  Useful_Todo,
  page_title,
  todo_description,
  todo_highlight,
  user_id
} from "../../constants/Types";

import { PlusCircleIcon } from "@heroicons/react/outline";
import { fetch_createTodo } from "../../utils/fetchHelpers";

export const AddTask = ({
  page,
  user,
  stateReload,
  count,
  highlight
}: {
  page: page_title;
  user: user_id;
  count: number;
  stateReload: VoidFunction;
  highlight: Useful_Todo;
}): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [task, setTask] = useState<todo_description>("");
  const [should_highlight, setShouldHighlight] =
    useState<todo_highlight>(false);

  const taskCreator = async () => {
    await fetch_createTodo({
      page_id: page,
      todo_description: task,
      user_id: user,
      todo_highlight: should_highlight,
      task: "create"
    });
    setTask("");
    setShouldHighlight(false);
    stateReload();
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
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden align-middle transition-all transform bg-theme-blueGray-800 shadow-lg border-theme-primary-500 border-2 rounded-lg space-y-5 justify-center items-center flex-col">
                {count <= 10 ? (
                  <>
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
                          if (event.key === "Enter" && task !== "") {
                            taskCreator();
                          } else if (event.key === "Escape") {
                            setIsOpen(false);
                          }
                        }}
                        onChange={({ target }) => setTask(target.value)}
                        value={task}
                      />
                    </div>

                    {!highlight && (
                      <span className="flex items-center justify-center space-x-2">
                        <label
                          htmlFor="should_highlight"
                          className="text-theme-blueGray-400"
                        >
                          {`Make it a Highlight? `}
                        </label>

                        <input
                          type="checkbox"
                          id="should_highlight"
                          defaultChecked={should_highlight}
                          onClick={() => setShouldHighlight(!should_highlight)}
                        />
                      </span>
                    )}

                    <div className="mt-4 flex justify-center space-x-6">
                      <button
                        type="button"
                        aria-label="Close add tasks popup"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-theme-fuchsia-200 bg-theme-primary-500/60 border border-transparent rounded-md hover:bg-theme-primary-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        onClick={() => {
                          setIsOpen(false);
                        }}
                      >
                        Cancel!
                      </button>
                      <button
                        type="button"
                        aria-label="Close add tasks popup"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-theme-fuchsia-200 bg-theme-primary-500/60 border border-transparent rounded-md hover:bg-theme-primary-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        onClick={() => {
                          taskCreator();
                        }}
                      >
                        Submit!
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <Dialog.Title
                      as="h3"
                      className="text-2xl font-medium leading-6 text-white"
                    >
                      {`Don't overload yourself! You already have 10 tasks`}
                    </Dialog.Title>

                    <div className="mt-4">
                      <button
                        type="button"
                        aria-label="Close add tasks popup"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-theme-fuchsia-200 bg-theme-primary-500/60 border border-transparent rounded-md hover:bg-theme-primary-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        onClick={() => {
                          setIsOpen(false);
                        }}
                      >
                        Cancel!
                      </button>
                    </div>
                  </>
                )}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};
