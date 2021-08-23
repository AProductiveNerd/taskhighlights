import type { NextApiRequest, NextApiResponse } from "next";
import { Prisma, Story } from "@prisma/client";
import { Story_Body, Story_and_Todos } from "../../../constants/Types";
import {
  prisma_addTodoToStory,
  prisma_createUpdateStory,
  prisma_deleteStoryByStoryid,
  prisma_getStoryByStoryId,
  prisma_getStoryByStoryTitle,
  prisma_removeTodoFromStory
} from "../../../utils/prismaHelpers";

interface Query {
  story_id?: string;
  story_title?: string;
  story_user_id?: string;
  page_id?: string;
  today?: string;
}

export default async function handler(
  req: NextApiRequest,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  res: NextApiResponse<any>
): Promise<void> {
  const method = req.method;
  const { story_id, story_title, story_user_id, page_id, today }: Query =
    req.query;

  switch (method) {
    case "GET":
      if (story_id) {
        const story: Story_and_Todos = await prisma_getStoryByStoryId(story_id);

        res.status(200).json(JSON.stringify(story));
      } else if (story_title) {
        const story: Story_and_Todos = await prisma_getStoryByStoryTitle(
          story_title,
          story_user_id
        );

        res.status(200).json(JSON.stringify(story));
      } else {
        if (typeof story_user_id === "string") {
          const story: Story = await prisma_createUpdateStory({
            story_user_id,
            today,
            page_id
          });

          res.status(200).json(JSON.stringify(story));
        }
      }

      break;

    case "POST":
      try {
        const body: Story_Body = req.body;

        if (body.task === "add") {
          const story: Story_and_Todos = await prisma_addTodoToStory(body);
          res.status(201).json(JSON.stringify(story));
        } else if (body.task === "remove") {
          const story: Story_and_Todos = await prisma_removeTodoFromStory(body);
          res.status(201).json(JSON.stringify(story));
        } else {
          res.status(501).json(JSON.stringify({ Error: "bad req" }));
        }
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          res.status(409).json(JSON.stringify(e.message));
        }
      }

      break;

    case "DELETE":
      if (story_id) {
        const deletedPage: Story = await prisma_deleteStoryByStoryid(story_id);

        res.status(200).json(JSON.stringify(deletedPage));
      }

      break;
  }
}
