import type { NextApiRequest, NextApiResponse } from "next";
import { Prisma, user } from "@prisma/client";
import {
	createUser,
	deleteUserbyemail,
	deleteUserbyuserid,
	deleteUserbyusername,
	getUserByEmailaddress,
	getUserByUserid,
	getUserByUsername,
	User_Body,
} from "../../../utils/prismaHelpers";

interface Query {
	user_userid?: string;
	user_emailaddress?: string;
	user_username?: string;
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	const method = req.method;
	const { user_userid, user_username, user_emailaddress }: Query =
		req.query;

	if (method === "GET") {
		if (user_userid) {
			const requested_user: user = await getUserByUserid(user_userid);

			res.status(200).json(requested_user);
		} else if (user_username) {
			const requested_user: user = await getUserByUsername(
				user_username
			);

			res.status(200).json(requested_user);
		} else if (user_emailaddress) {
			const requested_user: user = await getUserByEmailaddress(
				user_emailaddress
			);

			res.status(200).json(requested_user);
		}
	} else if (method === "POST") {
		try {
			const body: User_Body = req.body;
			const createdUser: user = await createUser(body);
			res.status(201).json(createdUser);
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				res.status(409).json(e.message);
			}
		}
	} else if (method === "DELETE") {
		if (user_userid) {
			const deletedUser: user = await deleteUserbyuserid(user_userid);

			res.status(200).json(deletedUser);
		} else if (user_emailaddress) {
			const deletedUser: user = await deleteUserbyemail(
				user_emailaddress
			);

			res.status(200).json(deletedUser);
		} else if (user_username) {
			const deletedUser: user = await deleteUserbyusername(
				user_username
			);

			res.status(200).json(deletedUser);
		}
	}
}
