import type { NextApiRequest, NextApiResponse } from "next";
import { Prisma, User } from "@prisma/client";
import {
  prisma_createUser,
  prisma_deleteUserbyuserid,
  prisma_deleteUserbyusername,
  prisma_getUserByUserid,
  prisma_getUserByUsername
} from "../../../utils/prismaHelpers";

import { User_Request_Body } from "../../../constants/Types";

interface Query {
  user_id?: string;
  user_username?: string;
}

export default async function handler(
  req: NextApiRequest,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  res: NextApiResponse<any>
): Promise<void> {
  const method = req.method;
  const { user_id, user_username }: Query = req.query;

  if (method === "GET") {
    if (user_id) {
      const requested_user: User = await prisma_getUserByUserid(user_id);

      res.status(200).json(requested_user);
    } else if (user_username) {
      const requested_user: User = await prisma_getUserByUsername(
        user_username
      );
      if (requested_user !== null) {
        res.status(200).json(requested_user);
      } else {
        res.status(501).json(null);
      }
    }
  } else if (method === "POST") {
    try {
      const body: User_Request_Body = req.body;
      const createdUser: User = await prisma_createUser(body);
      res.status(201).json(createdUser);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        res.status(409).json(e.message);
      }
    }
  } else if (method === "DELETE") {
    if (user_id) {
      const deletedUser: User = await prisma_deleteUserbyuserid(user_id);

      res.status(200).json(deletedUser);
    } else if (user_username) {
      const deletedUser: User = await prisma_deleteUserbyusername(
        user_username
      );

      res.status(200).json(deletedUser);
    }
  }
}
