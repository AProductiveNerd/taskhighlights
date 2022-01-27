import type { NextApiRequest, NextApiResponse } from "next";
import { Page, Prisma } from "@prisma/client";
import {
  prisma_deleteAllPagesByUserid,
  prisma_getAllPagesByUserid,
} from "../../../utils/prismaHelpers";

import { make_json_string } from "./../../../utils/generalHelpers";

interface Query {
  user_id?: string;
  work?: "all" | "names";
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
): Promise<void> {
  const method = req.method;

  const { user_id, work }: Query = req.query;

  switch (method) {
    case "GET": {
      if (work === "all") {
        const pages: Page[] = await prisma_getAllPagesByUserid(user_id);

        res.status(200).json(make_json_string(pages));
      } else if (work === "names") {
        const pages: Page[] = await prisma_getAllPagesByUserid(user_id);
        const names = pages.map((page) => page.page_title);

        res.status(200).json(make_json_string(names));
      }
      break;
    }

    case "DELETE": {
      const deletedPages: Prisma.BatchPayload =
        await prisma_deleteAllPagesByUserid(user_id);

      res.status(200).json(
        make_json_string({
          Success: `Deleted ${deletedPages.count} pages`,
        })
      );

      break;
    }
  }
}
