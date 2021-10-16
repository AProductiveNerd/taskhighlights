import { Page, Prisma } from ".prisma/client";

import { NextApiResponse } from "next";
import { is_valid_prop } from "../../utils/validationHelpers";
import { make_json_string } from "../../utils/generalHelpers";
import { prisma_deletePageByPageid } from "../../utils/prismaHelpers";
import { type_page_query } from "../../types/api/page";

interface type_page_delete_handler {
  query: type_page_query;
  res: NextApiResponse<any>;
}

export const page_delete_handler = async ({
  query: { page_id },
  res
}: type_page_delete_handler): Promise<void> => {
  if (!is_valid_prop(page_id)) {
    res.status(400).json({ Error: "Please enter a valid page title" });

    return;
  }

  try {
    const deletedPage: Page = await prisma_deletePageByPageid(page_id);

    if (deletedPage) {
      res.status(200).json(make_json_string(deletedPage));
    } else {
      res
        .status(404)
        .json(make_json_string({ Error: "Could not delete the page" }));
    }
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(500).json(e.message);
    } else {
      res
        .status(500)
        .json(make_json_string({ Error: "Could not delete the user" }));
    }
  }

  return;
};
