import { useContext, useEffect, useState } from "react";

import { ChildrenProps } from "../../constants/Types";
import FireUserContext from "../../contexts/FireUserContext";
import { Header } from "./Header";
import { NO_HEADER } from "../../constants/Routes";
import { User } from "@prisma/client";
import UserContext from "./../../contexts/UserContext";
import { fetch_getUserByUserid } from "../../utils/fetchHelpers";
import { useRouter } from "next/router";

export const Layout = ({ children }: ChildrenProps): JSX.Element => {
  const fireId = useContext(FireUserContext);
  const [currentUser, setCurrentUser] = useState<User>(null);
  const [displayHeader, setDisplayHeader] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const location = router.pathname.toString();

    if (NO_HEADER.indexOf(location) !== -1) {
      setDisplayHeader(false);
    }
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
      <div className="bg-theme-blueGray-900 text-theme-blueGray-400 min-h-screen flex flex-col">
        {displayHeader ? (
          <header className="flex justify-center border-b-2 border-theme-primary-500">
            <Header currentUser={currentUser} />
          </header>
        ) : (
          <main className="flex items-center flex-1">{children}</main>
        )}
      </div>
    </UserContext.Provider>
  );
};
