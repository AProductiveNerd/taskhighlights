import "../../public/Inter Web/inter.css";
import "../styles/globals.css";

import { useEffect, useState } from "react";

import type { AppProps } from "next/app";
import FireUserContext from "../contexts/FireUserContext";
import { fireAuth } from "../libs/Firebase";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const [fireId, setFireId] = useState({});

  const router = useRouter();

  useEffect(() => {
    fireAuth.onAuthStateChanged((user) => {
      if (
        !user &&
        router.pathname.toString() !== "/sign-in" &&
        router.pathname.toString() !== "/sign-up"
      ) {
        router.push("/sign-in");
      } else {
        setFireId(user?.uid);
      }
    });
  }, [router, fireId]);

  return (
    <FireUserContext.Provider value={{ fireId }}>
      <Component {...pageProps} />
    </FireUserContext.Provider>
  );
}

export default MyApp;
