import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, users } from "@prisma/client";
import { getUserByUsername } from "./../../utils/index";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	const prisma = new PrismaClient();

	const {
		avatar,
		datecreated,
		emailaddress,
		fullname,
		lastseen,
		userid,
		username,
		reqcontent,
	}: {
		avatar: string;
		datecreated: string;
		emailaddress: string;
		fullname: string;
		lastseen: string;
		userid: string;
		username: string;
		reqcontent: string;
	} = req.body;
	const method: string = req.method;
	switch (method) {
		case "GET":
			if (reqcontent === "getbyusername") {
			} else {
				const allUsers: users[] = await prisma.users.findMany({
					where: {
						userid: userid,
					},
				});
				res.json(allUsers);
			}

			break;

		case "POST":
			const newUser: users = await prisma.users.create({
				data: {
					avatar,
					datecreated,
					emailaddress,
					fullname,
					lastseen,
					username,
					userid,
				},
			});

			res.json(newUser);
			break;

		case "DELETE":
			if (userid !== undefined) {
				const deletedUser: users = await prisma.users.delete({
					where: {
						userid,
					},
				});

				res.json(deletedUser);
			}

			break;
	}
}
