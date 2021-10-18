import {
  type_Useful_Todo,
  type_stateReload,
  type_todo_highlight,
} from "../../constants/Types";

import { EyeIcon } from "@heroicons/react/solid";
import { onClick_removeFromStory } from "../../utils/onClickHelpers";

export const StoryTask = ({
  todo: { todo_description, todo_done, todo_id, todo_story_id },
  highlight,
  loggedInSame,
  stateReload,
}: {
  todo: type_Useful_Todo;
  highlight?: type_todo_highlight;
  loggedInSame: boolean;
  stateReload: type_stateReload;
}): JSX.Element => {
  return (
    <div
      className="flex items-center space-x-2 text-left text-lg break-words leading-6 group"
      tabIndex={0}
    >
      <input type="checkbox" id={todo_id} checked={todo_done} readOnly={true} />

      <div
        className={`${
          todo_done && "line-through"
        } w-full cursor-text flex justify-between items-center`}
      >
        {highlight ? (
          <label
            className="cursor-text highlight text-theme-primary-500 leading-7 text-xl"
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
              className="w-6 h-6"
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
