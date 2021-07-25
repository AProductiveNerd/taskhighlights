import { Context, createContext } from "react";

import { User_And_Routine } from "../constants/Types";

const UserContext: Context<User_And_Routine> = createContext(null);
export default UserContext;
