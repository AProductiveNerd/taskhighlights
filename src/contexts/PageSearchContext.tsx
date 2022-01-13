import { Context, createContext } from "react";

import { type_PageSearchContext } from "../types/contexts/PageSearchContext";

const PageSearchContext: Context<type_PageSearchContext> = createContext(null);
export default PageSearchContext;
