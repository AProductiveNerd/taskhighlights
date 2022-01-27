import { Prisma, Todo } from "@prisma/client";

import { NextApiResponse } from "next";
import { is_valid_prop } from "../../utils/validationHelpers";
import { make_json_string } from "../../utils/generalHelpers";
import { prisma_moveTasks } from "../../utils/prismaHelpers";
import { prisma_moveTasksToToday } from "./../../utils/prismaHelpers";
import { type_Todo_Body } from "../../constants/Types";

interface type_todo_put_handler {
  body: type_Todo_Body;
  res: NextApiResponse<any>;
}

export const todo_put_handler = async ({
  body: { new_page_id, old_page_id, today, todo_id, user_id, put_task },
  res,
}: type_todo_put_handler): Promise<void> => {
  let todo: Prisma.BatchPayload | Todo = null;

  try {
    switch (put_task) {
      case "several":
        if (!is_valid_prop(old_page_id)) {
          res
            .status(400)
            .json(
              make_json_string({ Error: "Please enter a valid old page id" })
            );

          return;
        }

        if (!is_valid_prop(new_page_id)) {
          res
            .status(400)
            .json(
              make_json_string({ Error: "Please enter a valid new page id" })
            );

          return;
        }

        todo = await prisma_moveTasks({
          new_page_id,
          old_page_id,
        });
        break;

      case "single":
        if (!is_valid_prop(today)) {
          res
            .status(400)
            .json(
              make_json_string({ Error: "Please enter a valid today argument" })
            );
        }
        if (!is_valid_prop(todo_id)) {
          res
            .status(400)
            .json(make_json_string({ Error: "Please enter a valid todo id" }));
        }
        if (!is_valid_prop(user_id)) {
          res
            .status(400)
            .json(make_json_string({ Error: "Please enter a valid user id" }));
        }
        todo = await prisma_moveTasksToToday({
          today,
          todo_id,
          user_id,
        });
        break;

      default:
        res
          .status(400)
          .json(make_json_string({ Error: "Please enter a valid put_task" }));
        return;
    }
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(500).json(e.message);
    } else {
      res.status(500).json(
        make_json_string({
          Error: "Could not move",
        })
      );
    }
    return;
  }

  if (!todo) {
    res.status(404).json(
      make_json_string({
        Error: "Could not move",
      })
    );
    return;
  }

  res.status(200).json(make_json_string(todo));
};
