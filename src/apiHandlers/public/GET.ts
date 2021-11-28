import { NextApiResponse } from "next";
import { Prisma } from "@prisma/client";
import { is_valid_prop } from "../../utils/validationHelpers";
import { make_json_string } from "../../utils/generalHelpers";
import { prisma_getPageByPublicLink } from "../../utils/prismaHelpers";
import { type_public_query } from "../../types/api/public";

interface type_public_get_handler {
  query: type_public_query;
  res: NextApiResponse<any>;
}

export const public_get_handler = async ({
  query: { page_public_link },
  res,
}: type_public_get_handler): Promise<void> => {
  if (is_valid_prop(page_public_link)) {
    try {
      const page = await prisma_getPageByPublicLink(page_public_link);

      if (!page.page_is_public) {
        res
          .status(404)
          .json(
            make_json_string({ Error: "The requested page is not public" })
          );
        return;
      }
      res.status(200).json(make_json_string(page));
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        res.status(400).json(e.message);
      } else {
        res.status(400).json(
          make_json_string({
            Error: "Could not do the operation",
          })
        );
      }
    }
  } else {
    res
      .status(406)
      .json(
        make_json_string({ Error: "Please enter a valid page public link" })
      );
  }
};
