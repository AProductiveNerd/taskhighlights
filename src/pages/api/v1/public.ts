import type { NextApiRequest, NextApiResponse } from "next";

import { make_json_string } from "../../../utils/generalHelpers";
import { public_get_handler } from "../../../apiHandlers/public/GET";
import { public_put_handler } from "../../../apiHandlers/public/PUT";
import { type_public_query } from "../../../types/api/public";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
): void {
  const method = req.method;
  const query: type_public_query = req.query;

  switch (method) {
    case "GET":
      public_get_handler({ query, res });
      break;

    case "PUT":
      public_put_handler({ query, res });
      break;

    default:
      res
        .status(406)
        .json(make_json_string({ Error: "Method is not allowed" }));
      break;
  }
}
