import { Page, Prisma } from ".prisma/client";

import { NextApiResponse } from "next";
import { is_valid_prop } from "../../utils/validationHelpers";
import { make_json_string } from "../../utils/generalHelpers";
import { prisma_createPage } from "../../utils/prismaHelpers";
import { type_Page_Body } from "../../constants/Types";

interface type_page_post_handler {
  body: type_Page_Body;
  res: NextApiResponse<any>;
}

export const page_post_handler = async ({
  body: { page_title, user_id },
  res,
}: type_page_post_handler): Promise<void> => {
  if (!is_valid_prop(page_title)) {
    res.status(400).json({ Error: "Please enter a valid page title" });

    return;
  }

  if (!is_valid_prop(user_id)) {
    res.status(400).json({ Error: "Please enter a valid user id" });

    return;
  }

  try {
    const created_page: Page = await prisma_createPage({ page_title, user_id });

    if (created_page) {
      res.status(200).json(make_json_string(created_page));
    } else {
      res
        .status(400)
        .json(make_json_string({ Error: "Coud not create the page" }));
    }
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(500).json(e.message);
    } else {
      res
        .status(500)
        .json(make_json_string({ Error: "Could not create the page" }));
    }
  }
};
