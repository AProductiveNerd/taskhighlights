import {
  AddItem_Transition_Props,
  UseItem_Transition_Props,
} from "../../types/layout/AddOrUseItem";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import {
  type_page_title,
  type_todo_description,
  type_user_id,
} from "../../constants/Types";

import { PlusCircleIcon } from "@heroicons/react/outline";

interface AddPageTask_Props {
  page: type_page_title;
  user: type_user_id;
  stateReload: VoidFunction;
}

export const AddPageTask = ({
  // page,
  // user,
  stateReload,
}: AddPageTask_Props): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [task, setTask] = useState<type_todo_description>("");

  const taskCreator = () => {
    if (task !== "") {
      // await fetch_createTodo({
      //   page_id: page,
      //   todo_description: task,
      //   user_id: user,
      //   todo_highlight: false,
      //   task: "create",
      // });
      setTask("");
      stateReload();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center">
        <button
          type="button"
          aria-label="Add a task!"
          onClick={() => setIsOpen(true)}
          className="
            inline-flex justify-center
            w-full px-3.5 py-3.5
            text-sm font-medium
            rounded-md
            bg-black bg-opacity-30 filter backdrop-blur-3xl
            hover:bg-opacity-40 focus:outline-none focus-visible:ring-2
            focus-visible:ring-white focus-visible:ring-opacity-75
          "
        >
          <PlusCircleIcon className="w-5 h-5 text-theme-blueGray-50" />
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => setIsOpen(false)}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child {...AddItem_Transition_Props}>
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child {...UseItem_Transition_Props}>
              <div
                className="
                  inline-block w-full
                  max-w-md p-6 my-8
                  overflow-hidden align-middle
                  transition-all transform
                  bg-theme-blueGray-800 shadow-lg
                  border-theme-primary-500
                  border-2 rounded-lg space-y-5
                  justify-center items-center flex-col
                  filter backdrop-blur-3xl bg-opacity-40
                "
              >
                <>
                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-medium leading-6 text-theme-blueGray-300 selection:bg-theme-primary-500/60"
                  >
                    Add a task
                  </Dialog.Title>
                  <div className="mt-2">
                    <input
                      className="text-xl w-full p-2 selection:bg-theme-primary-500/60"
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

                  <div className="mt-4 flex justify-center space-x-6 text-theme-blueGray-300 selection:bg-theme-primary-500/60">
                    <button
                      type="button"
                      aria-label="Close add tasks popup"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium bg-theme-primary-500/60 border border-transparent rounded-md hover:bg-theme-primary-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 text-theme-blueGray-50"
                      onClick={() => {
                        setIsOpen(false);
                      }}
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      aria-label="Close add tasks popup"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium bg-theme-primary-500/60 border border-transparent rounded-md hover:bg-theme-primary-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      onClick={() => {
                        taskCreator();
                      }}
                    >
                      Submit
                    </button>
                  </div>
                </>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default AddPageTask;
