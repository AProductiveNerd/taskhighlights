import { Page, Prisma, PrismaClient, Todo, User } from "@prisma/client";

const prisma = new PrismaClient();

export interface User_Body {
	user_avatar: string;
	user_email: string;
	user_fullname: string;
	user_username: string;
	user_id: string;
}

export interface Page_Body {
	page_title: string;
	page_user_id: string;
}

export interface Todo_Body {
	todo_description: string;
	todo_user_id: string;
	todo_page_id: number;
}

export const getUserByUsername = async (
	user_username: string
): Promise<User> => {
	const user = await prisma.user.findUnique({
		where: {
			user_username,
		},
	});

	return user;
};

export const getUserByUserid = async (user_id: string): Promise<User> => {
	const user = await prisma.user.findUnique({
		where: {
			user_id,
		},
	});

	return user;
};

export const getUserByEmailaddress = async (
	user_email: string
): Promise<User> => {
	const user = await prisma.user.findUnique({
		where: {
			user_email,
		},
	});

	return user;
};

export const createUser = async ({
	user_avatar,
	user_email,
	user_fullname,
	user_id,
	user_username,
}: User_Body): Promise<User> => {
	const createdUser: User = await prisma.user.create({
		data: {
			user_avatar,
			user_email,
			user_fullname,
			user_id,
			user_username,
		},
	});

	return createdUser;
};

export const deleteUserbyuserid = async (
	user_id: string
): Promise<User> => {
	const deletedUser: User = await prisma.user.delete({
		where: {
			user_id,
		},
	});

	return deletedUser;
};

export const deleteUserbyemail = async (
	user_email: string
): Promise<User> => {
	const deletedUser: User = await prisma.user.delete({
		where: {
			user_email,
		},
	});

	return deletedUser;
};

export const deleteUserbyusername = async (
	user_username: string
): Promise<User> => {
	const deletedUser: User = await prisma.user.delete({
		where: {
			user_username,
		},
	});

	return deletedUser;
};

export const getPageByPageid = async (page_id: number): Promise<Page> => {
	const page: Page = await prisma.page.findUnique({
		where: {
			page_id,
		},
	});

	return page;
};

export const getPageByPageTitle = async (
	page_title: string
): Promise<Page> => {
	const page: Page = await prisma.page.findUnique({
		where: {
			page_title,
		},
	});

	return page;
};

export const createPage = async ({
	page_title,
	page_user_id,
}: Page_Body): Promise<Page> => {
	const createdPage: Page = await prisma.page.create({
		data: {
			page_title,
			page_user_id,
		},
	});

	return createdPage;
};

export const createRetDailyPage = async (
	page_user_id: string
): Promise<Page> => {
	const today: string = new Date().toLocaleDateString("en-GB");

	const page: Page = await prisma.page.upsert({
		where: { page_title: today },
		create: {
			page_title: today,
			page_user_id,
		},
		update: {},
	});

	return page;
};

export const deletePageByPageid = async (
	page_id: number
): Promise<Page> => {
	const deletedPage: Page = await prisma.page.delete({
		where: {
			page_id,
		},
	});

	return deletedPage;
};

export const deletePageByPageTitle = async (
	page_title: string
): Promise<Page> => {
	const deletedPage: Page = await prisma.page.delete({
		where: {
			page_title,
		},
	});

	return deletedPage;
};

export const getAllPagesByUserid = async (
	page_user_id: string
): Promise<Page[]> => {
	const pages: Page[] = await prisma.page.findMany({
		where: {
			page_user_id,
		},
	});

	return pages;
};

export const deleteAllPagesByUserid = async (
	page_user_id: string
): Promise<Prisma.BatchPayload> => {
	const deletedPages: Prisma.BatchPayload = await prisma.page.deleteMany({
		where: {
			page_user_id,
		},
	});

	return deletedPages;
};

export const getTodobyTodoId = async (todo_id: number): Promise<Todo> => {
	const todo: Todo = await prisma.todo.findUnique({
		where: {
			todo_id,
		},
	});

	return todo;
};

export const createTodo = async ({
	todo_description,
	todo_page_id,
	todo_user_id,
}: Todo_Body): Promise<Todo> => {
	const todo: Todo = await prisma.todo.create({
		data: {
			todo_description,
			todo_page_id,
			todo_user_id,
		},
	});

	return todo;
};

export const deleteTodo = async (todo_id: number): Promise<Todo> => {
	const deletedTodo: Todo = await prisma.todo.delete({
		where: {
			todo_id,
		},
	});

	return deletedTodo;
};

export const getAllTodosByPage = async (
	todo_page_id: number
): Promise<Todo[]> => {
	const todos: Todo[] = await prisma.todo.findMany({
		where: {
			todo_page_id,
		},
	});

	return todos;
};
