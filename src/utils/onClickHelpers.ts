import {
  fetch_addTodoToStory,
  fetch_deleteTodo,
  fetch_makeHighlight,
  fetch_moveTasksToToday,
  fetch_removeTodoFromStory,
  fetch_toggleArchived,
  fetch_toggleTodoDone,
  fetch_updateTodoDescription,
} from "./fetchHelpers";
import {
  server_deleteTodo,
  server_makeHighlight,
  server_toggleArchived,
  server_toggleTodoDone,
  server_updateTodoDescription,
} from "./serverHelpers";
import {
  type_addToStory,
  type_handleDelete,
  type_handleTextSubmit,
  type_makeHighlight,
  type_removeFromStory,
  type_todo_id,
  type_toggleArchiving,
  type_toggleTodoDone,
} from "./../constants/Types";

export const onClick_handleTextSubmit = async ({
  stateReload,
  todo_id,
  todo_description,
  set_display_text_edit,
  serverReload,
}: type_handleTextSubmit): Promise<void> => {
  await fetch_updateTodoDescription({ todo_id, todo_description });
  set_display_text_edit(false);
  stateReload();
  await server_updateTodoDescription({
    todo_description,
    todo_id,
  });
  serverReload();
};

export const onClick_toggleTodoDone = async ({
  todo_id,
  stateReload,
  serverReload,
}: type_toggleTodoDone): Promise<void> => {
  await fetch_toggleTodoDone(todo_id);
  stateReload();
  await server_toggleTodoDone(todo_id);
  serverReload();
};

export const onClick_makeHighlight = async ({
  todo_id,
  stateReload,
  serverReload,
}: type_makeHighlight): Promise<void> => {
  await fetch_makeHighlight(todo_id);
  stateReload();
  await server_makeHighlight(todo_id);
  serverReload();
};

export const onClick_toggleArchiving = async ({
  stateReload,
  todo_id,
  serverReload,
}: type_toggleArchiving): Promise<void> => {
  await fetch_toggleArchived(todo_id);
  stateReload();
  await server_toggleArchived(todo_id);
  serverReload();
};

export const onClick_handleDelete = async ({
  stateReload,
  todo_id,
  serverReload,
}: type_handleDelete): Promise<void> => {
  await fetch_deleteTodo(todo_id);
  stateReload();
  await server_deleteTodo(todo_id);
  serverReload();
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

export const onClick_moveTasksToToday = async ({
  stateReload,
  todo_id,
}: {
  todo_id: type_todo_id;
  stateReload: VoidFunction;
}): Promise<void> => {
  await fetch_moveTasksToToday(todo_id);
  stateReload();
};
