import { Prisma, Todo } from "@prisma/client";

import { NextApiResponse } from "next";
import { is_valid_prop } from "../../utils/validationHelpers";
import { make_json_string } from "../../utils/generalHelpers";
import { prisma_getTodobyTodoId } from "../../utils/prismaHelpers";
import { type_todo_query } from "../../types/api/todo";

interface type_todo_get_handler {
  query: type_todo_query;
  res: NextApiResponse<any>;
}

export const todo_get_handler = async ({
  query: { todo_id },
  res,
}: type_todo_get_handler): Promise<void> => {
  if (!is_valid_prop(todo_id)) {
    res.status(400).json({ Error: "Please enter a valid todo id" });

    return;
  }

  try {
    const todo: Todo = await prisma_getTodobyTodoId(todo_id);

    if (todo) {
      res.status(200).json(make_json_string(todo));
    } else {
      res.status(404).json(
        make_json_string({
          Error: "Could not find the todo you are looking for",
        })
      );
    }

    return;
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(500).json(e.message);
    } else {
      res.status(500).json(
        make_json_string({
          Error: "Could not fetch the todo you are looking for",
        })
      );
    }
  }
};
