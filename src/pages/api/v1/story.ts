import {
  addTodoToStory,
  Story_and_Todos,
  Story_Body
} from "./../../../utils/prismaHelpers";
import { Prisma, Story } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  createUpdateStory,
  deleteStoryByStoryid,
  deleteStoryByStoryTitle,
  getStoryByStoryId,
  getStoryByStoryTitle
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

  if (method === "GET") {
    if (story_id) {
      const story: Story = await getStoryByStoryId(story_id);

      res.status(200).json(story);
    } else if (story_title) {
      console.log("yeah that worked");
      const story: Story_and_Todos = await getStoryByStoryTitle(
        story_title,
        story_user_id
      );

      res.status(200).json(story);
    } else {
      if (typeof story_user_id === "string") {
        const story: Story = await createUpdateStory({
          story_user_id,
          today,
          page_id
        });

        res.status(200).json(story);
      }
    }
  } else if (method === "POST") {
    try {
      const body: Story_Body = req.body;

      const story: Story_and_Todos = await addTodoToStory(body);

      res.status(201).json(story);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        res.status(409).json(e.message);
      }
    }
  } else if (method === "DELETE") {
    if (story_id) {
      const deletedPage: Story = await deleteStoryByStoryid(story_id);

      res.status(200).json(deletedPage);
    } else if (story_title) {
      const deletedPage: Story = await deleteStoryByStoryTitle(
        story_title,
        story_user_id
      );

      res.status(200).json(deletedPage);
    }
  }
}
