import type { NextApiRequest, NextApiResponse } from "next";
import { pool } from "../../db";
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
		userId: string;
		username: string;
	} = req.body;

	const method: string = req.method;

	switch (method) {
		case "GET":
			const allUsers = await pool.query("SELECT * FROM users");
			res.json(allUsers.rows);
			break;

		case "POST":
			const newTodo = await pool.query(
				"INSERT INTO users (avatar, dateCreated, emailAddress, fullName, lastSeen, userId, username) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
				[
					avatar,
					dateCreated,
					emailAddress,
					fullName,
					lastSeen,
					userId,
					username,
				]
			);
			res.json(newTodo.rows[0]);
			break;

		case "DELETE":
			if (userId !== undefined) {
				await pool.query("DELETE FROM users WHERE userId = ($1)", [
					userId,
				]);
			}
			const getAllUsers = await pool.query("SELECT * FROM users");
			res.json(getAllUsers.rows);
			break;
	}
}
