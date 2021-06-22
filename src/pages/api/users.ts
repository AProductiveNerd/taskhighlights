import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, users } from "@prisma/client";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	const prisma = new PrismaClient();

	const {
		avatar,
		dateCreated,
		emailAddress,
		fullName,
		lastSeen,
		userId,
		username,
	}: {
		avatar: string;
		dateCreated: string;
		emailAddress: string;
		fullName: string;
		lastSeen: string;
		userId: number;
		username: string;
	} = req.body;

	const method: string = req.method;

	switch (method) {
		case "GET":
			const allUsers: users[] = await prisma.users.findMany({
				where: {
					userid: userId,
				},
			});

			res.json(allUsers);
			break;

		case "POST":
			const newUser: users = await prisma.users.create({
				data: {
					avatar: avatar,
					datecreated: dateCreated,
					emailaddress: emailAddress,
					fullname: fullName,
					lastseen: lastSeen,
					username: username,
				},
			});

			res.json(newUser);
			break;

		case "DELETE":
			if (userId !== undefined) {
				const deletedUser: users = await prisma.users.delete({
					where: {
						userid: userId,
					},
				});

				res.json(deletedUser);
			}

			break;
	}
}
