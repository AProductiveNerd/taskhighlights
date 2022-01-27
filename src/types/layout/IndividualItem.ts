import { Fragment } from "react";

export interface IndividualMenu_Props {
  text_input_p: JSX.Element;
  input_checkbox: JSX.Element;
  menu_items?: JSX.Element | JSX.Element[];
  non_menu_button?: JSX.Element | JSX.Element[];
  menu_show_button_icon?: JSX.Element;
  onkeydowncapture_callback: (
    // eslint-disable-next-line no-unused-vars
    event: React.KeyboardEvent<HTMLDivElement>
  ) => void | null;
}

export const InvdividualItem_Transition_Props = {
  as: Fragment,
  enter: "transition ease-out duration-100",
  enterFrom: "transform opacity-0 scale-95",
  enterTo: "transform opacity-100 scale-100",
  leave: "transition ease-in duration-75",
  leaveFrom: "transform opacity-100 scale-100",
  leaveTo: "transform opacity-0 scale-95",
};
