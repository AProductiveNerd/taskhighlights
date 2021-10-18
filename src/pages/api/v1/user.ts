import type { NextApiRequest, NextApiResponse } from "next";

import { make_json_string } from "../../../utils/generalHelpers";
import { type_User_Request_Body } from "../../../constants/Types";
import { type_user_query } from "../../../types/api/user";
import { user_delete_handler } from "../../../apiHandlers/user/DELETE";
import { user_get_handler } from "../../../apiHandlers/user/GET";
import { user_post_handler } from "../../../apiHandlers/user/POST";

export default function handler(
  req: NextApiRequest,

  res: NextApiResponse<any>
): void {
  const method = req.method;
  const query: type_user_query = req.query;

  switch (method) {
    case "GET":
      user_get_handler({ query, res });
      break;

    case "POST": {
      const body: type_User_Request_Body = req.body;

      user_post_handler({ body, res });
      break;
    }

    case "DELETE":
      user_delete_handler({ query, res });
      break;

    default:
      res
        .status(406)
        .json(make_json_string({ Error: "Method is not allowed" }));
      break;
  }
}
