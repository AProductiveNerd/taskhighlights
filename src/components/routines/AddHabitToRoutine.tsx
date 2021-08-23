import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { habit_description, template_id } from "../../constants/Types";

import { PlusCircleIcon } from "@heroicons/react/outline";
import { fetch_addHabitToTemplate } from "../../utils/fetchHelpers";

export const AddHabitToRoutine = ({
  stateReload,
  template_id
}: {
  template_id: template_id;
  stateReload: VoidFunction;
}): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [habit_description, set_habit_description] =
    useState<habit_description>("");

  const taskCreator = async () => {
    await fetch_addHabitToTemplate({ habit_description, template_id });

    set_habit_description("");
    stateReload();
  };

  return (
    <div>
      <div className="flex items-center justify-center">
        <button
          type="button"
          aria-label="Add a habit to the routine!"
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 text-sm font-medium text-theme-blueGray-300 bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
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
                <Dialog.Title
                  as="h3"
                  className="text-2xl font-medium leading-6 text-white"
                >
                  Add habit to routine
                </Dialog.Title>
                <div className="mt-2">
                  <input
                    className="text-xl text-gray-500 w-full p-2"
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && habit_description !== "") {
                        taskCreator();
                      } else if (event.key === "Escape") {
                        setIsOpen(false);
                      }
                    }}
                    onChange={({ target }) =>
                      set_habit_description(target.value)
                    }
                    value={habit_description}
                  />
                </div>

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
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};
