import {
  AddItem_Transition_Props,
  UseItem_Transition_Props,
} from "../../types/layout/AddOrUseItem";
import { Dialog, Transition } from "@headlessui/react";
import { Dispatch, Fragment, SetStateAction } from "react";

import { type_todo_details } from "../../constants/Types";

interface TaskDetailsModal_Props {
  // stateReload: VoidFunction;
  // todo_id: type_todo_id;
  todo_details: type_todo_details;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const TaskDetailsModal = ({
  // stateReload,
  // todo_id,
  isOpen,
  setIsOpen,
  todo_details,
}: TaskDetailsModal_Props): JSX.Element => {
  // ! Need the if (isOpen) to make sure the function doesn't fire on component mount and dismount
  // if (isOpen) console.log(todo_details);

  return (
    <div>
      <div className="flex items-center justify-center">
        <button
          type="button"
          aria-label="Add details!"
          title="Add details!"
          onClick={() => setIsOpen(true)}
          // className="inline-flex"
          className="
            hidden
            w-full justify-center rounded-md
            bg-black bg-opacity-30
            px-3.5
            py-3.5
            text-sm font-medium filter backdrop-blur-3xl
            hover:bg-opacity-40 focus:outline-none focus-visible:ring-2
            focus-visible:ring-white focus-visible:ring-opacity-75
          "
        >
          {/* <PencilAltIcon className="w-5 h-5 text-theme-blueGray-50" /> */}
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
                <Dialog.Title
                  as="h3"
                  className="text-2xl font-medium leading-6 text-theme-blueGray-300 selection:bg-theme-primary-500/60"
                >
                  Add details
                </Dialog.Title>
                <p>{todo_details}</p>
                <div className="mt-4 flex justify-center space-x-6 text-theme-blueGray-300 selection:bg-theme-primary-500/60">
                  <button
                    type="button"
                    aria-label="Close add details popup"
                    className="inline-flex justify-center rounded-md border border-transparent bg-theme-primary-500/60 px-4 py-2 text-sm font-medium text-theme-blueGray-50 hover:bg-theme-primary-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    Cancel
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

export default TaskDetailsModal;
