import type { NextApiRequest, NextApiResponse } from "next";
import {
	deleteUserByUserId,
	deleteUserByUsername,
	getUserByUserId,
	getUserByUsername,
	question,
	urlSplitByQuestions,
} from "../../utils";

import { users } from "@prisma/client";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	const { username, userid }: question = await urlSplitByQuestions(
		req.url
	);

	const method: string = req.method;

	if (userid) {
		if (method === "GET") {
			const user: users = await getUserByUserId(userid);

			if (user) {
				res.json(user);
			} else {
				res.json({ Error: "No user found" });
			}
		} else if (method === "DELETE") {
			const deletedUser: users = await deleteUserByUserId(userid);

			if (deletedUser) {
				res.json(deletedUser);
			} else {
				res.json({ Error: "No user found" });
			}
		}
	} else if (username && !userid) {
		if (method === "GET") {
			const user: users = await getUserByUsername(username);

			if (user) {
				res.json(user);
			} else {
				res.json({ Error: "No user found" });
			}
		} else if (method === "DELETE") {
			const deletedUser: users = await deleteUserByUsername(username);

			if (deletedUser) {
				res.json(deletedUser);
			} else {
				res.json({ Error: "No user found" });
			}
		}
	}
}
