import type { NextApiRequest, NextApiResponse } from "next";
import {
	createUserTodo,
	deleteUserTodo,
	getAllUserTodos,
	getUserByUserId,
} from "../../../utils";
import { todo, users } from "@prisma/client";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	const {
		description,
		todo_id,
	}: { description: string; todo_id: number } = req.body;

	const userid: string = req.query.id.toString();

	const user: users = await getUserByUserId(userid);

	if (user) {
		const method: string = req.method;

		if (method === "GET") {
			const allTodos: todo[] = await getAllUserTodos(userid);

			res.json(allTodos);
		} else if (method === "POST") {
			if (typeof description === "string" && description !== "") {
				const createdTodo: todo = await createUserTodo(
					description,
					userid
				);

				res.json(createdTodo);
			} else {
				res.status(406).json({ Error: "Not Acceptable" });
			}
		} else if (method === "DELETE") {
			if (todo_id !== undefined) {
				const deleted: todo = await deleteUserTodo(todo_id);

				res.json(deleted);
			} else {
				res.status(406).json({ Error: "Not Acceptable" });
			}
		}
	} else {
		res.status(406).json({ Error: "No user found" });
	}
}
