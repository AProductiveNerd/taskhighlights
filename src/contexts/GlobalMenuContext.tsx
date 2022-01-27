import { Context, createContext } from "react";

import { type_GlobalMenuContext } from "../types/contexts/GlobalMenuContext";

const GlobalMenuContext: Context<type_GlobalMenuContext> = createContext(null);
export default GlobalMenuContext;
