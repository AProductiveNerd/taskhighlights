import { Prisma, Todo } from "@prisma/client";
import {
  prisma_createTodo,
  prisma_makeHighlight,
  prisma_toggleArchived,
  prisma_toggleTodoDone,
  prisma_updateTodoDescription,
  prisma_updateTodoDetails,
} from "../../utils/prismaHelpers";

import { NextApiResponse } from "next";
import { is_valid_prop } from "../../utils/validationHelpers";
import { make_json_string } from "../../utils/generalHelpers";
import { type_Todo_Body } from "../../constants/Types";

interface type_todo_post_handler {
  body: type_Todo_Body;
  res: NextApiResponse<any>;
}

export const todo_post_handler = async ({
  body: {
    page_id,
    task,
    todo_highlight,
    user_id,
    todo_description,
    todo_details,
    todo_id,
  },
  res,
}: type_todo_post_handler): Promise<void> => {
  let todo: Todo = null;

  try {
    switch (task) {
      case "create":
        if (!is_valid_prop(page_id)) {
          res
            .status(400)
            .json(make_json_string({ Error: "Please enter a valid page id" }));
          return;
        }
        if (!is_valid_prop(todo_description)) {
          res.status(400).json(
            make_json_string({
              Error: "Please enter a valid todo description",
            })
          );
          return;
        }
        if (!is_valid_prop(todo_highlight, "boolean")) {
          res
            .status(400)
            .json(
              make_json_string({ Error: "Please enter a valid todo highlight" })
            );
          return;
        }
        if (!is_valid_prop(user_id)) {
          res
            .status(400)
            .json(make_json_string({ Error: "Please enter a valid user id" }));
          return;
        }

        todo = await prisma_createTodo({
          page_id,
          todo_description,
          todo_highlight,
          user_id,
        });
        break;

      case "makeHighlight":
        if (is_valid_prop(todo_id)) {
          todo = await prisma_makeHighlight(todo_id);
        } else {
          res
            .status(400)
            .json(make_json_string({ Error: "Please enter a valid todo id" }));

          return;
        }
        break;

      case "toggleArchive":
        if (!is_valid_prop(todo_id)) {
          res
            .status(400)
            .json(make_json_string({ Error: "Please enter a valid todo id" }));
          return;
        }

        todo = await prisma_toggleArchived(todo_id);
        break;

      case "toggleState":
        if (!is_valid_prop(todo_id)) {
          res
            .status(400)
            .json(make_json_string({ Error: "Please enter a valid todo id" }));
          return;
        }
        console.log("nice");
        todo = await prisma_toggleTodoDone(todo_id);
        break;

      case "updateDescription":
        if (!is_valid_prop(todo_id)) {
          res
            .status(400)
            .json(make_json_string({ Error: "Please enter a valid todo id" }));
          return;
        }
        if (!is_valid_prop(todo_description)) {
          res.status(400).json(
            make_json_string({
              Error: "Please enter a valid todo description",
            })
          );
          return;
        }

        todo = await prisma_updateTodoDescription({
          todo_description,
          todo_id,
        });
        break;

      case "updateDetails":
        if (!is_valid_prop(todo_id)) {
          res
            .status(400)
            .json(make_json_string({ Error: "Please enter a valid todo id" }));
          return;
        }
        if (!is_valid_prop(todo_details)) {
          res.status(400).json(
            make_json_string({
              Error: "Please enter a valid todo details",
            })
          );
          return;
        }

        todo = await prisma_updateTodoDetails({ todo_details, todo_id });
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
