import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient, todo, users } from "@prisma/client";
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	const {
		description,
		todo_id,
	}: { description: string; todo_id: number } = req.body;

	const prisma = new PrismaClient();
	const userid: string = req.query.id.toString();

	const user: users = await prisma.users.findUnique({
		where: {
			userid,
		},
	});

	if (user) {
		const method: string = req.method;

		switch (method) {
			case "GET":
				const allTodos: todo[] = await prisma.todo.findMany({
					where: {
						User: {
							userid,
						},
					},
				});

				res.json(allTodos);

				break;

			case "POST":
				if (typeof description === "string" && description !== "") {
					// const newTodo = await createNewTask(description, userid);
					await prisma.todo.create({
						data: {
							description,
							User: {
								connect: { userid },
							},
						},
					});

					const allTodos: todo[] = await prisma.todo.findMany({
						where: {
							User: {
								userid,
							},
						},
					});

					res.json(allTodos);
				} else {
					res.status(406).json({ Error: "Not Acceptable" });
				}

				break;

			case "DELETE":
				if (todo_id !== undefined) {
					const deleted: todo = await prisma.todo.delete({
						where: {
							todo_id,
						},
					});

					res.json(deleted);
				} else {
					res.status(406).json({ Error: "Not Acceptable" });
				}

				break;
		}
	} else {
		res.status(406).json({ Error: "No user found" });
	}
}
