import { Dispatch, SetStateAction } from "react";
import {
  type_page_is_public,
  type_page_public_link,
  type_stateReload,
} from "../../constants/Types";

export interface GlobalMenu_Props {
  globalMenuIsOpen: boolean;
  setGlobalMenuIsOpen: Dispatch<SetStateAction<boolean>>;
  page: type_page_public_link;
  page_is_public: type_page_is_public;
  stateReload: type_stateReload;
}
