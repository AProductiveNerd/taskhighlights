import { PrismaClient, todo, users } from "@prisma/client";
const prisma = new PrismaClient();

export interface question {
	username?: string;
	userid?: string;
}

export const getUserByUsername = async (
	username: string
): Promise<users> => {
	const user: users = await prisma.users.findUnique({
		where: {
			username,
		},
	});

	return user;
};

export const getUserByEmail = async (
	emailaddress: string
): Promise<users> => {
	const user: users = await prisma.users.findUnique({
		where: {
			emailaddress,
		},
	});

	return user;
};

export const getUserByUserId = async (userid: string): Promise<users> => {
	const user: users = await prisma.users.findUnique({
		where: {
			userid,
		},
	});

	return user;
};

export const urlSplitByQuestions = async (
	uri: string
): Promise<question> => {
	const questionVals = {};

	const url = decodeURIComponent(uri);
	const questions: string[] = url.split("?");

	for (let i = 0; i < questions.length; i++) {
		const item = questions[i].split("=");
		questionVals[item[0]] = item[1];
	}

	return questionVals;
};

export const deleteUserByUserId = async (
	userid: string
): Promise<users> => {
	const deletedUser: users = await prisma.users.delete({
		where: {
			userid,
		},
	});

	return deletedUser;
};

export const deleteUserByUsername = async (
	username: string
): Promise<users> => {
	const deletedUser: users = await prisma.users.delete({
		where: {
			username,
		},
	});

	return deletedUser;
};

export const getAllUserTodos = async (userid: string): Promise<todo[]> => {
	const allTodos: todo[] = await prisma.todo.findMany({
		where: {
			User: {
				userid,
			},
		},
	});

	return allTodos;
};

export const createUserTodo = async (
	description: string,
	userid: string
): Promise<todo> => {
	const createdTodo = await prisma.todo.create({
		data: {
			description,
			User: {
				connect: { userid },
			},
		},
	});

	return createdTodo;
};

export const deleteUserTodo = async (todo_id: number): Promise<todo> => {
	const deletedTodo = await prisma.todo.delete({
		where: {
			todo_id,
		},
	});

	return deletedTodo;
};
