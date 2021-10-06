import { Context, Dispatch, SetStateAction, createContext } from "react";

interface GlobalMenuConext {
  globalMenuIsOpen: boolean;
  setGlobalMenuIsOpen: Dispatch<SetStateAction<boolean>>;
}

const GlobalMenuContext: Context<GlobalMenuConext> = createContext(null);
export default GlobalMenuContext;
