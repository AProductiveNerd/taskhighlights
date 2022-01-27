import { Dispatch, SetStateAction } from "react";

import { User } from "@prisma/client";

export interface type_UserContext {
  currentUser: User | null;
  setCurrentUser: Dispatch<SetStateAction<User>>;
}
