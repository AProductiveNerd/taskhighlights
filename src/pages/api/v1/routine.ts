import type { NextApiRequest, NextApiResponse } from "next";
import { Prisma, Routine } from "@prisma/client";
import {
  Routine_Body,
  Routine_and_Habits,
  corsMethods,
  routine_title,
  user_id
} from "../../../constants/Types";
import {
  prisma_createRetDailyRoutine,
  prisma_createRoutine,
  prisma_deleteRoutineByRoutineid,
  prisma_getRoutineByRoutineTitle,
  prisma_getRoutineByRoutineid
} from "../../../utils/prismaHelpers";

import Cors from "cors";
import initMiddleware from "../../../libs/InitMiddleware";
import { routine_id } from "./../../../constants/Types";

interface Query {
  routine_id?: routine_id;
  routine_title?: routine_title;
  routine_user_id?: user_id;
  today?: string;
}

const cors = initMiddleware(
  Cors({
    methods: corsMethods
  })
);

export default async function handler(
  req: NextApiRequest,

  res: NextApiResponse<any>
): Promise<void> {
  await cors(req, res);

  const method = req.method;
  const { routine_id, routine_title, routine_user_id, today }: Query =
    req.query;
  switch (method) {
    case "GET":
      if (routine_id) {
        const routine: Routine = await prisma_getRoutineByRoutineid(routine_id);

        res.status(200).json(JSON.stringify(routine));
      } else if (routine_title) {
        const routine: Routine = await prisma_getRoutineByRoutineTitle(
          routine_title,
          routine_user_id
        );

        res.status(200).json(JSON.stringify(routine));
      } else {
        if (typeof routine_user_id === "string") {
          const routine: Routine_and_Habits =
            await prisma_createRetDailyRoutine(routine_user_id, today);

          res.status(200).json(JSON.stringify(routine));
        }
      }

      break;

    case "POST":
      try {
        const body: Routine_Body = req.body;

        const createdRoutine: Routine = await prisma_createRoutine(body);

        res.status(201).json(JSON.stringify(createdRoutine));
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          res.status(409).json(JSON.stringify(e.message));
        }
      }

      break;

    case "DELETE":
      if (routine_id) {
        const deletedRoutine: Routine = await prisma_deleteRoutineByRoutineid(
          routine_id
        );

        res.status(200).json(JSON.stringify(deletedRoutine));
      }

      break;
  }
}
