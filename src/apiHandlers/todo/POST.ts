import {
  prisma_createTodo,
  prisma_makeHighlight,
  prisma_toggleArchived,
  prisma_toggleTodoDone,
  prisma_updateTodoDescription,
  prisma_updateTodoDetails,
} from "../../utils/prismaHelpers";
import { type_Todo_Body, type_Useful_Todo } from "../../constants/Types";

import { NextApiResponse } from "next";
import { Prisma } from ".prisma/client";
import { is_valid_prop } from "../../utils/validationHelpers";
import { make_json_string } from "../../utils/generalHelpers";

interface type_todo_post_handler {
  body: type_Todo_Body;
  res: NextApiResponse<any>;
}

export const todo_post_handler = async ({
  body,
  res,
}: type_todo_post_handler): Promise<void> => {
  let todo: type_Useful_Todo = null;

  try {
    switch (body.task) {
      case "create":
        todo = await prisma_createTodo(body);
        break;

      case "makeHighlight":
        if (is_valid_prop(body.todo_id)) {
          todo = await prisma_makeHighlight(body.todo_id);
        } else {
          res
            .status(400)
            .json(make_json_string({ Error: "Please enter a valid todo id" }));
        }
        return;

      case "toggleArchive":
        todo = await prisma_toggleArchived(body);
        break;

      case "toggleState":
        todo = await prisma_toggleTodoDone(body);
        break;

      case "updateDescription":
        todo = await prisma_updateTodoDescription(body);
        break;

      case "updateDetails":
        todo = await prisma_updateTodoDetails(body);
        break;

      default:
        res
          .status(400)
          .json(make_json_string({ Error: "Please enter a valid body.task" }));
        return;
    }
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(500).json(e.message);
    } else {
      res
        .status(500)
        .json(make_json_string({ Error: "Could not create the todo" }));

      return;
    }
  }

  if (!todo) {
    res
      .status(404)
      .json(make_json_string({ Error: "Could not create the todo" }));

    return;
  }

  res.status(200).json(make_json_string(todo));
};
