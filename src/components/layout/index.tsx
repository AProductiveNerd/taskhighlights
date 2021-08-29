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
  const [location, setLocation] = useState("");
  const [displayHeader, setDisplayHeader] = useState(true);
  const [index, setIndex] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setLocation(router.pathname.toString());
  }, [router.pathname]);

  useEffect(() => {
    if (NO_HEADER.indexOf(location) !== -1) {
      setDisplayHeader(false);
    }

    if (location === "/") {
      setIndex(true);
    }
  }, [location]);

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
      <div className="bg-theme-blueGray-900 min-h-screen flex flex-col text-theme-blueGray-400 selection:bg-theme-blueGray-800 selection:text-theme-blueGray-400">
        {displayHeader && (
          <header className="flex justify-center">
            <Header currentUser={currentUser} />
          </header>
        )}

        <main
          className={`flex-1 ${
            displayHeader && "border-t-2"
          } border-theme-primary-500 ${
            !displayHeader && "flex justify-center items-center"
          } ${index && "items-center flex justify-center"}`}
        >
          {children}
        </main>
      </div>
    </UserContext.Provider>
  );
};
