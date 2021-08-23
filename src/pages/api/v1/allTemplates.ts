import type { NextApiRequest, NextApiResponse } from "next";
import { Prisma, Routine_Templates } from "@prisma/client";

import { prisma_getAllUserTemplates } from "../../../utils/prismaHelpers";
import { user_id } from "./../../../constants/Types";

export default async function handler(
  req: NextApiRequest,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  res: NextApiResponse<any>
): Promise<void> {
  const method = req.method;
  const template_user_id: user_id = req.query.template_user_id.toString();

  switch (method) {
    case "GET":
      try {
        const templates: Routine_Templates[] = await prisma_getAllUserTemplates(
          template_user_id
        );

        res.status(201).json(JSON.stringify(templates));
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          res.status(409).json(JSON.stringify(e.message));
        }
      }
      break;
  }
}
