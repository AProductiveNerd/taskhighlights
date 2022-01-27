import type { NextApiRequest, NextApiResponse } from "next";
import {
  prisma_getAllArchivedTodos,
  prisma_getAllIncompleteTodosByPage,
} from "../../../utils/prismaHelpers";

import { Todo } from "@prisma/client";
import { make_json_string } from "./../../../utils/generalHelpers";

interface Query {
  user_id?: string;
  work?: "incomplete" | "archived";
}

export default async function handler(
  req: NextApiRequest,

  res: NextApiResponse<any>
): Promise<void> {
  const method = req.method;
  const { user_id, work }: Query = req.query;

  switch (method) {
    case "GET": {
      if (work === "incomplete") {
        const todos: Todo[] = await prisma_getAllIncompleteTodosByPage(user_id);
        res.status(200).json(make_json_string(todos));
      } else if (work === "archived") {
        const todos: Todo[] = await prisma_getAllArchivedTodos(user_id);

        res.status(200).json(make_json_string(todos));
      }
    }
  }
}
