import { Dispatch, SetStateAction } from "react";

export interface type_GlobalMenuContext {
  globalMenuIsOpen: boolean;
  setGlobalMenuIsOpen: Dispatch<SetStateAction<boolean>>;
}
