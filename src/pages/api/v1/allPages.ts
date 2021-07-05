import type { NextApiRequest, NextApiResponse } from "next";
import { Page, Prisma } from "@prisma/client";
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
		user_id,
	}: {
		user_id?: string;
	} = req.query;

	if (method === "GET") {
		const pages: Page[] = await getAllPagesByUserid(user_id);

		res.status(200).json(pages);
	} else if (method === "DELETE") {
		const deletedPages: Prisma.BatchPayload =
			await deleteAllPagesByUserid(user_id);

		res.status(200).json({
			Success: `Deleted ${deletedPages.count} pages`,
		});
	}
}
