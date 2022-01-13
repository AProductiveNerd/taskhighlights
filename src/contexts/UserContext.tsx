import { Context, createContext } from "react";

import { type_UserContext } from "../types/contexts/UserContext";

const UserContext: Context<type_UserContext> = createContext(null);
export default UserContext;
