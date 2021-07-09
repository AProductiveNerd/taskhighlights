import { Todo, User } from "@prisma/client";
import fetch from "node-fetch";
import { API_V1 } from "../constants/Routes";
import { Page_and_Todos, Todo_Body, User_Body } from "./prismaHelpers";

export const fetchUserFromUserid = async (user_id: string): Promise<User> => {
  const data = await fetch(`${API_V1}user?user_id=${user_id}`);
  return data.json();
};

export const CreateUser = async (body: User_Body): Promise<User> => {
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
  user_id: string
): Promise<Page_and_Todos> => {
  const today: string = new Date().toLocaleDateString("en-GB");

  const data = await fetch(
    `${API_V1}page?page_user_id=${user_id}&today=${today}`
  );

  return data.json();
};

export const createTask = async (body: Todo_Body): Promise<Todo> => {
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
  page_id: string,
  user_id: string
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
  todo_id: string;
  todo_done: boolean;
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
  todo_id: string;
  todo_description: string;
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

export const deleteTodo = async (todo_id: string): Promise<Todo> => {
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
  todo_id: string;
  todo_archived: boolean;
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
