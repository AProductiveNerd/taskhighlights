import { users } from "@prisma/client";
import axios from "axios";

export const fetchUserFromUserid = async (
	userid: string
): Promise<users> => {
	const { data }: { data: users } = await axios.get(
		`/api/user?userid=${userid}`
	);

	return data;
};

export const createUserAxios = async (
	avatar: string,
	lastseen: string,
	emailaddress: string,
	fullname: string,
	userId: string,
	userName: string
): Promise<users> => {
	const { data }: { data: users } = await axios.post("/api/user", {
		avatar,
		lastseen,
		emailaddress,
		fullname,
		userId,
		userName,
	});

	return data;
};
