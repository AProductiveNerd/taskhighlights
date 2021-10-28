import "../styles/globals.css";

import { useEffect, useState } from "react";

import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import FireUserContext from "../contexts/FireUserContext";
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
      <DefaultSeo {...default_seo()} />
      <Component {...pageProps} />
    </FireUserContext.Provider>
  );
}

export default MyApp;
