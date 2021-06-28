import { PrismaClient, user, page } from "@prisma/client";
const prisma = new PrismaClient();

interface User_Body {
	user_avatar: string;
	user_emailaddress: string;
	user_fullname: string;
	user_username: string;
	user_userid: string;
}

interface Page_Body {
	page_title: string;
	page_user_id: string;
}

export const getUserByUsername = async (
	user_username: string
): Promise<user> => {
	const user = await prisma.user.findUnique({
		where: {
			user_username,
		},
	});

	return user;
};

export const getUserByUserid = async (
	user_userid: string
): Promise<user> => {
	const user = await prisma.user.findUnique({
		where: {
			user_userid,
		},
	});

	return user;
};

export const getUserByEmailaddress = async (
	user_emailaddress: string
): Promise<user> => {
	const user = await prisma.user.findUnique({
		where: {
			user_emailaddress,
		},
	});

	return user;
};

export const createUser = async ({
	user_avatar,
	user_emailaddress,
	user_fullname,
	user_userid,
	user_username,
}: User_Body): Promise<user> => {
	const createdUser: user = await prisma.user.create({
		data: {
			user_avatar,
			user_emailaddress,
			user_fullname,
			user_userid,
			user_username,
		},
	});

	return createdUser;
};

export const deleteUserbyuserid = async (
	user_userid: string
): Promise<user> => {
	const deletedUser: user = await prisma.user.delete({
		where: {
			user_userid,
		},
	});

	return deletedUser;
};

export const deleteUserbyemail = async (
	user_emailaddress: string
): Promise<user> => {
	const deletedUser: user = await prisma.user.delete({
		where: {
			user_emailaddress,
		},
	});

	return deletedUser;
};

export const deleteUserbyusername = async (
	user_username: string
): Promise<user> => {
	const deletedUser: user = await prisma.user.delete({
		where: {
			user_username,
		},
	});

	return deletedUser;
};

export const getPageByPageid = async (page_id: number): Promise<page> => {
	const page: page = await prisma.page.findUnique({
		where: {
			page_id,
		},
	});

	return page;
};

export const getPageByPageTitle = async (
	page_title: string
): Promise<page> => {
	const page: page = await prisma.page.findUnique({
		where: {
			page_title,
		},
	});

	return page;
};

export const createPage = async ({
	page_title,
	page_user_id,
}: Page_Body): Promise<page> => {
	const createdPage: page = await prisma.page.create({
		data: {
			page_title,
			page_user_id,
		},
	});

	return createdPage;
};

export const createRetDailyPage = async (
	page_user_id: string
): Promise<page> => {
	const today: string = new Date().toLocaleDateString("en-GB");

	const page: page = await prisma.page.upsert({
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
): Promise<page> => {
	const deletedPage: page = await prisma.page.delete({
		where: {
			page_id,
		},
	});

	return deletedPage;
};

export const deletePageByPageTitle = async (
	page_title: string
): Promise<page> => {
	const deletedPage: page = await prisma.page.delete({
		where: {
			page_title,
		},
	});

	return deletedPage;
};
