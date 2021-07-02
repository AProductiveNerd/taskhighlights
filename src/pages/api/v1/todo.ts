import { todo } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import {
	createTodo,
	deleteTodo,
	getTodobyTodoId,
	Todo_Body,
} from "../../../utils/prismaHelpers";

interface Query {
	todo_id?: number;
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	const method = req.method;
	const { todo_id }: Query = req.query;

	const body: Todo_Body = req.body;

	if (method === "GET") {
		if (todo_id) {
			const todo: todo = await getTodobyTodoId(todo_id);

			res.status(200).json(todo);
		}
	} else if (method === "POST") {
		const todo: todo = await createTodo(body);

		res.status(201).json(todo);
	} else if (method === "DELETE") {
		const deletedTodo: todo = await deleteTodo(todo_id);

		res.status(200).json(deletedTodo);
	}
}
