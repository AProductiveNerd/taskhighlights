import type { NextApiRequest, NextApiResponse } from "next";
import { Page, Prisma } from "@prisma/client";
import {
  Page_Body,
  Page_Story_Todos,
  corsMethods
} from "../../../constants/Types";
import {
  prisma_createPage,
  prisma_createRetDailyPage,
  prisma_deletePageByPageid,
  prisma_getPageByPageTitle,
  prisma_getPageByPageid
} from "../../../utils/prismaHelpers";

import Cors from "cors";
import initMiddleware from "../../../libs/InitMiddleware";

interface Query {
  page_id?: string;
  page_title?: string;
  page_user_id?: string;
  today?: string;
}

const cors = initMiddleware(
  Cors({
    methods: corsMethods
  })
);

export default async function handler(
  req: NextApiRequest,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  res: NextApiResponse<any>
): Promise<void> {
  await cors(req, res);

  const method = req.method;
  const { page_id, page_title, page_user_id, today }: Query = req.query;
  switch (method) {
    case "GET":
      if (page_id) {
        const page: Page = await prisma_getPageByPageid(page_id);

        res.status(200).json(page);
      } else if (page_title) {
        const page: Page = await prisma_getPageByPageTitle(
          page_title,
          page_user_id
        );

        res.status(200).json(page);
      } else {
        if (typeof page_user_id === "string") {
          const page: Page_Story_Todos = await prisma_createRetDailyPage(
            page_user_id,
            today
          );

          res.status(200).json(page);
        }
      }

      break;

    case "POST":
      try {
        const body: Page_Body = req.body;

        const createdPage: Page = await prisma_createPage(body);

        res.status(201).json(createdPage);
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          res.status(409).json(e.message);
        }
      }

      break;

    case "DELETE":
      if (page_id) {
        const deletedPage: Page = await prisma_deletePageByPageid(page_id);

        res.status(200).json(deletedPage);
      }

      break;
  }
}
