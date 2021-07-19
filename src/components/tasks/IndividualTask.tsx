import {
  ArchiveIcon,
  EyeIcon,
  EyeOffIcon,
  TrashIcon
} from "@heroicons/react/solid";
import { Story } from "@prisma/client";
import { useState } from "react";
import {
  todo_archived,
  todo_description,
  todo_done,
  todo_highlight,
  Useful_Todo
} from "../../constants/Types";
import {
  onClick_addToStory,
  onClick_handleDelete,
  onClick_handleTextSubmit,
  onClick_removeFromStory,
  onClick_toggleArchiving,
  onClick_toggleTodoDone
} from "../../utils/onClickHelpers";


export const IndividualTask = ({
  todo: {
    todo_description,
    todo_done: db_done,
    todo_id,
    todo_archived: db_archive,
    todo_story_id
  },
  story: { story_id: storyid },
  stateReload,
  highlight
}: {
  todo: Useful_Todo;
  story: Story;
  stateReload: VoidFunction;
  highlight?: todo_highlight;
}): JSX.Element => {
  const [display_text_edit, set_display_text_edit] = useState<boolean>(false);
  const [todo_state, set_todo_state] = useState<todo_done>(db_done);
  const [new_title, set_new_title] =
    useState<todo_description>(todo_description);
  const [todo_archive_state, set_todo_archive_state] =
    useState<todo_archived>(db_archive);

  return (
    <div className="flex items-center space-x-2 text-left text-xl break-words leading-5">
      <input
        type="checkbox"
        id={todo_id}
        defaultChecked={todo_state}
        onChange={() => {
          set_todo_state(!db_done);
          onClick_toggleTodoDone({
            todo_done: todo_state,
            todo_id
          });
        }}
      />

      {display_text_edit === true ? (
        <input
          type="text"
          className={
            "w-full cursor-pointer selection:bg-theme-blueGray-800 selection:text-theme-blueGray-400"
          }
          value={new_title}
          onChange={({ target }) => set_new_title(target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              onClick_handleTextSubmit({
                todo_id,
                todo_description,
                stateReload,
                set_display_text_edit
              });
              set_display_text_edit(false);
            } else if (event.key === "Escape") {
              set_display_text_edit(false);
              set_new_title(todo_description);
            }
          }}
        />
      ) : (
        <p
          className={`${todo_state && "line-through"} w-full cursor-pointer`}
          onClick={() => set_display_text_edit(!display_text_edit)}
        >
          <label
            className={`cursor-pointer ${
              highlight && "text-theme-fuchsia-500 text-2xl"
            }`}
            htmlFor={todo_id}
          >
            {new_title}
          </label>
        </p>
      )}

      {!highlight && (
        <>
          <button
            title="Archive"
            aria-label="Archive Task"
            onClick={() => {
              set_todo_archive_state(!db_archive);
              onClick_toggleArchiving({
                stateReload,
                todo_archived: todo_archive_state,
                todo_id
              });
            }}
          >
            <ArchiveIcon className="w-6 h-6" />
          </button>

          <button
            aria-label="Permanently Delete Task"
            title="Permanently Delete"
            onClick={() =>
              onClick_handleDelete({
                stateReload,
                todo_id
              })
            }
          >
            <TrashIcon className="w-6 h-6" />
          </button>
        </>
      )}

      {storyid === todo_story_id ? (
        <button title="Add to story" aria-label="Add to story">
          <EyeIcon
            className="w-6 h-6"
            onClick={() =>
              onClick_removeFromStory({
                stateReload,
                story_id: storyid,
                todo_id
              })
            }
          />
        </button>
      ) : (
        <button title="Remove from story" aria-label="Remove from story">
          <EyeOffIcon
            className="w-6 h-6"
            onClick={() =>
              onClick_addToStory({
                stateReload,
                story_id: storyid,
                todo_id
              })
            }
          />
        </button>
      )}
    </div>
  );
};
