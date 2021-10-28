import "../styles/globals.css";

import { useEffect, useState } from "react";

import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import FireUserContext from "../contexts/FireUserContext";
import Head from "next/head";
import { auth } from "../libs/Firebase";
import { default_seo } from "../../next-seo.config";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const [fireId, setFireId] = useState(null);

  const router = useRouter();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (
        !user &&
        router.pathname.toString() !== "/log-in" &&
        router.pathname.toString() !== "/sign-up" &&
        router.pathname.toString() !== "/"
      ) {
        router.push("/");
      } else {
        setFireId(user?.uid);
      }
    });
  }, [router, fireId]);

  return (
    <FireUserContext.Provider value={fireId}>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <meta name="theme-color" content="#fff" />
      </Head>
      <DefaultSeo {...default_seo()} />
      <Component {...pageProps} />
    </FireUserContext.Provider>
  );
}

export default MyApp;
