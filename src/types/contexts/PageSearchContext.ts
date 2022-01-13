import { Dispatch, SetStateAction } from "react";

export interface type_PageSearchContext {
  pageSearchIsOpen: boolean;
  setPageSearchIsOpen: Dispatch<SetStateAction<boolean>>;
}
