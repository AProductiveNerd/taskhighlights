import {
  AddItem_Transition_Props,
  UseItem_Transition_Props,
} from "../../types/layout/AddOrUseItem";
import { Dialog, Menu, Switch, Transition } from "@headlessui/react";
import { Dispatch, Fragment, SetStateAction, useContext } from "react";
import {
  type_page_is_public,
  type_page_public_link,
  type_stateReload,
} from "../../constants/Types";

import UserContext from "../../contexts/UserContext";
import { fetch_changePageIsPublicByPublicLink } from "../../utils/fetchHelpers";

interface GlobalMenu_Props {
  globalMenuIsOpen: boolean;
  setGlobalMenuIsOpen: Dispatch<SetStateAction<boolean>>;
  page: type_page_public_link;
  page_is_public: type_page_is_public;
  stateReload: type_stateReload;
}

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
                  Page menu
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
                        space-y-2
                      "
                    >
                      <Menu.Item
                        as="div"
                        className="flex justify-between items-center text-gray-300 mx-3"
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
          relative inline-flex flex-shrink-0 h-[38px] w-[74px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                        >
                          <span className="sr-only">Use setting</span>
                          <span
                            aria-hidden="true"
                            className={`${
                              page_is_public ? "translate-x-9" : "translate-x-0"
                            }
            pointer-events-none inline-block h-[34px] w-[34px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
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
