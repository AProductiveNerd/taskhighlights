import {
  AddItem_Transition_Props,
  UseItem_Transition_Props,
} from "../../types/layout/AddOrUseItem";
import { Dialog, Transition } from "@headlessui/react";
import { Dispatch, Fragment, SetStateAction, useState } from "react";
import {
  type_Todo_Body,
  type_page_id,
  type_page_title,
  type_todo_description,
  type_todo_highlight,
  type_user_id,
} from "../../constants/Types";

import { PlusCircleIcon } from "@heroicons/react/outline";
import { Todo } from "@prisma/client";
import { fetch_createTodo } from "../../utils/fetchHelpers";
import { server_createTodo } from "../../utils/serverHelpers";

interface AddTask_Props {
  page: type_page_title;
  page_id: type_page_id;
  count: number;
  user_id: type_user_id;
  stateReload: VoidFunction;
  highlight: Todo;
  setShouldUseServer: Dispatch<SetStateAction<boolean>>;
}

export const AddTask = ({
  page,
  stateReload,
  page_id,
  count,
  user_id,
  setShouldUseServer,
  highlight,
}: AddTask_Props): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [task, setTask] = useState<type_todo_description>("");
  const [should_highlight, setShouldHighlight] =
    useState<type_todo_highlight>(false);

  const server_handle = async ({
    todo_description,
    todo_highlight,
    todo_id,
  }: type_Todo_Body) => {
    console.log("SERVER HANDLE");
    await server_createTodo({
      page_id,
      todo_description,
      todo_highlight,
      user_id,
      todo_id,
      task: "create",
    });
  };

  const taskCreator = async () => {
    if (task !== "") {
      const temp_highlight = should_highlight;
      const temp_task = task;
      const local_todo_id = await fetch_createTodo({
        _id: page,
        body: {
          todo_description: task,
          todo_highlight: should_highlight,
        },
      });
      console.log({ local_todo_id });
      setShouldHighlight(false);
      setTask("");
      setShouldUseServer(false);
      stateReload();
      await server_handle({
        todo_description: temp_task,
        todo_highlight: temp_highlight,
        todo_id: local_todo_id,
      });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center">
        <button
          type="button"
          aria-label="Add a task!"
          title="Add a task!"
          onClick={() => setIsOpen(true)}
          className="
            inline-flex w-full
            justify-center rounded-md bg-black
            bg-opacity-30 px-3.5
            py-3.5
            text-sm font-medium filter backdrop-blur-3xl
            hover:bg-opacity-40 focus:outline-none focus-visible:ring-2
            focus-visible:ring-white focus-visible:ring-opacity-75
          "
        >
          <PlusCircleIcon className="h-5 w-5 text-theme-blueGray-50" />
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
                  my-8 inline-block
                  w-full max-w-md transform
                  flex-col items-center
                  justify-center space-y-5
                  overflow-hidden rounded-lg
                  border-2
                  border-theme-primary-500 bg-theme-blueGray-800 bg-opacity-40
                  p-6 align-middle shadow-lg
                  filter backdrop-blur-3xl transition-all
                "
              >
                {count <= 10 ? (
                  <>
                    <Dialog.Title
                      as="h3"
                      className="text-2xl font-medium leading-6 text-theme-blueGray-300 selection:bg-theme-primary-500/60"
                    >
                      Add a task
                    </Dialog.Title>
                    <div className="mt-2">
                      <input
                        className="w-full p-2 text-xl selection:bg-theme-primary-500/60"
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
                      <span className="flex items-center justify-center space-x-2 text-theme-blueGray-300">
                        <label htmlFor="should_highlight">
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

                    <div className="mt-4 flex justify-center space-x-6 text-theme-blueGray-300 selection:bg-theme-primary-500/60">
                      <button
                        type="button"
                        aria-label="Close add tasks popup"
                        className="inline-flex justify-center rounded-md border border-transparent bg-theme-primary-500/60 px-4 py-2 text-sm font-medium text-theme-blueGray-50 hover:bg-theme-primary-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => {
                          setIsOpen(false);
                        }}
                      >
                        Cancel
                      </button>

                      <button
                        type="button"
                        aria-label="Close add tasks popup"
                        className="inline-flex justify-center rounded-md border border-transparent bg-theme-primary-500/60 px-4 py-2 text-sm font-medium hover:bg-theme-primary-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => {
                          taskCreator();
                        }}
                      >
                        Submit
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <Dialog.Title
                      as="h3"
                      className="text-2xl font-medium leading-6 text-theme-blueGray-300"
                    >
                      {`Don't overload yourself! You already have 10 tasks`}
                    </Dialog.Title>

                    <div className="mt-4">
                      <button
                        type="button"
                        aria-label="Close add tasks popup"
                        className="inline-flex justify-center rounded-md border border-transparent bg-theme-primary-500/60 px-4 py-2 text-sm font-medium hover:bg-theme-primary-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => {
                          setIsOpen(false);
                        }}
                      >
                        Cancel
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

export default AddTask;
