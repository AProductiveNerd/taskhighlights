import { Context, createContext } from "react";

import { User } from "@prisma/client";

const UserContext: Context<User> = createContext(null);
export default UserContext;
