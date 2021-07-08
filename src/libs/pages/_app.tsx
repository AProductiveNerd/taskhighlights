import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FireUserContext from "../contexts/FireUserContext";
import { fireAuth } from "../libs/Firebase";
import "../styles/globals.css";



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
      <Head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <Component {...pageProps} />
    </FireUserContext.Provider>
  );
}

export default MyApp;
