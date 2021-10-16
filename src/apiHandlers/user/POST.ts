import { Prisma, User } from ".prisma/client";

import { NextApiResponse } from "next";
import { User_Request_Body } from "../../constants/Types";
import { is_valid_prop } from "../../utils/validationHelpers";
import { make_json_string } from "../../utils/generalHelpers";
import { prisma_createUser } from "../../utils/prismaHelpers";

interface type_user_post_handler {
  body: User_Request_Body;
  res: NextApiResponse<any>;
}

export const user_post_handler = async ({
  body: { user_id, user_avatar, user_email, user_fullname, user_username },
  res
}: type_user_post_handler): Promise<void> => {
  if (!is_valid_prop(user_id)) {
    res.status(400).json({ Error: "Please enter a valid user id" });

    return;
  }

  if (!is_valid_prop(user_username)) {
    res.status(400).json({ Error: "Please enter a valid user username" });

    return;
  }

  if (!is_valid_prop(user_avatar, "object")) {
    res.status(400).json({ Error: "Please enter a valid user_avatar" });

    return;
  }

  if (!is_valid_prop(user_email)) {
    res.status(400).json({ Error: "Please enter a valid user email" });

    return;
  }

  if (!is_valid_prop(user_fullname)) {
    res.status(400).json({ Error: "Please enter a valid user fullname" });

    return;
  }

  try {
    const user: User = await prisma_createUser({
      user_avatar,
      user_email,
      user_fullname,
      user_id,
      user_username
    });
    if (user) {
      res.status(200).json(make_json_string(user));
    } else {
      res.status(404).json(
        make_json_string({
          Error: "Could not create the user"
        })
      );
    }
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(500).json(e.message);
    } else {
      res
        .status(500)
        .json(make_json_string({ Error: "Could not create user" }));
    }
  }

  return;
};
