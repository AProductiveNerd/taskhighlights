import * as TYPES from "../constants/Types";

import { Page, Prisma, Template, Todo, User } from "@prisma/client";
import {
  indexDB_createTodo,
  indexDB_deleteTodo,
  indexDB_makeHighlight,
  indexDB_toggleTodoDone,
  indexDB_updateTodoDescription,
} from "./indexDBHelpers";

import { API_V1 } from "../constants/Routes";
import fetch from "node-fetch";
import { type_Useful_Habit } from "./../constants/Types";

export const fetch_getUserByUserid = async (
  user_id: TYPES.type_user_id
): Promise<User> => {
  if (user_id && typeof user_id === "string") {
    const data = await fetch(`${API_V1}user?user_id=${user_id}`);

    return data.json();
  }
};

export const fetch_createUser = async (
  body: TYPES.type_User_Request_Body
): Promise<User> => {
  const data = await fetch(`${API_V1}user`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });

  return data.json();
};

export const fetch_createRetDailyPage = async (
  user_id: TYPES.type_user_id,
  today: TYPES.type_page_title
): Promise<TYPES.type_Page_Story_Todos> => {
  if (
    user_id &&
    typeof user_id === "string" &&
    today &&
    typeof today === "string"
  ) {
    const data = await fetch(
      `${API_V1}page?page_user_id=${user_id}&today=${today}`
    );

    return data.json();
  }
};

export const fetch_createRetPageByTitle = async (
  user_id: TYPES.type_user_id,
  title: TYPES.type_page_title
): Promise<TYPES.type_Page_and_Todos> => {
  if (
    user_id &&
    typeof user_id === "string" &&
    title &&
    typeof title === "string"
  ) {
    const data = await fetch(
      `${API_V1}page?page_user_id=${user_id}&today=${title}`
    );

    return data.json();
  }
};

export const fetch_createTodo = async ({
  body,
  _id,
}: {
  body: TYPES.type_Todo_Body;
  _id: TYPES.type_page_title;
}): Promise<void> => {
  if (body) {
    await indexDB_createTodo({
      body,
      _id,
    });
  }
};

export const fetch_getAllTodosByPage = async (
  page_id: TYPES.type_page_id,
  user_id: TYPES.type_user_id
): Promise<Todo[]> => {
  if (
    page_id &&
    typeof page_id === "string" &&
    user_id &&
    typeof user_id === "string"
  ) {
    const data = await fetch(
      `${API_V1}allTodos?page_id=${page_id}&user_id=${user_id}`
    );

    return data.json();
  }
};

export const fetch_toggleTodoDone = async (
  todo_id: TYPES.type_todo_id
): Promise<void> => {
  await indexDB_toggleTodoDone(todo_id);
};

export const fetch_updateTodoDescription = async ({
  todo_id,
  todo_description,
}: {
  todo_id: TYPES.type_todo_id;
  todo_description: TYPES.type_todo_description;
}): Promise<void> => {
  if (todo_id && todo_description) {
    await indexDB_updateTodoDescription({
      todo_id,
      todo_description,
    });
  }
};

export const fetch_deleteTodo = async (
  todo_id: TYPES.type_todo_id
): Promise<void> => {
  if (todo_id) {
    await indexDB_deleteTodo(todo_id);
  }
};

export const fetch_toggleArchived = async ({
  todo_id,
  todo_archived,
}: {
  todo_id: TYPES.type_todo_id;
  todo_archived: TYPES.type_todo_archived;
}): Promise<Todo> => {
  const data = await fetch(`${API_V1}todo`, {
    method: "POST",
    body: JSON.stringify({
      task: "toggleArchive",
      todo_id,
      todo_archived,
    }),
    headers: { "Content-Type": "application/json" },
  });

  return data.json();
};

export const fetch_makeHighlight = async (
  todo_id: TYPES.type_todo_id
): Promise<void> => {
  await indexDB_makeHighlight(todo_id);
};

export const fetch_getStoryByStoryId = async (
  story_id: TYPES.type_story_id
): Promise<TYPES.type_Story_and_Todos> => {
  if (story_id && typeof story_id === "string") {
    const data = await fetch(`${API_V1}story?story_id=${story_id}`);

    return data.json();
  }
};

export const fetch_addTodoToStory = async ({
  story_id,
  todo_id,
}: TYPES.type_Story_Body): Promise<TYPES.type_Story_and_Todos> => {
  const data = await fetch(`${API_V1}story`, {
    method: "POST",
    body: JSON.stringify({
      todo_id,
      story_id,
      task: "add",
    }),
    headers: { "Content-Type": "application/json" },
  });

  return data.json();
};

export const fetch_removeTodoFromStory = async ({
  story_id,
  todo_id,
}: TYPES.type_Story_Body): Promise<TYPES.type_Story_and_Todos> => {
  const data = await fetch(`${API_V1}story`, {
    method: "POST",
    body: JSON.stringify({
      todo_id,
      story_id,
      task: "remove",
    }),
    headers: { "Content-Type": "application/json" },
  });

  return data.json();
};

export const fetch_getAllIncompleteTodosByPage = async (
  user_id: TYPES.type_user_id
): Promise<TYPES.type_Useful_Todo[]> => {
  if (user_id && typeof user_id === "string") {
    const data = await fetch(
      `${API_V1}allTodos?user_id=${user_id}&work=incomplete`
    );

    return data.json();
  }
};

