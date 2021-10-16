import { Prisma, User } from ".prisma/client";
import {
  prisma_deleteUserbyuserid,
  prisma_deleteUserbyusername
} from "../../utils/prismaHelpers";

import { NextApiResponse } from "next";
import { is_valid_prop } from "../../utils/validationHelpers";
import { make_json_string } from "../../utils/generalHelpers";
import { type_user_query } from "../../types/api/user";

interface type_user_delete_handler {
  query: type_user_query;
  res: NextApiResponse<any>;
}

export const user_delete_handler = async ({
  query: { user_id, user_username },
  res
}: type_user_delete_handler): Promise<void> => {
  let user: User = null;

  try {
    if (is_valid_prop(user_id)) {
      user = await prisma_deleteUserbyuserid(user_id);
    } else if (is_valid_prop(user_username)) {
      user = await prisma_deleteUserbyusername(user_username);
    } else {
      res
        .status(406)
        .json(make_json_string({ Error: "Please enter a valid parameter" }));

      return;
    }
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(500).json(e.message);
    } else {
      res.status(500).json(
        make_json_string({
          Error: "Could not fetch the user you are looking for"
        })
      );
    }
  }

  res.status(200).json(make_json_string(user));

  return;
};
