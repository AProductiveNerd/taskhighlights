import "../styles/globals.css";
import type { AppProps } from "next/app";
import { fireAuth } from "../libs/Firebase";
import FireUserContext from "../contexts/FireUserContext";

function MyApp({ Component, pageProps }: AppProps) {
	const user = fireAuth.currentUser;

	return (
		<FireUserContext.Provider value={{ user }}>
			<Component {...pageProps} />
		</FireUserContext.Provider>
	);
}

export default MyApp;
