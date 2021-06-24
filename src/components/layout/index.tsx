import { Header } from "./Header";
import { useContext, useEffect, useState } from "react";
import FireUserContext from "../../contexts/FireUserContext";
import UserContext from "./../../contexts/UserContext";
import { users } from "@prisma/client";
import { fetchUserFromUserid } from "../../utils/axiosHelpers";

export const Layout = ({ children }) => {
	const { fireId } = useContext(FireUserContext);
	const [currentUser, setCurrentUser] = useState<users>(null);

	useEffect(() => {
		(async () => {
			const user = await fetchUserFromUserid(fireId);

			if (JSON.stringify(currentUser) !== JSON.stringify(user)) {
				setCurrentUser(user);
			}
		})();
	}, [fireId, currentUser]);

	return (
		<UserContext.Provider value={currentUser}>
			<div className="bg-theme-blueGray-900 min-h-screen flex flex-col text-theme-blueGray-400">
				<header className="flex justify-center">
					<Header />
				</header>

				<main className="flex-1 border-t-2 border-theme-primary-500 flex justify-center">
					{children}
				</main>
			</div>
		</UserContext.Provider>
	);
};
