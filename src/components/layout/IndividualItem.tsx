import {
  IndividualMenu_Props,
  InvdividualItem_Transition_Props,
} from "../../types/layout/IndividualItem";
import { Menu, Transition } from "@headlessui/react";

export const IndividualItem = ({
  input_checkbox,
  menu_items,
  text_input_p,
  non_menu_button,
  onkeydowncapture_callback,
  menu_show_button_icon,
}: IndividualMenu_Props): JSX.Element => {
  return (
    <div
      className="group Individual-Item relative flex items-center space-x-2 break-words text-left text-lg leading-6"
      tabIndex={0}
      onKeyDownCapture={onkeydowncapture_callback}
    >
      {input_checkbox}

      {text_input_p}

      {non_menu_button && (
        <div className="non-menu-buttons">{non_menu_button}</div>
      )}

      {menu_items && menu_show_button_icon && (
        <div>
          <Menu
            as="div"
            className="relative inline-block text-left text-theme-blueGray-300"
          >
            <Transition {...InvdividualItem_Transition_Props}>
              <Menu.Items
                className="
                  absolute right-0 z-50 mr-10 -mt-24 w-56
                  origin-bottom-left divide-gray-100 rounded-md bg-black
                  bg-opacity-70 shadow-lg
                  ring-1 ring-black ring-opacity-5 filter
                  backdrop-blur-3xl
                  focus:outline-none
                "
              >
                <div className="px-1 py-1">{menu_items}</div>
              </Menu.Items>
            </Transition>

            <div>
              <Menu.Button
                as="button"
                title="Menu"
                aria-label="Menu"
                className="
                  inline-flex w-full
                  justify-center rounded-md bg-black
                  bg-opacity-20 px-2
                  py-2
                  text-sm font-medium filter backdrop-blur-3xl
                  hover:bg-opacity-30 focus:outline-none focus-visible:ring-2
                  focus-visible:ring-white focus-visible:ring-opacity-75
                "
              >
                {menu_show_button_icon}
              </Menu.Button>
            </div>
          </Menu>
        </div>
      )}
    </div>
  );
};
