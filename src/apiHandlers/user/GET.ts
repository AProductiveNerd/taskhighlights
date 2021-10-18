import { Prisma, User } from ".prisma/client";

import { NextApiResponse } from "next";
import { is_valid_prop } from "../../utils/validationHelpers";
import { make_json_string } from "../../utils/generalHelpers";
import { prisma_getUserByUserid } from "../../utils/prismaHelpers";
import { type_user_query } from "../../types/api/user";

interface type_user_get_handler {
  query: type_user_query;
  res: NextApiResponse<any>;
}

export const user_get_handler = async ({
  query: { user_id },
  res,
}: type_user_get_handler): Promise<void> => {
  if (!is_valid_prop(user_id)) {
    res.status(400).json({ Error: "Please enter a valid user id" });

    return;
  }

  try {
    const user: User = await prisma_getUserByUserid(user_id);

    if (user) {
      res.status(200).json(make_json_string(user));
    } else {
      res.status(404).json(
        make_json_string({
          Error: "Could not find the user you are looking for",
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
          Error: "Could not fetch the user you are looking for",
        })
      );
    }
  }
};
