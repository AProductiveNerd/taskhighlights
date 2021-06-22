import type { NextApiRequest, NextApiResponse } from "next";
import { pool } from "../../db";
import { createNewUser, deleteTableColumnFromId } from "../../helpers";
//new Date().toISOString();
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	// const userId = req.query.id;
	// const users = await pool.query("SELECT * FROM users");
	const {
		avatar,
		dateCreated,
		emailAddress,
		fullName,
		lastSeen,
		userId,
		username,
	}: {
		avatar: string;
		dateCreated: number;
		emailAddress: string;
		fullName: string;
		lastSeen: string;
		userId: number;
		username: string;
	} = req.body;

	const method: string = req.method;

	switch (method) {
		case "GET":
			const allUsers = await pool.query("SELECT * FROM users");
			res.json(allUsers.rows);
			break;

		case "POST":
			const newUser = await createNewUser(
				avatar,
				dateCreated,
				emailAddress,
				fullName,
				lastSeen,
				username
			);

		res.json(newUser.rows[0]);
			break;

		case "DELETE":
			if (userId !== undefined) {
				await deleteTableColumnFromId("users", "userId", userId);
			}

			const getAllUsers = await pool.query("SELECT * FROM users");

			res.json(getAllUsers.rows);
			break;
	}
}
