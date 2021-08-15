import {
  Habit_Body,
  Useful_Habit,
  Useful_Todo,
  corsMethods
} from "../../../constants/Types";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  prisma_createHabit,
  prisma_deleteTodo,
  prisma_getHabitbyHabitid
} from "../../../utils/prismaHelpers";

import Cors from "cors";
import { habit_id } from "./../../../constants/Types";
import initMiddleware from "../../../libs/InitMiddleware";
import { prisma_toggleHabitDone } from "./../../../utils/prismaHelpers";

interface Query {
  habit_id?: habit_id;
}
const cors = initMiddleware(
  Cors({
    methods: corsMethods
  })
);

export default async function handler(
  req: NextApiRequest,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  res: NextApiResponse<any>
): Promise<void> {
  await cors(req, res);

  const method = req.method;
  const body: Habit_Body = req.body;
  const { habit_id }: Query = req.query;

  switch (method) {
    case "GET": {
      const habit: Useful_Habit = await prisma_getHabitbyHabitid(habit_id);

      res.status(200).json(habit);

      break;
    }

    case "POST":
      if (body.task === "toggleState") {
        const habit: Useful_Habit = await prisma_toggleHabitDone(body);

        res.status(201).json(habit);
      } else if (body.task === "create") {
        const habit: Useful_Habit = await prisma_createHabit(body);

        res.status(201).json(habit);
      }

      break;

    case "DELETE": {
      const deletedTodo: Useful_Todo = await prisma_deleteTodo(habit_id);

      res.status(200).json(deletedTodo);

      break;
    }
  }
}
