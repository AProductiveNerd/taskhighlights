import type { NextApiRequest, NextApiResponse } from "next";

import { make_json_string } from "../../../utils/generalHelpers";
import { todo_delete_handler } from "../../../apiHandlers/todo/DELETE";
import { todo_get_handler } from "../../../apiHandlers/todo/GET";
import { todo_post_handler } from "../../../apiHandlers/todo/POST";
import { todo_put_handler } from "../../../apiHandlers/todo/PUT";
import { type_Todo_Body } from "../../../constants/Types";
import { type_todo_query } from "../../../types/api/todo";

export default function handler(
  req: NextApiRequest,

  res: NextApiResponse<any>
): void {
  const method = req.method;
  const query: type_todo_query = req.query;

  switch (method) {
    case "GET":
      todo_get_handler({ query, res });
      break;

    case "POST": {
      const body: type_Todo_Body = req.body;
      todo_post_handler({ body, res });
      break;
    }

    case "PUT": {
      const body: type_Todo_Body = req.body;
      todo_put_handler({ body, res });
      break;
    }

    case "DELETE":
      todo_delete_handler({ query, res });
      break;

    default:
      res
        .status(406)
        .json(make_json_string({ Error: "Method is not allowed" }));
      break;
  }
}
