import { Todo } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  createTodo,
  deleteTodo,
  getTodobyTodoId,
  Todo_Body,
  toggleTodoDone,
  updateTodoDescription
} from "../../../utils/prismaHelpers";

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
    const todo: Todo = await getTodobyTodoId(todo_id);

    res.status(200).json(todo);
  } else if (method === "POST") {
    if (body.task === "toggleState") {
      const todo: Todo = await toggleTodoDone(body);

      res.status(201).json(todo);
    } else if (body.task === "updateDescription") {
      const todo: Todo = await updateTodoDescription(body);

      res.status(201).json(todo);
    } else {
      const todo: Todo = await createTodo(body);

      res.status(201).json(todo);
    }
  } else if (method === "DELETE") {
    const deletedTodo: Todo = await deleteTodo(todo_id);

    res.status(200).json(deletedTodo);
  }
}
