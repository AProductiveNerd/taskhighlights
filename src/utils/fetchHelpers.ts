import { Todo, User } from "@prisma/client";
import fetch from "node-fetch";
import { API_V1 } from "../constants/Routes";
import * as TYPES from "../constants/Types";

export const fetchUserFromUserid = async (
  user_id: TYPES.user_id
): Promise<User> => {
  const data = await fetch(`${API_V1}user?user_id=${user_id}`);
  return data.json();
};

export const CreateUser = async (
  body: TYPES.User_Request_Body
): Promise<User> => {
  if (body) {
    const data = await fetch(`${API_V1}user`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    });
    return data.json();
  }
};

export const fetchPageRet = async (
  user_id: TYPES.user_id,
  today: TYPES.page_title
): Promise<TYPES.Page_Story_Todos> => {
  const data = await fetch(
    `${API_V1}page?page_user_id=${user_id}&today=${today}`
  );

  return data.json();
};

export const createTask = async (body: TYPES.Todo_Body): Promise<Todo> => {
  if (body) {
    const data = await fetch(`${API_V1}todo`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    });

    return data.json();
  }
};

export const fetchAllTodosByPage = async (
  page_id: TYPES.page_id,
  user_id: TYPES.user_id
): Promise<Todo[]> => {
  const data = await fetch(
    `${API_V1}allTodos?page_id=${page_id}&user_id=${user_id}`
  );

  return data.json();
};

export const toggleTodoState = async ({
  todo_id,
  todo_done
}: {
  todo_id: TYPES.todo_id;
  todo_done: TYPES.todo_done;
}): Promise<Todo> => {
  const data = await fetch(`${API_V1}todo`, {
    method: "POST",
    body: JSON.stringify({
      task: "toggleState",
      todo_id,
      todo_done: !todo_done
    }),
    headers: { "Content-Type": "application/json" }
  });

  return data.json();
};

export const updateTodoDescription = async ({
  todo_id,
  todo_description
}: {
  todo_id: TYPES.todo_id;
  todo_description: TYPES.todo_description;
}): Promise<Todo> => {
  if (todo_id && todo_description) {
    const data = await fetch(`${API_V1}todo`, {
      method: "POST",
      body: JSON.stringify({
        task: "updateDescription",
        todo_id,
        todo_description
      }),
      headers: { "Content-Type": "application/json" }
    });

    return data.json();
  }
};

export const deleteTodo = async (todo_id: TYPES.todo_id): Promise<Todo> => {
  if (todo_id) {
    const data = await fetch(`${API_V1}todo?todo_id=${todo_id}`, {
      method: "DELETE"
    });

    return data.json();
  }
};

export const toggleArchiveState = async ({
  todo_id,
  todo_archived
}: {
  todo_id: TYPES.todo_id;
  todo_archived: TYPES.todo_archived;
}): Promise<Todo> => {
  const data = await fetch(`${API_V1}todo`, {
    method: "POST",
    body: JSON.stringify({
      task: "toggleArchive",
      todo_id,
      todo_archived
    }),
    headers: { "Content-Type": "application/json" }
  });

  return data.json();
};

export const getStoryById = async (
  story_id: TYPES.story_id
): Promise<TYPES.Story_and_Todos> => {
  const data = await fetch(`${API_V1}story?story_id=${story_id}`);

  return data.json();
};

export const addTaskToStory = async ({
  story_id,
  todo_id
}: TYPES.Story_Body): Promise<TYPES.Story_and_Todos> => {
  console.log("add story", story_id);
  const data = await fetch(`${API_V1}story`, {
    method: "POST",
    body: JSON.stringify({
      todo_id,
      story_id,
      task: "add"
    }),
    headers: { "Content-Type": "application/json" }
  });

  return data.json();
};

export const removeTaskFromStory = async ({
  story_id,
  todo_id
}: TYPES.Story_Body): Promise<TYPES.Story_and_Todos> => {
  const data = await fetch(`${API_V1}story`, {
    method: "POST",
    body: JSON.stringify({
      todo_id,
      story_id,
      task: "remove"
    }),
    headers: { "Content-Type": "application/json" }
  });

  return data.json();
};
