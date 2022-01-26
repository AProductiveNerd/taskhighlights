import { Dispatch, SetStateAction } from "react";
import { Page, Story, Todo, User } from "@prisma/client";

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
export type type_page_public_link = string;
export type type_page_is_public = boolean;

/**
 * Todo Model Types
 */
export type type_todo_id = string;
export type type_todo_description = string;
export type type_todo_datecreated = Date;
export type type_todo_done = boolean;
export type type_todo_archived = boolean;
export type type_todo_highlight = boolean;
export type type_todo_details = string;

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

export interface type_Story_Body {
  todo_id: type_todo_id;
  story_id: type_story_id;
  task?: type_Story_Body_Task;
}

export interface type_Todo_Body {
  todo_description?: type_todo_description;
  todo_datecreated?: type_todo_datecreated;
  todo_story_id?: type_story_id;
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

export type type_Page_Story_Todos = Page & {
  Page_Story: Story;
  Page_Todo: Todo[];
};
export type type_Page_and_Todos = Page & {
  Page_Todo: Todo[];
};
export type type_Page_Username_Todos = Page & {
  Page_Todo: Todo[];
  Page_User: {
    user_username: type_user_username;
  };
};

export type type_Story_and_Todos = Story & {
  Story_Todo: Todo[];
};

export type User_Story_Todo = User & {
  User_Story: type_Story_and_Todos[];
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

/**
 * stateReload function type
 */
export type type_stateReload =
  | VoidFunction
  // eslint-disable-next-line no-unused-vars
  | ((todo_id?: type_todo_id) => void);

export type type_serverReload = VoidFunction;
/**
 * onClickHelpers types
 */
export interface type_handleTextSubmit {
  stateReload: type_stateReload;
  set_display_text_edit: Dispatch<SetStateAction<boolean>>;
  todo_id: type_todo_id;
  serverReload: type_serverReload;
  todo_description: type_todo_description;
}

export interface type_toggleTodoDone {
  stateReload: type_stateReload;
  serverReload: type_serverReload;
  todo_id: type_todo_id;
}

export interface type_toggleArchiving {
  stateReload: type_stateReload;
  serverReload: type_serverReload;
  todo_id: type_todo_id;
}

export interface type_makeHighlight {
  stateReload: type_stateReload;
  serverReload: type_serverReload;
  todo_id: type_todo_id;
}

export interface type_handleDelete {
  stateReload: type_stateReload;
  serverReload: type_serverReload;
  todo_id: type_todo_id;
}

export interface type_addToStory extends type_Story_Body {
  stateReload: type_stateReload;
}

export interface type_removeFromStory extends type_Story_Body {
  stateReload: type_stateReload;
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

export interface type_API_error {
  Error: string;
}

// const a: User = {
// user_id
// user_email
// user_username
// user_fullname
// user_bio
// user_followers
// user_following
// user_avatar
// user_streak
// user_highlight_questions
// user_api_token
// user_twitter_handle
// user_level
// user_streak_prev
// };

// export interface useful_User {}
