import { AddTask } from "./AddTask";
import { Page, User } from "@prisma/client";
import { useContext, useEffect, useState } from "react";
import { fetchPageRet } from "../../utils/fetchHelpers";
import UserContext from "./../../contexts/UserContext";

export const TasksCard = () => {
	// ! Limit the number of tasks a user can add to amplify the constraints lead to creativity effect
	const [currentPage, setCurrentPage] = useState<Page>(null);
	const currentUser: User = useContext(UserContext);

	useEffect(() => {
		(async () => {
			const page: Page = await fetchPageRet(currentUser?.user_id);
			setCurrentPage(page);
		})();
	}, []);

	return (
		<div className="noScrollbar max-h-[80vh] w-11/12 sm:max-w-md md:max-w-lg py-4 px-8 bg-theme-blueGray-800 shadow-lg rounded-lg mx-auto selection:bg-theme-primary-500/60 overflow-y-scroll overflow-x-hidden">
			<p>{currentPage?.page_title}</p>
			<AddTask
				user={currentUser?.user_id}
				page={currentPage?.page_id}
			/>
		</div>
	);
};
