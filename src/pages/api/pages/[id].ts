// The get request's [id] will either be the page_id or the page_title in case of a get request

import type { NextApiRequest, NextApiResponse } from "next";
import { pages, PrismaClient } from "@prisma/client";
import { date_time_EN_GB } from "./../../../constants/Regexes";
import { urlSplitByQuestions } from "../../../utils/prismaCrud";

interface RequestBody {
	user_id: string;
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	const prisma = new PrismaClient();

	const method: string = req.method;
	const body: RequestBody = req.body;
	const url_id: string = req.query.id.toString();
	console.log(req.query);
	// const { date_en_gb, userid } = await urlSplitByQuestions(uri);

	// console.log(uri);
	// if (date_time_EN_GB.test(url_id)) {
	// ! This activates if the url is a date en-gb format. TO BE USED FOR PAGE CREATION OR GETIING IFPARAMETER IS DATE
	// if (method === "GET") {
	// 	const should_be_title: string = new Date().toLocaleDateString(
	// 		"en-GB"
	// 	);
	// 	// const newPage: pages = await prisma.pages.upsert({
	// 	// 	where: { page_title: should_be_title },
	// 	// 	create: {
	// 	// 		page_title: should_be_title,
	// 	// 		User: {
	// 	// 			connect: {
	// 	// 				userid: body.user_id,
	// 	// 			},
	// 	// 		},
	// 	// 	},
	// 	// 	update: {},
	// 	// });

	// 	// res.status(200).json(newPage);
	// 	res.status(200).json({ newPage: "wait" });
	// } else if (method === "POST") {
	// }
	// }
}
