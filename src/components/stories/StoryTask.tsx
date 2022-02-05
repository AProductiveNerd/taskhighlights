import { type_stateReload, type_todo_highlight } from "../../constants/Types";

import { EyeIcon } from "@heroicons/react/solid";
import { Todo } from "@prisma/client";
import { onClick_removeFromStory } from "../../utils/onClickHelpers";

export const StoryTask = ({
  todo: { todo_description, todo_done, todo_id, todo_story_id },
  highlight,
  loggedInSame,
  stateReload,
}: {
  todo: Todo;
  highlight?: type_todo_highlight;
  loggedInSame: boolean;
  stateReload: type_stateReload;
}): JSX.Element => {
  return (
    <div
      className="group flex items-center space-x-2 break-words text-left text-lg leading-6"
      tabIndex={0}
    >
      <input
        type="checkbox"
        id={todo_id}
        checked={todo_done}
        onClick={(event) => {
          event.preventDefault();
          return false;
        }}
      />

      <div
        className={`${
          todo_done && "line-through"
        } flex w-full cursor-text items-center justify-between`}
      >
        {highlight ? (
          <label
            className="highlight cursor-text text-xl leading-7 text-theme-primary-500"
            htmlFor={todo_id}
          >
            <p>{todo_description}</p>
          </label>
        ) : (
          <label className="cursor-text" htmlFor={todo_id}>
            <p>{todo_description}</p>
          </label>
        )}

        {loggedInSame && (
          <button
            title="Remove from story"
            aria-label="Remove from story"
            className="flex items-center"
          >
            <EyeIcon
              className="h-6 w-6"
              onClick={() =>
                onClick_removeFromStory({
                  story_id: todo_story_id,
                  todo_id,
                  stateReload,
                })
              }
            />
          </button>
        )}
      </div>
    </div>
  );
};
