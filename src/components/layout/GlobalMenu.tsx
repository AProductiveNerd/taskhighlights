import { Dialog, Menu, Transition } from "@headlessui/react";
import { Dispatch, Fragment, SetStateAction } from "react";

interface GlobalMenu_Props {
  globalMenuIsOpen: boolean;
  setGlobalMenuIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const GlobalMenu = ({
  globalMenuIsOpen,
  setGlobalMenuIsOpen
}: GlobalMenu_Props) => {
  return (
    <>
      <Transition appear show={globalMenuIsOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => setGlobalMenuIsOpen(false)}
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
                  Payment successful
                </Dialog.Title>

                <div className="mt-2">
                  <Menu as="div" className="mt-4">
                    <Menu.Items
                      static
                      as="div"
                      className="
                        w-full mt-2
                        bg-black filter backdrop-blur-3xl bg-opacity-40
                        divide-gray-100 rounded-md shadow-lg ring-1
                        ring-black ring-opacity-5 focus:outline-none
                      "
                    >
                      <Menu.Item>
                        <p>WIP</p>
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default GlobalMenu;
