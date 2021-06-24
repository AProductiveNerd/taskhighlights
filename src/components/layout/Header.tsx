import { HomeIcon, LogoutIcon } from "@heroicons/react/outline";

import Image from "next/image";
import Link from "next/link";
import { fireAuth } from "../../libs/Firebase";
import { users } from "@prisma/client";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";

export const Header = () => {
	const currentUser: users = useContext(UserContext);

	return (
		<div className="flex flex-row p-4 items-center px-4 space-x-14 sm:space-x-40 md:space-x-60">
			<div>
				<Link href="/">
					<a
						title="Home"
						aria-label="Home"
						className="flex items-center"
					>
						<HomeIcon className="w-8 h-8" />
					</a>
				</Link>
			</div>

			{currentUser?.avatar && (
				<div className="bg-gradient-to-tr from-theme-primary-500 to-theme-fuchsia-600 p-1 rounded-full">
					<div className="relative rounded-full w-20 h-20 transform transition hover:-rotate-360 bg-white cursor-pointer">
						<Image
							alt="user-avatar"
							src={currentUser.avatar}
							layout="fill"
						/>
					</div>
				</div>
			)}

			<div>
				<button
					aria-label="Sign out"
					className="flex items-center"
					title="Sign out"
					onClick={() => fireAuth.signOut()}
				>
					<LogoutIcon className="w-8 h-8" />
				</button>
			</div>
		</div>
	);
};
