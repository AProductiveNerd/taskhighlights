import type { NextApiRequest, NextApiResponse } from "next";
import {
	createNewTask,
	deleteTableColumnFromId,
	getAllFromTable,
	getAllFromTableWhere,
} from "../../../helpers";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	const {
		description,
		todo_id,
	}: { description: string; todo_id: number } = req.body;

	const userId: number = parseInt(req.query.id.toString());

	const user = (await getAllFromTableWhere("users", "userId", userId))
		.rows[0];

	if (user) {
		const method: string = req.method;

		switch (method) {
			case "GET":
				const allTodos = await getAllFromTableWhere(
					"todo",
					"userId",
					userId
				);
				res.json(allTodos.rows);

				break;

			case "POST":
				if (typeof description === "string" && description !== "") {
					const newTodo = await createNewTask(description, userId);
					res.json(newTodo.rows[0]);
				} else {
					res.status(406).json({ Error: "Not Acceptable" });
				}

				break;

			case "DELETE":
				if (todo_id !== undefined) {
					const deleted = await deleteTableColumnFromId(
						"todo",
						"todo_id",
						todo_id
					);

					if (deleted) {
						const getallTodos = await getAllFromTable("todo");
						res.json(getallTodos.rows);
					}
				} else {
					res.status(406).json({ Error: "Not Acceptable" });
				}

				break;
		}
	} else {
		res.status(406).json({ Error: "No user found" });
	}
}
