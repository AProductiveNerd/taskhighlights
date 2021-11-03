import { Dispatch, SetStateAction } from "react";
import { Page, Routine, Story, User } from "@prisma/client";

import { AvatarConfig } from "react-nice-avatar";

export type ChildrenProps = {
  children: React.ReactNode;
};

/**
 * cuid
 */
export type cuid = string;

/**
 * User Model Types
 */
export type type_user_id = string;
export type type_user_email = string;
export type type_user_username = string;
export type type_user_avatar = AvatarConfig;
export type type_user_fullname = string;
export type type_user_bio = string | null;
export type type_user_followers = string[];
export type type_user_following = string[];

/**
 * Page Model Types
 */
export type type_page_id = string;
export type type_page_title = string;

/**
 * Routine Model Types
 */
export type type_routine_id = string;
export type type_routine_title = string;

/**
 * Todo Model Types
 */
export type type_todo_id = string;
export type type_todo_description = string;
export type type_todo_done = boolean;
export type type_todo_archived = boolean;
export type type_todo_highlight = boolean;
export type type_todo_details = string;

/**
 * Habit Model Types
 */
export type type_habit_id = string;
export type type_habit_description = string;
export type type_habit_done = boolean;

/**
 * Story Model Types
 */
export type type_story_id = string;
export type type_story_title = string;

/**
 * Fetch Request Task Types
 */
export type type_Story_Body_Task = "add" | "remove";
export type type_Todo_Body_Task =
  | "toggleState"
  | "updateDescription"
  | "toggleArchive"
  | "makeHighlight"
  | "create"
  | "updateDetails";

export type type_Habit_Body_Task = "toggleState" | "create" | "createMany";

/**
 * Fetch Request Types
 */
export interface type_User_Request_Body {
  user_avatar: type_user_avatar;
  user_email: type_user_email;
  user_fullname: type_user_fullname;
  user_username: type_user_username;
  user_id: type_user_id;
}

export interface type_Page_Body {
  page_title: type_page_title;
  user_id: type_user_id;
}

export interface type_Routine_Body {
  routine_title: type_routine_title;
  user_id: type_user_id;
}

export interface type_Story_Body {
  todo_id: type_todo_id;
  story_id: type_story_id;
  task?: type_Story_Body_Task;
}

export interface type_Todo_Body {
  todo_description?: type_todo_description;
  user_id?: type_user_id;
  page_id?: type_page_id;
  task?: type_Todo_Body_Task;
  todo_highlight?: type_todo_highlight;
  todo_id?: type_todo_id;
  todo_done?: type_todo_done;
  todo_archived?: type_todo_archived;
  todo_details?: type_todo_details;
  old_page_id?: type_page_id;
  new_page_id?: type_page_id;
  today?: type_page_title;
  put_task?: "several" | "single";
}

export interface Habit_Body {
  habit_description: type_habit_description;
  user_id: type_user_id;
  routine_id: type_routine_id;
  template_id?: type_template_id;
  habit_id?: type_habit_id;
  habit_done?: type_habit_done;
  task: type_Habit_Body_Task;
}

export interface type_Useful_Todo {
  todo_archived: type_todo_archived;
  todo_details: type_todo_details;
  todo_description: type_todo_description;
  todo_done: type_todo_done;
  todo_highlight: type_todo_highlight;
  todo_id: type_todo_id;
  todo_story_id: type_story_id;
}

export interface type_Useful_Habit {
  habit_description: type_habit_description;
  habit_done: type_habit_done;
  habit_id: type_habit_id;
}

export type type_Page_Story_Todos = Page & {
  Page_Story: Story;
  Page_Todo: type_Useful_Todo[];
};
export type type_Page_and_Todos = Page & {
  Page_Todo: type_Useful_Todo[];
};

export type type_Story_and_Todos = Story & {
  Story_Todo: type_Useful_Todo[];
};

export type User_Story_Todo = User & {
  User_Story: type_Story_and_Todos[];
};

export type type_Routine_and_Habits = Routine & {
  Routine_Habits: type_Useful_Habit[];
};

export interface type_moveTasks {
  old_page_id: type_page_id;
  new_page_id: type_page_id;
}

/**
 * Useful include objects
 */
export const Useful_Todo_Include_Object = {
  todo_description: true,
  todo_done: true,
  todo_id: true,
  todo_story_id: true,
  todo_highlight: true,
  todo_details: true,
  todo_archived: true,
  Todo_Page: false,
  Todo_User: false,
  todo_datecreated: false,
  todo_page_id: false,
  todo_user_id: false,
};

export const Useful_Habit_Include_Object = {
  habit_description: true,
  habit_done: true,
  habit_id: true,
};

/**
 * stateReload function type
 */
export type type_stateReload =
  | VoidFunction
  // eslint-disable-next-line no-unused-vars
  | ((todo_id?: type_todo_id) => void);

/**
 * onClickHelpers types
 */
export interface type_handleTextSubmit {
  stateReload: type_stateReload;
  set_display_text_edit: Dispatch<SetStateAction<boolean>>;
  todo_id: type_todo_id;
  todo_description: type_todo_description;
}

export interface type_toggleTodoDone {
  stateReload: type_stateReload;
  todo_id: type_todo_id;
  todo_done: type_todo_done;
}

export interface type_toggleHabitDone {
  habit_id: type_habit_id;
  habit_done: type_habit_done;
}

export interface type_toggleArchiving {
  stateReload: type_stateReload;
  todo_id: type_todo_id;
  todo_archived: type_todo_archived;
}

export interface type_makeHighlight {
  stateReload: type_stateReload;
  todo_id: type_todo_id;
}

export interface type_handleDelete {
  stateReload: type_stateReload;
  todo_id: type_todo_id;
}

export interface type_addToStory extends type_Story_Body {
  stateReload: type_stateReload;
}

export interface type_removeFromStory extends type_Story_Body {
  stateReload: type_stateReload;
}

/**
 * User Routine Templates
 */
export type type_template_id = cuid;
export type type_template_title = string;
export type type_template_habits = type_habit_description[];

export interface type_user_routine_templates_struct {
  template_id: type_template_id;
  template_title: type_template_title;
  template_habits: type_template_habits;
}

export type type_user_routine_templates = type_user_routine_templates_struct[];

export interface type_Create_Template_Body {
  user_id: type_user_id;
  template_title: type_template_title;
  template_habits: type_template_habits;
}

export interface type_Template_Query {
  habit_description?: type_habit_description;
  template_id?: type_template_id;
}

/**
 * SEO interface
 */
export interface SEO_interface {
  title: string;
  description: string;
  twitter: {
    cardType: "summary" | "summary_large" | "app";
    handle?: string;
  };
  openGraph: {
    title: string;
    profile?: {
      firstName: string;
      lastName: string;
      username: string;
    };
  };
  nosnippet?: boolean;
}

export interface type_indexDB_getAllPages {
  id: type_page_title;
  page: type_Page_Story_Todos;
}
