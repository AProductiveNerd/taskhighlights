import type { NextApiRequest, NextApiResponse } from "next";

import { Useful_Todo } from "../../../constants/Types";
import { prisma_getAllTodosByPage } from "../../../utils/prismaHelpers";

interface Query {
  page_id?: string;
  user_id?: string;
}

export default async function handler(
  req: NextApiRequest,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  res: NextApiResponse<any>
): Promise<void> {
  const method = req.method;
  const { page_id, user_id }: Query = req.query;

  switch (method) {
    case "GET": {
      const todos: Useful_Todo[] = await prisma_getAllTodosByPage(
        page_id,
        user_id
      );

      res.status(200).json(todos);
    }
  }
}
