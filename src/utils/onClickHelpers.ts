import {
  fetch_addTodoToStory,
  fetch_deleteTodo,
  fetch_makeHighlight,
  fetch_removeTodoFromStory,
  fetch_toggleArchived,
  fetch_toggleHabitDone,
  fetch_toggleTodoDone,
  fetch_updateTodoDescription,
} from "./fetchHelpers";
import {
  type_addToStory,
  type_handleDelete,
  type_handleTextSubmit,
  type_makeHighlight,
  type_removeFromStory,
  type_toggleArchiving,
  type_toggleHabitDone,
  type_toggleTodoDone,
} from "./../constants/Types";

export const onClick_handleTextSubmit = async ({
  stateReload,
  todo_id,
  todo_description,
  set_display_text_edit,
}: type_handleTextSubmit): Promise<void> => {
  await fetch_updateTodoDescription({ todo_id, todo_description });
  set_display_text_edit(false);
  stateReload();
};

export const onClick_toggleTodoDone = async ({
  todo_id,
  todo_done,
  stateReload,
}: type_toggleTodoDone): Promise<void> => {
  await fetch_toggleTodoDone({ todo_id, todo_done });
  stateReload();
};

export const onClick_makeHighlight = async ({
  todo_id,
  stateReload,
}: type_makeHighlight): Promise<void> => {
  await fetch_makeHighlight(todo_id);
  stateReload();
};

export const onClick_toggleArchiving = async ({
  stateReload,
  todo_id,
  todo_archived,
}: type_toggleArchiving): Promise<void> => {
  await fetch_toggleArchived({
    todo_id,
    todo_archived,
  });
  stateReload();
};

export const onClick_handleDelete = async ({
  stateReload,
  todo_id,
}: type_handleDelete): Promise<void> => {
  await fetch_deleteTodo(todo_id);
  stateReload();
};

export const onClick_addToStory = async ({
  stateReload,
  story_id,
  todo_id,
}: type_addToStory): Promise<void> => {
  await fetch_addTodoToStory({ story_id, todo_id });
  stateReload();
};

export const onClick_removeFromStory = async ({
  stateReload,
  story_id,
  todo_id,
}: type_removeFromStory): Promise<void> => {
  await fetch_removeTodoFromStory({ story_id, todo_id });
  stateReload(todo_id);
};

export const onClick_toggleHabitDone = async ({
  habit_id,
  habit_done,
}: type_toggleHabitDone): Promise<void> => {
  await fetch_toggleHabitDone({ habit_id, habit_done });
};
