import type { NextApiRequest, NextApiResponse } from "next";
import { Prisma, Routine_Templates } from "@prisma/client";

import { Create_Template_Body } from "../../../constants/Types";
import { prisma_createTemplate } from "../../../utils/prismaHelpers";

export default async function handler(
  req: NextApiRequest,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  res: NextApiResponse<any>
): Promise<void> {
  const method = req.method;

  switch (method) {
    case "POST":
      try {
        const body: Create_Template_Body = req.body;

        const template: Routine_Templates = await prisma_createTemplate(body);

        res.status(201).json(JSON.parse(JSON.stringify(template)));
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          res.status(409).json(e.message);
        }
      }
      break;
  }
}
