import { Menu, Transition } from "@headlessui/react";

import { Fragment } from "react";

interface IndividualMenu_Props {
  text_input_p: JSX.Element;
  input_checkbox: JSX.Element;
  menu_items: JSX.Element | JSX.Element[];
  non_menu_button?: JSX.Element | JSX.Element[];
  menu_show_button_icon: JSX.Element;
  onkeydowncapture_callback: (
    event: React.KeyboardEvent<HTMLDivElement>
  ) => void;
}

export const IndividualItem = ({
  input_checkbox,
  menu_items,
  text_input_p,
  non_menu_button,
  onkeydowncapture_callback,
  menu_show_button_icon
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

      <div>
        <Menu
          as="div"
          className="relative inline-block text-left text-theme-blueGray-300"
        >
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              className="
              absolute right-0 w-56 mr-10 -mt-9 origin-bottom-left
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
    </div>
  );
};
