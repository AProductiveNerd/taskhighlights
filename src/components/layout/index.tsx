import { useEffect, useMemo, useState } from "react";

import { ChildrenProps } from "../../constants/Types";
import PageSearchContext from "../../contexts/PageSearchContext";
import { User } from "@prisma/client";
import UserContext from "../../contexts/UserContext";
import dynamic from "next/dynamic";
import { useHotkeys } from "react-hotkeys-hook";
import { useRouter } from "next/router";

const DynamicHeader = dynamic(() => import("./Header"));

export const Layout = ({ children }: ChildrenProps): JSX.Element => {
  const [path, setPath] = useState<string>(null);
  const [pageSearchIsOpen, setPageSearchIsOpen] = useState(false);
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User>(null);
  const providerValue = useMemo(
    () => ({ currentUser, setCurrentUser }),
    [currentUser, setCurrentUser]
  );
  useEffect(() => {
    setPath(router.pathname.toString());
  }, [router.pathname]);

  useHotkeys("ctrl+p, command+p, ctrl+shift+f", (event, handler) => {
    event.preventDefault();
    switch (handler.key) {
      case "ctrl+shift+f":
        setPageSearchIsOpen(true);
        break;
    }

    return false;
  });

  return (
    <UserContext.Provider value={providerValue}>
      <div
        className="
          flex min-h-screen
          flex-col
          bg-theme-blueGray-900 text-theme-blueGray-300
          selection:bg-theme-primary-500/60
        "
      >
        <header className="flex justify-center border-b-2 border-theme-primary-500">
          <PageSearchContext.Provider
            value={{ pageSearchIsOpen, setPageSearchIsOpen }}
          >
            <DynamicHeader path={path} />
          </PageSearchContext.Provider>
        </header>

        <main className="flex flex-1">{children}</main>
      </div>
    </UserContext.Provider>
  );
};
