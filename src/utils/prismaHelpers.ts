import { PrismaClient, user } from "@prisma/client";
const prisma = new PrismaClient();

interface Body {
	user_avatar: string;
	user_emailaddress: string;
	user_fullname: string;
	user_username: string;
	user_userid: string;
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
}: Body): Promise<user> => {
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
