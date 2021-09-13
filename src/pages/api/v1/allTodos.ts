import type { NextApiRequest, NextApiResponse } from "next";

import { Useful_Todo } from "../../../constants/Types";
import { prisma_getAllIncompleteTodosByPage } from "../../../utils/prismaHelpers";

interface Query {
  page_id?: string;
  user_id?: string;
}

export default async function handler(
  req: NextApiRequest,

  res: NextApiResponse<any>
): Promise<void> {
  const method = req.method;
  const { user_id }: Query = req.query;

  switch (method) {
    case "GET": {
      const todos: Useful_Todo[] = await prisma_getAllIncompleteTodosByPage(
        user_id
      );

      res.status(200).json(JSON.stringify(todos));
    }
  }
}