export const fetch_getAllPageNamesByUserid = async (
  user_id: TYPES.type_user_id
): Promise<TYPES.type_page_title[]> => {
  if (user_id && typeof user_id === "string") {
    const data = await fetch(`${API_V1}allPages?user_id=${user_id}&work=names`);

    return data.json();
  }
};

export const fetch_getAllArchivedTodosByPage = async (
  user_id: TYPES.type_user_id
): Promise<TYPES.type_Useful_Todo[]> => {
  if (user_id && typeof user_id === "string") {
    const data = await fetch(
      `${API_V1}allTodos?user_id=${user_id}&work=archived`
    );

    return data.json();
  }
};

export const fetch_createRetDailyRoutine = async (
  user_id: TYPES.type_user_id,
  today: TYPES.type_page_title
): Promise<TYPES.type_Routine_and_Habits> => {
  if (
    user_id &&
    typeof user_id === "string" &&
    today &&
    typeof today === "string"
  ) {
    const data = await fetch(
      `${API_V1}routine?routine_user_id=${user_id}&today=${today}`
    );

    return data.json();
  }
};

export const fetch_createHabit = async (
  body: TYPES.Habit_Body
): Promise<TYPES.type_Useful_Habit> => {
  if (body) {
    const data = await fetch(`${API_V1}habit`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });

    return data.json();
  }
};

export const fetch_toggleHabitDone = async ({
  habit_id,
  habit_done,
}: {
  habit_id: TYPES.type_habit_id;
  habit_done: TYPES.type_habit_done;
}): Promise<type_Useful_Habit> => {
  const data = await fetch(`${API_V1}habit`, {
    method: "POST",
    body: JSON.stringify({
      task: "toggleState",
      habit_id,
      habit_done: !habit_done,
    }),
    headers: { "Content-Type": "application/json" },
  });

  return data.json();
};

export const fetch_createTemplate = async (
  body: TYPES.type_Create_Template_Body
): Promise<Template> => {
  const data = await fetch(`${API_V1}template`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });

  return data.json();
};

export const fetch_getAllUserTemplates = async (
  user_id: TYPES.type_user_id
): Promise<Template[]> => {
  if (user_id && typeof user_id === "string") {
    const data = await fetch(
      `${API_V1}allTemplates?template_user_id=${user_id}`
    );

    return data.json();
  }
};

export const fetch_addHabitToTemplate = async ({
  habit_description,
  template_id,
}: TYPES.type_Template_Query): Promise<Template> => {
  const data = await fetch(
    `${API_V1}template?habit_description=${habit_description}&template_id=${template_id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    }
  );

  return data.json();
};

export const fetch_createManyHabit = async ({
  template_id,
  routine_id,
  user_id,
}: {
  user_id: TYPES.type_user_id;
  routine_id: TYPES.type_routine_id;
  template_id: TYPES.type_template_id;
}): Promise<Prisma.BatchPayload> => {
  const data = await fetch(`${API_V1}habit`, {
    method: "POST",
    body: JSON.stringify({
      template_id,
      routine_id,
      user_id,
      task: "createMany",
    }),

    headers: { "Content-Type": "application/json" },
  });

  return data.json();
};

export const fetch_updateTodoDetails = async ({
  todo_id,
  todo_details,
}: {
  todo_id: TYPES.type_todo_id;
  todo_details: TYPES.type_todo_details;
}): Promise<Todo> => {
  if (todo_id && todo_details) {
    const data = await fetch(`${API_V1}todo`, {
      method: "POST",
      body: JSON.stringify({
        task: "updateDetails",
        todo_id,
        todo_details,
      }),
      headers: { "Content-Type": "application/json" },
    });

    return data.json();
  }
};

export const fetch_moveTasksToToday = async ({
  todo_id,
  today,
  user_id,
}: {
  todo_id: TYPES.type_todo_id;
  today: TYPES.type_page_title;
  user_id: TYPES.type_user_id;
}) => {
  if (todo_id && today && user_id) {
    const data = await fetch(`${API_V1}todo`, {
      method: "PUT",
      body: JSON.stringify({
        put_task: "single",
        user_id,
        todo_id,
        today,
      }),
      headers: { "Content-Type": "application/json" },
    });

    return data.json();
  }
};

export const fetch_getPageByPublicLink = async (
  public_link: string
): Promise<{
  page: Promise<TYPES.type_Page_Username_Todos>;
  ok: boolean;
}> => {
  if (public_link) {
    const data = await fetch(`${API_V1}public?page_public_link=${public_link}`);
    return {
      page: data.json(),
      ok: data.ok,
    };
  }
};

export const fetch_getPageByPublicLinkNOCHECK = async (
  public_link: string
): Promise<TYPES.type_Page_and_Todos> => {
  if (public_link) {
    const data = await fetch(`${API_V1}page?page_public_link=${public_link}`);
    return data.json();
  }
};

export const fetch_changePagePublic = async (
  public_link: TYPES.type_page_public_link,
  is_public: TYPES.type_page_is_public
): Promise<Page> => {
  if (public_link) {
    const data = await fetch(
      `${API_V1}public?page_public_link=${public_link}&page_is_public=${is_public}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      }
    );

    return data.json();
  }
};
