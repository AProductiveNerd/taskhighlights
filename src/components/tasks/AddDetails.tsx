import { Dialog, Transition } from "@headlessui/react";
import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { todo_details, todo_id } from "../../constants/Types";

import { PencilAltIcon } from "@heroicons/react/solid";
import { fetch_updateTodoDetails } from "../../utils/fetchHelpers";

interface AddDetails_Props {
  stateReload: VoidFunction;
  todo_id: todo_id;
  // isOpen: boolean;
  // setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const AddDetails = ({
  stateReload,
  todo_id
}: // isOpen,
// setIsOpen
AddDetails_Props): JSX.Element => {
  const [details, setDetails] = useState<todo_details>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const detailsAdder = async () => {
    if (details !== "") {
      await fetch_updateTodoDetails({
        todo_id,
        todo_details: details
      });
      setDetails("");
      stateReload();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center">
        <button
          type="button"
          aria-label="Add details!"
          title="Add details!"
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
          <PencilAltIcon className="w-5 h-5 text-theme-blueGray-50" />
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
                <Dialog.Title
                  as="h3"
                  className="text-2xl font-medium leading-6 text-theme-blueGray-300 selection:bg-theme-primary-500/60"
                >
                  Add details
                </Dialog.Title>
                <div className="mt-2">
                  <input
                    className="text-xl w-full p-2 selection:bg-theme-primary-500/60"
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && details !== "") {
                        detailsAdder();
                      } else if (event.key === "Escape") {
                        setIsOpen(false);
                      }
                    }}
                    onChange={({ target }) => setDetails(target.value)}
                    value={details}
                  />
                </div>

                <div className="mt-4 flex justify-center space-x-6 text-theme-blueGray-300 selection:bg-theme-primary-500/60">
                  <button
                    type="button"
                    aria-label="Close add details popup"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium bg-theme-primary-500/60 border border-transparent rounded-md hover:bg-theme-primary-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 text-theme-blueGray-50"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    aria-label="Close add details popup"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium bg-theme-primary-500/60 border border-transparent rounded-md hover:bg-theme-primary-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={() => {
                      detailsAdder();
                    }}
                  >
                    Submit
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

export default AddDetails;
