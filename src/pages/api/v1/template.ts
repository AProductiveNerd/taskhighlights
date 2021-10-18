import type { NextApiRequest, NextApiResponse } from "next";
import { Prisma, Template } from "@prisma/client";
import {
  prisma_addHabitToTemplate,
  prisma_createTemplate,
} from "../../../utils/prismaHelpers";
import {
  type_Create_Template_Body,
  type_Template_Query,
} from "../../../constants/Types";

export default async function handler(
  req: NextApiRequest,

  res: NextApiResponse<any>
): Promise<void> {
  const method = req.method;

  switch (method) {
    case "POST":
      try {
        const body: type_Create_Template_Body = req.body;

        const template: Template = await prisma_createTemplate(body);

        res.status(201).json(JSON.stringify(template));
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          res.status(409).json(JSON.stringify(e.message));
        }
      }
      break;

    case "PUT": {
      const { habit_description, template_id }: type_Template_Query = req.query;

      const template: Template = await prisma_addHabitToTemplate({
        habit_description,
        template_id,
      });

      res.status(201).json(JSON.stringify(template));
      break;
    }
  }
}
