import { Habit_Body, type_Useful_Habit } from "../../../constants/Types";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  prisma_createHabit,
  prisma_createManyHabit,
  prisma_deleteHabit,
  prisma_getHabitbyHabitid,
} from "../../../utils/prismaHelpers";

import { Prisma } from "@prisma/client";
import { prisma_toggleHabitDone } from "./../../../utils/prismaHelpers";
import { type_habit_id } from "./../../../constants/Types";

interface Query {
  habit_id?: type_habit_id;
}

export default async function handler(
  req: NextApiRequest,

  res: NextApiResponse<any>
): Promise<void> {
  const method = req.method;
  const body: Habit_Body = req.body;
  const { habit_id }: Query = req.query;

  switch (method) {
    case "GET": {
      const habit: type_Useful_Habit = await prisma_getHabitbyHabitid(habit_id);

      res.status(200).json(JSON.stringify(habit));

      break;
    }

    case "POST":
      if (body.task === "toggleState") {
        const habit: type_Useful_Habit = await prisma_toggleHabitDone(body);

        res.status(201).json(JSON.stringify(habit));
      } else if (body.task === "create") {
        const habit: type_Useful_Habit = await prisma_createHabit(body);

        res.status(201).json(JSON.stringify(habit));
      } else if (body.task === "createMany") {
        const habit: Prisma.BatchPayload = await prisma_createManyHabit(body);

        res.status(201).json(JSON.stringify(habit));
      }

      break;

    case "DELETE": {
      const deletedHabit: type_Useful_Habit = await prisma_deleteHabit(
        habit_id
      );

      res.status(200).json(JSON.stringify(deletedHabit));

      break;
    }
  }
}
