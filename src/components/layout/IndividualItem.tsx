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
      className="flex items-center space-x-2 text-left text-lg break-words leading-6 group relative"
      tabIndex={0}
      onKeyDownCapture={onkeydowncapture_callback}
    >
      {input_checkbox}

      {text_input_p}

      {non_menu_button && <div>{non_menu_button}</div>}

      {menu_items && menu_show_button_icon && (
        <div>
          <Menu
            as="div"
            className="relative inline-block text-left text-theme-blueGray-300"
          >
            <Transition {...InvdividualItem_Transition_Props}>
              <Menu.Items
                className="
                  absolute right-0 w-56 mr-10 -mt-24 origin-bottom-left
                  bg-black bg-opacity-70 filter backdrop-blur-3xl
                  divide-gray-100 rounded-md
                  shadow-lg ring-1 ring-black ring-opacity-5
                  focus:outline-none
                  z-50
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
                  inline-flex justify-center
                  w-full px-2 py-2
                  text-sm font-medium
                  rounded-md
                  bg-black bg-opacity-20 filter backdrop-blur-3xl
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
