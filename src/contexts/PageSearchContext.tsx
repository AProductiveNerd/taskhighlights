import { Context, Dispatch, SetStateAction, createContext } from "react";

interface PageSearchContext_Types {
  pageSearchIsOpen: boolean;
  setPageSearchIsOpen: Dispatch<SetStateAction<boolean>>;
}

const PageSearchContext: Context<PageSearchContext_Types> = createContext(null);
export default PageSearchContext;
