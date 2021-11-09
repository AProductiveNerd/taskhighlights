import { Page, Prisma } from ".prisma/client";
import { isDailyPage, make_json_string } from "../../utils/generalHelpers";
import {
  prisma_createRetDailyPage,
  prisma_createRetPageByTitle,
  prisma_getPageByPageTitle,
  prisma_getPageByPageid,
  prisma_getPageByPublicLink,
} from "../../utils/prismaHelpers";

import { NextApiResponse } from "next";
import { is_valid_prop } from "../../utils/validationHelpers";
import { type_Page_Story_Todos } from "../../constants/Types";
import { type_page_query } from "../../types/api/page";

interface type_page_get_handler {
  query: type_page_query;
  res: NextApiResponse<any>;
}

export const page_get_handler = async ({
  query: { page_id, page_title, page_user_id, today, page_public_link },
  res,
}: type_page_get_handler): Promise<void> => {
  let page: Page | type_Page_Story_Todos = null;

  try {
    if (is_valid_prop(page_id)) {
      page = await prisma_getPageByPageid(page_id);
    } else if (is_valid_prop(page_title) && is_valid_prop(page_user_id)) {
      page = await prisma_getPageByPageTitle(page_title, page_user_id);
    } else if (is_valid_prop(today)) {
      if (isDailyPage(today)) {
        page = await prisma_createRetDailyPage(page_user_id, today);
      } else {
        page = await prisma_createRetPageByTitle(page_user_id, today);
      }
    } else if (is_valid_prop(page_public_link)) {
      page = await prisma_getPageByPublicLink(page_public_link);
    } else {
      res
        .status(406)
        .json(make_json_string({ Error: "Please enter valid parameters" }));

      return;
    }
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(500).json(e.message);
    } else {
      res.status(500).json(
        make_json_string({
          Error: "Could not do the operation",
        })
      );
    }

    return;
  }
  if (!page) {
    res
      .status(404)
      .json(make_json_string({ Error: "Could not find the page" }));
    return;
  }

  res.status(200).json(make_json_string(page));
};
