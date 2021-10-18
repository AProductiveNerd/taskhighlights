import { NextApiResponse } from "next";
import { Prisma } from ".prisma/client";
import { is_valid_prop } from "../../utils/validationHelpers";
import { make_json_string } from "../../utils/generalHelpers";
import { prisma_moveTasks } from "../../utils/prismaHelpers";
import { type_todo_query } from "../../types/api/todo";

interface type_todo_put_handler {
  query: type_todo_query;
  res: NextApiResponse<any>;
}

export const todo_put_handler = async ({
  query: { new_page_id, old_page_id },
  res,
}: type_todo_put_handler): Promise<void> => {
  if (!is_valid_prop(old_page_id)) {
    res.status(400).json({ Error: "Please enter a valid old page id" });

    return;
  }

  if (!is_valid_prop(new_page_id)) {
    res.status(400).json({ Error: "Please enter a valid new page id" });

    return;
  }

  try {
    const todos: Prisma.BatchPayload = await prisma_moveTasks({
      new_page_id,
      old_page_id,
    });

    if (todos) {
      res.status(200).json(make_json_string(todos));
    } else {
      res.status(404).json(
        make_json_string({
          Error: "Could not move the todos",
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
          Error: "Could not move the todos",
        })
      );
    }
  }
};
