import type { NextApiRequest, NextApiResponse } from "next";
import { page } from "@prisma/client";
import { getAllPagesByUserid } from "../../../utils/prismaHelpers";

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

	if (method === "GET" && page_user_id) {
		const pages: page[] = await getAllPagesByUserid(page_user_id);

		res.status(200).json(pages);
	}
}
