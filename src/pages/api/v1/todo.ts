import type { NextApiRequest, NextApiResponse } from "next";
import {
  Todo_Body,
  createTodo,
  deleteTodo,
  getTodobyTodoId
} from "../../../utils/prismaHelpers";

import { Todo } from "@prisma/client";

interface Query {
  todo_id?: string;
}

export default async function handler(
  req: NextApiRequest,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  res: NextApiResponse<any>
): Promise<void> {
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
