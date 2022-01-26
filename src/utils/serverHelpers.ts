import * as TYPES from "../constants/Types";

import { Page, Todo } from "@prisma/client";

import { API_V1 } from "../constants/Routes";
import fetch from "node-fetch";

export const server_createRetDailyPage = async (
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

    return data.json() as Promise<TYPES.type_Page_Story_Todos>;
  }
};

export const server_createRetPageByTitle = async (
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

    return data.json() as Promise<TYPES.type_Page_and_Todos>;
  }
};

export const server_createTodo = async (
  body: TYPES.type_Todo_Body
): Promise<Todo> => {
  if (body) {
    const data = await fetch(`${API_V1}todo`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });

    return data.json() as Promise<Todo>;
  }
};

export const server_getAllTodosByPage = async (
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

    return data.json() as Promise<Todo[]>;
  }
};

export const server_toggleTodoDone = async (
  todo_id: TYPES.type_todo_id
): Promise<Todo> => {
  const data = await fetch(`${API_V1}todo`, {
    method: "POST",
    body: JSON.stringify({
      task: "toggleState",
      todo_id,
    }),
    headers: { "Content-Type": "application/json" },
  });

  return data.json() as Promise<Todo>;
};

export const server_updateTodoDescription = async ({
  todo_id,
  todo_description,
}: {
  todo_id: TYPES.type_todo_id;
  todo_description: TYPES.type_todo_description;
}): Promise<Todo> => {
  if (todo_id && todo_description) {
    const data = await fetch(`${API_V1}todo`, {
      method: "POST",
      body: JSON.stringify({
        task: "updateDescription",
        todo_id,
        todo_description,
      }),
      headers: { "Content-Type": "application/json" },
    });

    return data.json() as Promise<Todo>;
  }
};

export const server_deleteTodo = async (
  todo_id: TYPES.type_todo_id
): Promise<Todo> => {
  if (todo_id) {
    const data = await fetch(`${API_V1}todo?todo_id=${todo_id}`, {
      method: "DELETE",
    });

    return data.json() as Promise<Todo>;
  }
};

export const server_toggleArchived = async (
  todo_id: TYPES.type_todo_id
): Promise<Todo> => {
  const data = await fetch(`${API_V1}todo`, {
    method: "POST",
    body: JSON.stringify({
      task: "toggleArchive",
      todo_id,
    }),
    headers: { "Content-Type": "application/json" },
  });

  return data.json() as Promise<Todo>;
};

export const server_makeHighlight = async (
  todo_id: TYPES.type_todo_id
): Promise<Todo> => {
  const data = await fetch(`${API_V1}todo`, {
    method: "POST",
    body: JSON.stringify({
      task: "makeHighlight",
      todo_id,
    }),
    headers: { "Content-Type": "application/json" },
  });

  return data.json() as Promise<Todo>;
};

export const server_getStoryByStoryId = async (
  story_id: TYPES.type_story_id
): Promise<TYPES.type_Story_and_Todos> => {
  if (story_id && typeof story_id === "string") {
    const data = await fetch(`${API_V1}story?story_id=${story_id}`);

    return data.json() as Promise<TYPES.type_Story_and_Todos>;
  }
};

export const server_addTodoToStory = async ({
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

  return data.json() as Promise<TYPES.type_Story_and_Todos>;
};

export const server_removeTodoFromStory = async ({
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

  return data.json() as Promise<TYPES.type_Story_and_Todos>;
};

export const server_getAllIncompleteTodosByPage = async (
  user_id: TYPES.type_user_id
): Promise<Todo[]> => {
  if (user_id && typeof user_id === "string") {
    const data = await fetch(
      `${API_V1}allTodos?user_id=${user_id}&work=incomplete`
    );

    return data.json() as Promise<Todo[]>;
  }
};

export const server_getAllPageNamesByUserid = async (
  user_id: TYPES.type_user_id
): Promise<TYPES.type_page_title[]> => {
  if (user_id && typeof user_id === "string") {
    const data = await fetch(`${API_V1}allPages?user_id=${user_id}&work=names`);

    return data.json() as Promise<TYPES.type_page_title[]>;
  }
};

export const server_getAllArchivedTodosByPage = async (
  user_id: TYPES.type_user_id
): Promise<Todo[]> => {
  if (user_id && typeof user_id === "string") {
    const data = await fetch(
      `${API_V1}allTodos?user_id=${user_id}&work=archived`
    );

    return data.json() as Promise<Todo[]>;
  }
};

export const server_updateTodoDetails = async ({
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

    return data.json() as Promise<Todo>;
  }
};

export const server_moveTasksToToday = async ({
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

export const server_getPageByPublicLink = async (
  public_link: string
): Promise<{
  page: Promise<TYPES.type_Page_Username_Todos>;
  ok: boolean;
}> => {
  if (public_link) {
    const data = await fetch(`${API_V1}public?page_public_link=${public_link}`);
    return {
      page: data.json() as Promise<TYPES.type_Page_Username_Todos>,
      ok: data.ok,
    };
  }
};

export const server_getPageByPublicLinkNOCHECK = async (
  public_link: string
): Promise<TYPES.type_Page_and_Todos> => {
  if (public_link) {
    const data = await fetch(`${API_V1}page?page_public_link=${public_link}`);
    return data.json() as Promise<TYPES.type_Page_and_Todos>;
  }
};

export const server_changePagePublic = async (
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

    return data.json() as Promise<Page>;
  }
};
