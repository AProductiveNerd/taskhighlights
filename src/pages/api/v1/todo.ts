import type { NextApiRequest, NextApiResponse } from "next";
import {
  prisma_createTodo,
  prisma_deleteTodo,
  prisma_getTodobyTodoId,
  prisma_makeHighlight,
  prisma_moveTasks,
  prisma_toggleArchived,
  prisma_toggleTodoDone,
  prisma_updateTodoDescription,
  prisma_updateTodoDetails,
} from "../../../utils/prismaHelpers";
import {
  type_Todo_Body,
  type_Useful_Todo,
  type_page_id,
} from "../../../constants/Types";

import { Prisma } from "@prisma/client";

interface Query {
  todo_id?: string;
  old_page_id?: type_page_id;
  new_page_id?: type_page_id;
}

export default async function handler(
  req: NextApiRequest,

  res: NextApiResponse<any>
): Promise<void> {
  const method = req.method;
  const body: type_Todo_Body = req.body;
  const { todo_id, old_page_id, new_page_id }: Query = req.query;

  switch (method) {
    case "GET": {
      const todo: type_Useful_Todo = await prisma_getTodobyTodoId(todo_id);

      res.status(200).json(JSON.stringify(todo));

      break;
    }

    case "POST":
      if (body.task === "toggleState") {
        const todo: type_Useful_Todo = await prisma_toggleTodoDone(body);

        res.status(201).json(JSON.stringify(todo));
      } else if (body.task === "updateDescription") {
        const todo: type_Useful_Todo = await prisma_updateTodoDescription(body);

        res.status(201).json(JSON.stringify(todo));
      } else if (body.task === "updateDetails") {
        const todo: type_Useful_Todo = await prisma_updateTodoDetails(body);

        res.status(201).json(JSON.stringify(todo));
      } else if (body.task === "toggleArchive") {
        const todo: type_Useful_Todo = await prisma_toggleArchived(body);

        res.status(201).json(JSON.stringify(todo));
      } else if (body.task === "makeHighlight") {
        const todo: type_Useful_Todo = await prisma_makeHighlight(body.todo_id);

        res.status(201).json(JSON.stringify(todo));
      } else if (body.task === "create") {
        const todo: type_Useful_Todo = await prisma_createTodo(body);

        res.status(201).json(JSON.stringify(todo));
      }

      break;

    case "PUT": {
      const todos: Prisma.BatchPayload = await prisma_moveTasks({
        old_page_id,
        new_page_id,
      });

      res.status(201).json(JSON.stringify(todos));
      break;
    }

    case "DELETE": {
      const deletedTodo: type_Useful_Todo = await prisma_deleteTodo(todo_id);

      res.status(200).json(JSON.stringify(deletedTodo));

      break;
    }
  }
}
