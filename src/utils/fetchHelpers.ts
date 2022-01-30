import * as TYPES from "../constants/Types";

import { Page, Todo, User } from "@prisma/client";
import {
  indexDB_createTodo,
  indexDB_deleteTodo,
  indexDB_getAllIncompleteTodos,
  indexDB_makeHighlight,
  indexDB_moveTaskToToday,
  indexDB_toggleArchive,
  indexDB_toggleTodoDone,
  indexDB_updateTodoDescription,
} from "./indexDBHelpers";

import { API_V1 } from "../constants/Routes";
import fetch from "node-fetch";
import { is_valid_prop } from "./validationHelpers";
import { make_json_string } from "./generalHelpers";

export const fetch_getUserByUserid = async (
  user_id: TYPES.type_user_id
): Promise<User> => {
  if (user_id && typeof user_id === "string") {
    const data = await fetch(`${API_V1}user?user_id=${user_id}`);

    return data.json() as Promise<User>;
  }
};

export const fetch_createUser = async (
  body: TYPES.type_User_Request_Body
): Promise<User> => {
  const data = await fetch(`${API_V1}user`, {
    method: "POST",
    body: make_json_string(body),
    headers: { "Content-Type": "application/json" },
  });

  return data.json() as Promise<User>;
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

    return data.json() as Promise<TYPES.type_Page_Story_Todos>;
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

    return data.json() as Promise<TYPES.type_Page_and_Todos>;
  }
};

export const fetch_createTodo = async ({
  body,
  _id,
}: {
  body: TYPES.type_Todo_Body;
  _id: TYPES.type_page_title;
}): Promise<TYPES.type_todo_id> => {
  if (body) {
    const todo_id = await indexDB_createTodo({
      body,
      _id,
    });

    return todo_id;
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

    return data.json() as Promise<Todo[]>;
  }
};

export const fetch_toggleTodoDone = async (
  todo_id: TYPES.type_todo_id
): Promise<void> => {
  await indexDB_toggleTodoDone(todo_id);

  fetch(`${API_V1}todo`, {
    method: "POST",
    body: make_json_string({
      task: "toggleState",
      todo_id,
    }),
    headers: { "Content-Type": "application/json" },
  });
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

export const fetch_toggleArchived = async (
  todo_id: TYPES.type_todo_id
): Promise<void> => {
  if (todo_id) {
    await indexDB_toggleArchive(todo_id);

    fetch(`${API_V1}todo`, {
      method: "POST",
      body: make_json_string({
        task: "toggleArchive",
        todo_id,
      }),
      headers: { "Content-Type": "application/json" },
    });
  }
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

    return data.json() as Promise<TYPES.type_Story_and_Todos>;
  }
};

export const fetch_addTodoToStory = async ({
  story_id,
  todo_id,
}: TYPES.type_Story_Body): Promise<TYPES.type_Story_and_Todos> => {
  const data = await fetch(`${API_V1}story`, {
    method: "POST",
    body: make_json_string({
      todo_id,
      story_id,
      task: "add",
    }),
    headers: { "Content-Type": "application/json" },
  });

  return data.json() as Promise<TYPES.type_Story_and_Todos>;
};

export const fetch_removeTodoFromStory = async ({
  story_id,
  todo_id,
}: TYPES.type_Story_Body): Promise<TYPES.type_Story_and_Todos> => {
  const data = await fetch(`${API_V1}story`, {
    method: "POST",
    body: make_json_string({
      todo_id,
      story_id,
      task: "remove",
    }),
    headers: { "Content-Type": "application/json" },
  });

  return data.json() as Promise<TYPES.type_Story_and_Todos>;
};

export const fetch_getAllIncompleteTodos = async (): Promise<Todo[]> => {
  return await indexDB_getAllIncompleteTodos();
};

export const fetch_getAllPageNamesByUserid = async (
  user_id: TYPES.type_user_id
): Promise<TYPES.type_page_title[]> => {
  if (user_id && typeof user_id === "string") {
    const data = await fetch(`${API_V1}allPages?user_id=${user_id}&work=names`);

    return data.json() as Promise<TYPES.type_page_title[]>;
  }
};

export const fetch_getAllArchivedTodos = async (
  user_id: TYPES.type_user_id
): Promise<Todo[]> => {
  if (is_valid_prop(user_id)) {
    const data = await fetch(
      `${API_V1}allTodos?user_id=${user_id}&work=archived`
    );

    return data.json() as Promise<Todo[]>;
  }
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
      body: make_json_string({
        task: "updateDetails",
        todo_id,
        todo_details,
      }),
      headers: { "Content-Type": "application/json" },
    });

    return data.json() as Promise<Todo>;
  }
};

export const fetch_moveTasksToToday = async (todo_id: TYPES.type_todo_id) => {
  if (todo_id) {
    await indexDB_moveTaskToToday(todo_id);
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
      page: data.json() as Promise<TYPES.type_Page_Username_Todos>,
      ok: data.ok,
    };
  }
};

export const fetch_getPageByPublicLinkNOCHECK = async (
  public_link: string
): Promise<TYPES.type_Page_and_Todos> => {
  if (public_link) {
    const data = await fetch(`${API_V1}page?page_public_link=${public_link}`);
    return data.json() as Promise<TYPES.type_Page_and_Todos>;
  }
};

export const fetch_changePageIsPublicByPublicLink = async (
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
