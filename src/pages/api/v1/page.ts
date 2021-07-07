import type { NextApiRequest, NextApiResponse } from "next";
import { Page, Prisma } from "@prisma/client";
import {
  Page_Body,
  createPage,
  createRetDailyPage,
  deletePageByPageTitle,
  deletePageByPageid,
  getPageByPageTitle,
  getPageByPageid
} from "../../../utils/prismaHelpers";

interface Query {
  page_id?: string;
  page_title?: string;
  page_user_id?: string;
}

export default async function handler(
  req: NextApiRequest,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  res: NextApiResponse<any>
): Promise<void> {
  const method = req.method;
  const { page_id, page_title, page_user_id }: Query = req.query;

  if (method === "GET") {
    if (page_id) {
      const page: Page = await getPageByPageid(parseInt(page_id));

      res.status(200).json(page);
    } else if (page_title) {
      const page: Page = await getPageByPageTitle(page_title);

      res.status(200).json(page);
    } else {
      if (page_user_id) {
        const page: Page = await createRetDailyPage(page_user_id);

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
      const deletedPage: Page = await deletePageByPageid(parseInt(page_id));

      res.status(200).json(deletedPage);
    } else if (page_title) {
      const deletedPage: Page = await deletePageByPageTitle(page_title);

      res.status(200).json(deletedPage);
    }
  }
}
