import type { NextApiRequest, NextApiResponse } from "next";
import { Prisma, Template } from "@prisma/client";

import { prisma_getAllUserTemplates } from "../../../utils/prismaHelpers";
import { type_user_id } from "./../../../constants/Types";

export default async function handler(
  req: NextApiRequest,

  res: NextApiResponse<any>
): Promise<void> {
  const method = req.method;
  const template_user_id: type_user_id = req.query.template_user_id.toString();

  switch (method) {
    case "GET":
      try {
        const templates: Template[] = await prisma_getAllUserTemplates(
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
