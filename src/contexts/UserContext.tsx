import { Context, Dispatch, SetStateAction, createContext } from "react";

import { User } from "@prisma/client";

interface type_UserContext {
  currentUser: User | null;
  setCurrentUser: Dispatch<SetStateAction<User>>;
}

const UserContext: Context<type_UserContext> = createContext(null);
export default UserContext;
