import { Context, Dispatch, SetStateAction, createContext } from "react";

import { User } from "@prisma/client";

interface type_UserContext {
  currentUser: User;
  setCurrentUser: Dispatch<SetStateAction<User>>;
}

const UserContext: Context<type_UserContext | null> = createContext(null);
export default UserContext;
