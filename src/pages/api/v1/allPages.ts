import { Page, Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  prisma_deleteAllPagesByUserid,
  prisma_getAllPagesByUserid
} from "../../../utils/prismaHelpers";

export default async function handler(
  req: NextApiRequest,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  res: NextApiResponse<any>
): Promise<void> {
  const method = req.method;
  const {
    user_id
  }: {
    user_id?: string;
  } = req.query;

  if (method === "GET") {
    const pages: Page[] = await prisma_getAllPagesByUserid(user_id);

    res.status(200).json(pages);
  } else if (method === "DELETE") {
    const deletedPages: Prisma.BatchPayload =
      await prisma_deleteAllPagesByUserid(user_id);

    res.status(200).json({
      Success: `Deleted ${deletedPages.count} pages`
    });
  }
}
