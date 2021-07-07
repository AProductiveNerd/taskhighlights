import { Todo } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getAllTodosByPage } from "../../../utils/prismaHelpers";

interface Query {
  page_id?: string;
}

export default async function handler(
  req: NextApiRequest,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  res: NextApiResponse<any>
): Promise<void> {
  const method = req.method;
  const { page_id }: Query = req.query;

  if (method === "GET") {
    const todos: Todo[] = await getAllTodosByPage(parseInt(page_id));
    res.status(200).json(todos);
  }
}
