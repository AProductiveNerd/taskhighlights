import {
  AddItem_Transition_Props,
  UseItem_Transition_Props,
} from "../../types/layout/AddOrUseItem";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import {
  type_routine_id,
  type_template_id,
  type_template_title,
  type_user_id,
} from "../../constants/Types";

import Link from "next/link";
import { PlusCircleIcon } from "@heroicons/react/outline";
import { fetch_createManyHabit } from "../../utils/fetchHelpers";

export const UseTemplate = ({
  user_id,
  template_data,
  stateReload,
  routine_id,
}: {
  user_id: type_user_id;
  routine_id: type_routine_id;
  template_data: {
    template_title: type_template_title;
    template_id: type_template_id;
  }[];
  stateReload: VoidFunction;
}): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const cloneTemplate = async ({
    cloneTemplate_template_id,
    cloneTemplate_routine_id,
    cloneTemplate_user_id,
  }: {
    cloneTemplate_user_id: type_user_id;
    cloneTemplate_routine_id: type_routine_id;
    cloneTemplate_template_id: type_template_id;
  }) => {
    await fetch_createManyHabit({
      template_id: cloneTemplate_template_id,
      user_id: cloneTemplate_user_id,
      routine_id: cloneTemplate_routine_id,
    });

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
                text-theme-blueGray-300 inline-block w-full
                  max-w-md p-6 my-8 overflow-hidden align-middle
                  transition-all transform bg-theme-blueGray-800
                  backdrop-blur  shadow-lg border-theme-primary-500
                  border-2 rounded-lg
                  space-y-5 justify-center
                  items-center flex-col
                  text-sm
                "
              >
                {template_data ? (
                  template_data?.map((data) => (
                    <div
                      className="flex items-center justify-center"
                      key={data.template_id}
                    >
                      <button
                        type="button"
                        aria-label="Add a task!"
                        onClick={() =>
                          cloneTemplate({
                            cloneTemplate_routine_id: routine_id,
                            cloneTemplate_template_id: data.template_id,
                            cloneTemplate_user_id: user_id,
                          })
                        }
                        className="
                       leading-7 px-4 py-2 text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75
                        "
                      >
                        {data.template_title}
                      </button>
                    </div>
                  ))
                ) : (
                  <p>
                    {"You don't have any templates! Click "}
                    <Link href="/routines">
                      <a className="underline hover:text-theme-primary-500">
                        here
                      </a>
                    </Link>{" "}
                    to go the templates page
                  </p>
                )}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default UseTemplate;
