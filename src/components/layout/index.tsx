import { useContext, useEffect, useState } from "react";

import { ChildrenProps } from "../../constants/Types";
import FireUserContext from "../../contexts/FireUserContext";
import { Header } from "./Header";
import { User } from "@prisma/client";
import UserContext from "./../../contexts/UserContext";
import { fetch_getUserByUserid } from "../../utils/fetchHelpers";
import { useRouter } from "next/router";

export const Layout = ({ children }: ChildrenProps): JSX.Element => {
  const fireId = useContext(FireUserContext);
  const [currentUser, setCurrentUser] = useState<User>(null);
  const [path, setPath] = useState<string>(null);

  const router = useRouter();

  useEffect(() => {
    setPath(router.pathname.toString());
  }, [router.pathname]);

  useEffect(() => {
    (async () => {
      const user = await fetch_getUserByUserid(fireId);

      if (JSON.stringify(currentUser) !== JSON.stringify(user)) {
        setCurrentUser(user);
      }
    })();
  }, [fireId, currentUser]);

  return (
    <UserContext.Provider value={currentUser}>
      <div
        className="
          bg-theme-blueGray-900 text-theme-blueGray-300
          min-h-screen
          flex flex-col
          selection:bg-theme-primary-500/60
        "
      >
        <header className="flex justify-center border-b-2 border-theme-primary-500">
          <Header currentUser={currentUser} path={path} />
        </header>

        <main className="flex flex-1">{children}</main>
      </div>
    </UserContext.Provider>
  );
};
