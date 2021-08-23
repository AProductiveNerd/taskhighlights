import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { habit_description, user_id } from "../../constants/Types";

import { PlusCircleIcon } from "@heroicons/react/outline";
import { fetch_createTemplate } from "../../utils/fetchHelpers";

export const CreateTemplate = ({
  stateReload,
  user_id
}: {
  user_id: user_id;
  stateReload: VoidFunction;
}): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [template_title, set_template_title] = useState<habit_description>("");

  const templateCreator = async () => {
    await fetch_createTemplate({
      template_habits: [],
      template_title,
      user_id
    });

    set_template_title("");
    stateReload();
  };

  return (
    <div>
      <div className="flex items-center justify-center">
        <button
          type="button"
          aria-label="Create a routine template!"
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
                <Dialog.Title
                  as="h3"
                  className="text-2xl font-medium leading-6 text-white"
                >
                  Create template
                </Dialog.Title>
                <div className="mt-2">
                  <input
                    className="text-xl text-gray-500 w-full p-2"
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && template_title !== "") {
                        templateCreator();
                      } else if (event.key === "Escape") {
                        setIsOpen(false);
                      }
                    }}
                    onChange={({ target }) => set_template_title(target.value)}
                    value={template_title}
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
                      templateCreator();
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
