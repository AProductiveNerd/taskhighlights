import type { NextApiRequest, NextApiResponse } from "next";
import { Pool } from "pg";
import { pool } from "../../../db";
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
		done,
		id,
	}: { description: string; done: boolean; id: number } = req.body;

	const user = (
		await getAllFromTableWhere("users", "userId", req.query.id[0])
	).rows[0];

	if (user) {
		const method: string = req.method;

		switch (method) {
			case "GET":
				const allTodos = await getAllFromTable("todo");
				res.json(allTodos.rows);
				break;

			case "POST":
				if (
					typeof description === "string" &&
					description !== "" &&
					typeof done === "boolean"
				) {
					const newTodo = await createNewTask(description, done);

					res.json(newTodo.rows[0]);
				} else {
					res.status(406).json({ Error: "Not Acceptable" });
				}
				break;

			case "DELETE":
				if (id !== undefined) {
					const deleted = await deleteTableColumnFromId(
						"todo",
						"todo_id",
						id
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
