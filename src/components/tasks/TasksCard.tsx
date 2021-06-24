import { AddTask } from "./AddTask";

export const TasksCard = () => {
	return (
		<div
			className="
				noScrollbar
				max-h-[78vh]
				w-11/12 sm:max-w-md md:max-w-lg
				py-4 px-8
				bg-theme-blueGray-800
				shadow-lg rounded-lg mx-auto
				selection:bg-theme-primary-500/60
				overflow-y-scroll
				
			"
		>
			<AddTask />
		</div>
	);
};
