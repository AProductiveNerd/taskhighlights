import { Header } from "./Header";
import { useContext, useEffect, useState } from "react";
import FireUserContext from "../../contexts/FireUserContext";
import axios from "axios";

export const Layout = ({ children }) => {
	const { fireId } = useContext(FireUserContext);
	const [currentUser, setCurrentUser] = useState(null);

	useEffect(() => {
		const fetchUser = async (): Promise<void> => {
			await axios.get(`/api/user?userid=${fireId}`).then((res) => {
				if (JSON.stringify(currentUser) !== JSON.stringify(res.data)) {
					setCurrentUser(res.data);
				}
			});
		};

		fetchUser();
	}, [fireId, currentUser]);

	return (
		<div className="bg-theme-blueGray-900 min-h-screen flex flex-col text-theme-blueGray-400">
			<header className="flex justify-center">
				<Header user={currentUser} />
			</header>

			<main className="flex-1 border-t-2 border-theme-primary-500 flex justify-center">
				{children}
			</main>
		</div>
	);
};
