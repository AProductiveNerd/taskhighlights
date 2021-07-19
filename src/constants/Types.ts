import { Page, Story } from "@prisma/client";

export type ChildrenProps = {
  children: React.ReactNode;
};

/*
  User Model Types
*/
export type user_id = string;
export type user_email = string;
export type user_username = string;
export type user_avatar = string;
export type user_fullname = string;

/*
  Page Model Types
*/
export type page_id = string;
export type page_title = string;

/*
  Todo Model Types
*/
export type todo_id = string;
export type todo_description = string;
export type todo_done = boolean;
export type todo_archived = boolean;
export type todo_highlight = boolean;

/*
  Story Model Types
*/
export type story_id = string;
export type story_title = string;

/*
  Fetch Request Task Types
*/
export type Story_Body_Task = "add" | "remove";
export type Todo_Body_Task =
  | "toggleState"
  | "updateDescription"
  | "toggleArchive"
  | "create";

/*
  Fetch Request Types
*/
export interface User_Request_Body {
  user_avatar: user_avatar;
  user_email: user_email;
  user_fullname: user_fullname;
  user_username: user_username;
  user_id: user_id;
}

export interface Page_Body {
  page_title: page_title;
  user_id: user_id;
}
export interface Story_Body {
  todo_id: todo_id;
  story_id: story_id;
  task?: Story_Body_Task;
}

export interface Todo_Body {
  todo_description?: todo_description;
  user_id: user_id;
  page_id: page_id;
  task: Todo_Body_Task;
  todo_highlight: todo_highlight;
  todo_id?: todo_id;
  todo_done?: todo_done;
  todo_archived?: todo_archived;
}

export interface Useful_Todo {
  todo_archived: todo_archived;
  todo_description: todo_description;
  todo_done: todo_done;
  todo_highlight: todo_highlight;
  todo_id: todo_id;
  todo_story_id: story_id;
}

export type Page_Story_Todos = Page & {
  Page_Story: Story;
  Page_Todo: Useful_Todo[];
};

export type Story_and_Todos = Story & {
  Story_Todo: Useful_Todo[];
};

/*
  Useful_Todo include object
*/
export const Useful_Todo_Include_Object = {
  todo_description: true,
  todo_done: true,
  todo_id: true,
  todo_story_id: true,
  todo_highlight: true,
  todo_archived: true,
  Todo_Page: false,
  Todo_User: false,
  todo_datecreated: false,
  todo_page_id: false,
  todo_user_id: false
};
