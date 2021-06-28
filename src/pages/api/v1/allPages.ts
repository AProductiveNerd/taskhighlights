import type { NextApiRequest, NextApiResponse } from "next";
import { page, Prisma } from "@prisma/client";
import {
	deleteAllPagesByUserid,
	getAllPagesByUserid,
} from "../../../utils/prismaHelpers";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	const method = req.method;
	const {
		page_user_id,
	}: {
		page_user_id?: string;
	} = req.query;

	if (method === "GET") {
		const pages: page[] = await getAllPagesByUserid(page_user_id);

		res.status(200).json(pages);
	} else if (method === "DELETE") {
		const deletedPages: Prisma.BatchPayload =
			await deleteAllPagesByUserid(page_user_id);

		res.status(200).json({
			Success: `Deleted ${deletedPages.count} pages`,
		});
	}
}
