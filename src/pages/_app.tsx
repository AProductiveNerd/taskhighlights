import "../styles/globals.css";

import { useEffect, useState } from "react";

import type { AppProps } from "next/app";
import FireUserContext from "../contexts/FireUserContext";
import { auth } from "../libs/Firebase";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const [fireId, setFireId] = useState(null);

  const router = useRouter();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (
        !user &&
        router.pathname.toString() !== "/sign-in" &&
        router.pathname.toString() !== "/sign-up" &&
        router.pathname.toString() !== "/"
      ) {
        router.push("/sign-in");
      } else {
        setFireId(user?.uid);
      }
    });
  }, [router, fireId]);

  return (
    <FireUserContext.Provider value={fireId}>
      <Component {...pageProps} />
    </FireUserContext.Provider>
  );
}

export default MyApp;
