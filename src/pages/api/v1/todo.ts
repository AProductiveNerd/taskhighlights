import { Todo } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import {
	createTodo,
	deleteTodo,
	getTodobyTodoId,
	Todo_Body,
} from "../../../utils/prismaHelpers";

interface Query {
	todo_id?: string;
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	const method = req.method;
	const { todo_id }: Query = req.query;

	const body: Todo_Body = req.body;

	if (method === "GET") {
		const todo: Todo = await getTodobyTodoId(parseInt(todo_id));

		res.status(200).json(todo);
	} else if (method === "POST") {
		const todo: Todo = await createTodo(body);

		res.status(201).json(todo);
	} else if (method === "DELETE") {
		const deletedTodo: Todo = await deleteTodo(parseInt(todo_id));

		res.status(200).json(deletedTodo);
	}
}
