import "../styles/globals.css";
import type { AppProps } from "next/app";
import { fireAuth } from "../libs/Firebase";
import FireUserContext from "../contexts/FireUserContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
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
				<link
					rel="stylesheet"
					href="https://rsms.me/inter/inter.css"
				/>
			</Head>
			<Component {...pageProps} />
		</FireUserContext.Provider>
	);
}

export default MyApp;
