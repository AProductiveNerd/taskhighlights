import { Page, Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  createPage,
  createRetDailyPage,
  deletePageByPageid,
  deletePageByPageTitle,
  getPageByPageid,
  getPageByPageTitle,
  Page_Story_Todos,
  Page_Body
} from "../../../utils/prismaHelpers";

interface Query {
  page_id?: string;
  page_title?: string;
  page_user_id?: string;
  today?: string;
}

export default async function handler(
  req: NextApiRequest,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  res: NextApiResponse<any>
): Promise<void> {
  const method = req.method;
  const { page_id, page_title, page_user_id, today }: Query = req.query;

  if (method === "GET") {
    if (page_id) {
      const page: Page = await getPageByPageid(page_id);

      res.status(200).json(page);
    } else if (page_title) {
      const page: Page = await getPageByPageTitle(page_title, page_user_id);

      res.status(200).json(page);
    } else {
      if (typeof page_user_id === "string") {
        const page: Page_Story_Todos = await createRetDailyPage(
          page_user_id,
          today
        );

        res.status(200).json(page);
      }
    }
  } else if (method === "POST") {
    try {
      const body: Page_Body = req.body;

      const createdPage: Page = await createPage(body);

      res.status(201).json(createdPage);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        res.status(409).json(e.message);
      }
    }
  } else if (method === "DELETE") {
    if (page_id) {
      const deletedPage: Page = await deletePageByPageid(page_id);

      res.status(200).json(deletedPage);
    } else if (page_title) {
      const deletedPage: Page = await deletePageByPageTitle(
        page_title,
        page_user_id
      );

      res.status(200).json(deletedPage);
    }
  }
}
