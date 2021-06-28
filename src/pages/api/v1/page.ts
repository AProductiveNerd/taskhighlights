import type { NextApiRequest, NextApiResponse } from "next";
import { page, Prisma } from "@prisma/client";
import {
	createPage,
	deletePageByPageid,
	createRetDailyPage,
	deletePageByPageTitle,
	getPageByPageid,
	getPageByPageTitle,
	Page_Body,
} from "../../../utils/prismaHelpers";

interface Query {
	page_id?: number;
	page_title?: string;
	page_user_id?: string;
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	const method = req.method;
	const { page_id, page_title, page_user_id }: Query = req.query;

	if (method === "GET") {
		if (page_id) {
			const page: page = await getPageByPageid(page_id);

			res.status(200).json(page);
		} else if (page_title) {
			const page: page = await getPageByPageTitle(page_title);

			res.status(200).json(page);
		} else {
			if (page_user_id) {
				const page: page = await createRetDailyPage(page_user_id);

				res.status(200).json(page);
			}
		}
	} else if (method === "POST") {
		try {
			const body: Page_Body = req.body;
			const createdPage: page = await createPage(body);

			res.status(201).json(createdPage);
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				res.status(409).json(e.message);
			}
		}
	} else if (method === "DELETE") {
		if (page_id) {
			const deletedPage: page = await deletePageByPageid(page_id);

			res.status(200).json(deletedPage);
		} else if (page_title) {
			const deletedPage: page = await deletePageByPageTitle(page_title);

			res.status(200).json(deletedPage);
		}
	}
}
