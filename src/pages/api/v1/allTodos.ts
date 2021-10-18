import type { NextApiRequest, NextApiResponse } from "next";
import {
  prisma_getAllArchivedTodosByPage,
  prisma_getAllIncompleteTodosByPage,
} from "../../../utils/prismaHelpers";

import { type_Useful_Todo } from "../../../constants/Types";

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
        const todos: type_Useful_Todo[] =
          await prisma_getAllIncompleteTodosByPage(user_id);
        res.status(200).json(JSON.stringify(todos));
      } else if (work === "archived") {
        const todos: type_Useful_Todo[] =
          await prisma_getAllArchivedTodosByPage(user_id);

        res.status(200).json(JSON.stringify(todos));
      }
    }
  }
}
