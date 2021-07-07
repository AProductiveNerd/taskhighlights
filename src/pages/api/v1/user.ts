import type { NextApiRequest, NextApiResponse } from "next";
import { Prisma, User } from "@prisma/client";
import {
  User_Body,
  createUser,
  deleteUserbyemail,
  deleteUserbyuserid,
  deleteUserbyusername,
  getUserByEmailaddress,
  getUserByUserid,
  getUserByUsername
} from "../../../utils/prismaHelpers";

interface Query {
  user_id?: string;
  user_email?: string;
  user_username?: string;
}

export default async function handler(
  req: NextApiRequest,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  res: NextApiResponse<any>
): Promise<void> {
  const method = req.method;
  const { user_id, user_username, user_email }: Query = req.query;

  if (method === "GET") {
    if (user_id) {
      const requested_user: User = await getUserByUserid(user_id);

      res.status(200).json(requested_user);
    } else if (user_username) {
      const requested_user: User = await getUserByUsername(user_username);

      res.status(200).json(requested_user);
    } else if (user_email) {
      const requested_user: User = await getUserByEmailaddress(user_email);
      res.status(200).json(requested_user);
    }
  } else if (method === "POST") {
    try {
      const body: User_Body = req.body;
      const createdUser: User = await createUser(body);
      res.status(201).json(createdUser);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        res.status(409).json(e.message);
      }
    }
  } else if (method === "DELETE") {
    if (user_id) {
      const deletedUser: User = await deleteUserbyuserid(user_id);

      res.status(200).json(deletedUser);
    } else if (user_email) {
      const deletedUser: User = await deleteUserbyemail(user_email);

      res.status(200).json(deletedUser);
    } else if (user_username) {
      const deletedUser: User = await deleteUserbyusername(user_username);

      res.status(200).json(deletedUser);
    }
  }
}
