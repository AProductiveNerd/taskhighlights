import { Context, createContext } from "react";
import { users } from "@prisma/client";

const UserContext: Context<users> = createContext(null);
export default UserContext;
