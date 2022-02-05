import {
  AddItem_Transition_Props,
  UseItem_Transition_Props,
} from "../../types/layout/AddOrUseItem";
import { Dialog, Menu, Switch, Transition } from "@headlessui/react";
import { Fragment, useContext } from "react";

import { GlobalMenu_Props } from "../../types/layout/GlobalMenu";
import UserContext from "../../contexts/UserContext";
import { fetch_changePageIsPublicByPublicLink } from "../../utils/fetchHelpers";

export const GlobalMenu = ({
  globalMenuIsOpen,
  setGlobalMenuIsOpen,
  page,
  page_is_public,
  stateReload,
}: GlobalMenu_Props) => {
  const context = useContext(UserContext);
  return (
    <>
      <Transition appear show={globalMenuIsOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => setGlobalMenuIsOpen(false)}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child {...AddItem_Transition_Props}>
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
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
                  Page menu
                </Dialog.Title>

                <div className="mt-2">
                  <Menu as="div" className="mt-4">
                    <Menu.Items
                      static
                      as="div"
                      className="
                        mt-2 w-full
                        space-y-2 divide-gray-100 rounded-md bg-black
                        bg-opacity-40 shadow-lg ring-1 ring-black
                        ring-opacity-5 filter backdrop-blur-3xl
                        focus:outline-none
                      "
                    >
                      <Menu.Item
                        as="div"
                        className="mx-3 flex items-center justify-between text-gray-300"
                      >
                        <p>is public</p>
                        <Switch
                          checked={page_is_public}
                          onChange={async () => {
                            await fetch_changePageIsPublicByPublicLink(
                              page,
                              !page_is_public
                            );
                            stateReload();
                          }}
                          className={`${
                            page_is_public
                              ? "bg-theme-primary-700"
                              : "bg-theme-primary-500"
                          }
          relative inline-flex h-[38px] w-[74px] flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                        >
                          <span className="sr-only">Use setting</span>
                          <span
                            aria-hidden="true"
                            className={`${
                              page_is_public ? "translate-x-9" : "translate-x-0"
                            }
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                          />
                        </Switch>
                      </Menu.Item>

                      {page_is_public && (
                        <Menu.Item>
                          <p className="text-gray-300">
                            https://taskhighlights.com/
                            {context?.currentUser?.user_username}/{page}
                          </p>
                        </Menu.Item>
                      )}
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
