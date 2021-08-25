import {
  addToStory,
  handleDelete,
  handleTextSubmit,
  makeHighlight,
  removeFromStory,
  toggleArchiving,
  toggleHabitDone,
  toggleTodoDone
} from "./../constants/Types";
import {
  fetch_addTodoToStory,
  fetch_deleteTodo,
  fetch_makeHighlight,
  fetch_removeTodoFromStory,
  fetch_toggleArchived,
  fetch_toggleHabitDone,
  fetch_toggleTodoDone,
  fetch_updateTodoDescription
} from "./fetchHelpers";

export const onClick_handleTextSubmit = async ({
  stateReload,
  todo_id,
  todo_description,
  set_display_text_edit
}: handleTextSubmit): Promise<void> => {
  await fetch_updateTodoDescription({ todo_id, todo_description });
  set_display_text_edit(false);
  stateReload();
};

export const onClick_toggleTodoDone = async ({
  todo_id,
  todo_done
}: toggleTodoDone): Promise<void> => {
  await fetch_toggleTodoDone({ todo_id, todo_done });
};

export const onClick_makeHighlight = async ({
  todo_id,
  stateReload
}: makeHighlight): Promise<void> => {
  await fetch_makeHighlight(todo_id);
  stateReload();
};

export const onClick_toggleArchiving = async ({
  stateReload,
  todo_id,
  todo_archived
}: toggleArchiving): Promise<void> => {
  await fetch_toggleArchived({
    todo_id,
    todo_archived
  });
  stateReload();
};

export const onClick_handleDelete = async ({
  stateReload,
  todo_id
}: handleDelete): Promise<void> => {
  await fetch_deleteTodo(todo_id);
  stateReload();
};

export const onClick_addToStory = async ({
  stateReload,
  story_id,
  todo_id
}: addToStory): Promise<void> => {
  await fetch_addTodoToStory({ story_id, todo_id });
  stateReload();
};

export const onClick_removeFromStory = async ({
  stateReload,
  story_id,
  todo_id
}: removeFromStory): Promise<void> => {
  await fetch_removeTodoFromStory({ story_id, todo_id });
  stateReload(todo_id);
};

export const onClick_toggleHabitDone = async ({
  habit_id,
  habit_done
}: toggleHabitDone): Promise<void> => {
  await fetch_toggleHabitDone({ habit_id, habit_done });
};
