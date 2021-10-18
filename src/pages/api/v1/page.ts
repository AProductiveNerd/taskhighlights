import type { NextApiRequest, NextApiResponse } from "next";

import { make_json_string } from "../../../utils/generalHelpers";
import { page_delete_handler } from "../../../apiHandlers/page/DELETE";
import { page_get_handler } from "../../../apiHandlers/page/GET";
import { page_post_handler } from "../../../apiHandlers/page/POST";
import { type_Page_Body } from "../../../constants/Types";
import { type_page_query } from "../../../types/api/page";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
): void {
  const method = req.method;
  const query: type_page_query = req.query;

  switch (method) {
    case "GET":
      page_get_handler({ query, res });
      break;

    case "POST": {
      const body: type_Page_Body = req.body;

      page_post_handler({ body, res });
      break;
    }

    case "DELETE":
      page_delete_handler({ query, res });
      break;

    default:
      res
        .status(406)
        .json(make_json_string({ Error: "Method is not allowed" }));
      break;
  }
}
