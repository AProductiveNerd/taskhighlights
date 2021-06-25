import { AddTask } from "./AddTask";

export const TasksCard = () => {
	// ! Limit the number of tasks a user can add to amplify the constraints lead to creativity effect
	return (
		<div className="noScrollbar max-h-[80vh] w-11/12 sm:max-w-md md:max-w-lg py-4 px-8 bg-theme-blueGray-800 shadow-lg rounded-lg mx-auto selection:bg-theme-primary-500/60 overflow-y-scroll overflow-x-hidden">
			<AddTask />
		</div>
	);
};
