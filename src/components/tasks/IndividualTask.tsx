import {
  ArchiveIcon,
  ArrowNarrowRightIcon,
  DotsVerticalIcon,
  EyeIcon,
  EyeOffIcon,
  SparklesIcon,
  TrashIcon,
} from "@heroicons/react/solid";
import {
  Dispatch,
  SetStateAction,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Story, Todo } from "@prisma/client";
import {
  onClick_addToStory,
  onClick_handleDelete,
  onClick_handleTextSubmit,
  onClick_makeHighlight,
  onClick_moveTasksToToday,
  onClick_removeFromStory,
  onClick_toggleArchiving,
  onClick_toggleTodoDone,
} from "../../utils/onClickHelpers";
import {
  type_todo_description,
  type_todo_done,
  type_todo_highlight,
} from "../../constants/Types";

import { IndividualItem } from "../layout/IndividualItem";
import { Menu } from "@headlessui/react";
import dynamic from "next/dynamic";

const DynamicAddDetails = dynamic(() => import("./AddDetails"));
const DynamicTaskDetailsModal = dynamic(() => import("./TaskDetailsModal"));

export const IndividualTask = ({
  todo: {
    todo_description,
    todo_done: db_done,
    todo_id,
    todo_highlight,
    todo_story_id,
    todo_details,
  },
  story: { story_id: storyid },
  stateReload,
  highlight,
  setShouldUseServer,
  set_party_display,
  highlightCount,
}: {
  todo: Todo;
  story: Story;
  set_party_display?: Dispatch<SetStateAction<boolean>>;
  stateReload: VoidFunction;
  highlightCount: number;
  setShouldUseServer: Dispatch<SetStateAction<boolean>>;
  highlight?: type_todo_highlight;
}): JSX.Element => {
  const [display_text_edit, set_display_text_edit] = useState<boolean>(false);
  const [todo_state, set_todo_state] = useState<type_todo_done>(db_done);
  const [new_title, set_new_title] =
    useState<type_todo_description>(todo_description);

  const [isOpen, setIsOpen] = useState(false);

  const editTaskRef = useRef(null);

  useLayoutEffect(() => {
    editTaskRef.current?.focus();
  }, [display_text_edit]);

  return (
    <IndividualItem
      input_checkbox={
        <input
          type="checkbox"
          className="cursor-pointer"
          id={todo_id}
          defaultChecked={todo_state}
          onClick={(event) => {
            if (event.ctrlKey) {
              event.preventDefault();
              return;
            }
            set_todo_state(!db_done);
            if (todo_highlight && !todo_state) {
              set_party_display(true);
            }
            onClick_toggleTodoDone({
              setShouldUseServer,
              todo_id,
              stateReload,
            });
          }}
        />
      }
      menu_items={
        <div className="px-1 py-1">
          {storyid === todo_story_id ? (
            <Menu.Item>
              {({ active }) => (
                <button
                  title="Remove from story"
                  aria-label="Remove from story"
                  onClick={() =>
                    onClick_removeFromStory({
                      stateReload,
                      story_id: storyid,
                      todo_id,
                    })
                  }
                  className={`${
                    active
                      ? "bg-theme-primary-500 text-theme-blueGray-300"
                      : "text-theme-blueGray-500"
                  } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                >
                  <EyeIcon
                    className={`w-6 h-6 ${
                      !active && "text-theme-primary-500"
                    } mr-2`}
                  />
                  Remove from story
                </button>
              )}
            </Menu.Item>
          ) : (
            <Menu.Item>
              {({ active }) => (
                <button
                  title="Add to story"
                  aria-label="Add to story"
                  onClick={() =>
                    onClick_addToStory({
                      stateReload,
                      story_id: storyid,
                      todo_id,
                    })
                  }
                  className={`${
                    active
                      ? "bg-theme-primary-500 text-theme-blueGray-300"
                      : "text-theme-blueGray-500"
                  } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                >
                  <EyeOffIcon
                    className={`w-6 h-6 ${
                      !active && "text-theme-primary-500"
                    } mr-2`}
                  />
                  Add to story
                </button>
              )}
            </Menu.Item>
          )}

          <Menu.Item>
            {({ active }) => (
              <button
                aria-label="Permanently Delete Task"
                title="Permanently Delete"
                onClick={() =>
                  onClick_handleDelete({
                    stateReload,
                    setShouldUseServer,
                    todo_id,
                  })
                }
                className={`${
                  active
                    ? "bg-theme-primary-500 text-theme-blueGray-300"
                    : "text-theme-blueGray-500"
                } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
              >
                <TrashIcon
                  className={`w-6 h-6 ${
                    !active && "text-theme-primary-500"
                  } mr-2`}
                />
                Permanently Delete
              </button>
            )}
          </Menu.Item>

          <Menu.Item>
            {({ active }) => (
              <button
                aria-label="Move task to today"
                title="Move task to today"
                onClick={() =>
                  onClick_moveTasksToToday({
                    stateReload,
                    todo_id,
                  })
                }
                className={`${
                  active
                    ? "bg-theme-primary-500 text-theme-blueGray-300"
                    : "text-theme-blueGray-500"
                } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
              >
                <ArrowNarrowRightIcon
                  className={`w-6 h-6 ${
                    !active && "text-theme-primary-500"
                  } mr-2`}
                />
                Move task to today
              </button>
            )}
          </Menu.Item>

          <Menu.Item>
            {({ active }) => (
              <button
                title="Archive Task"
                aria-label="Archive Task"
                onClick={() => {
                  onClick_toggleArchiving({
                    stateReload,
                    todo_id,
                    setShouldUseServer,
                  });
                }}
                className={`${
                  active
                    ? "bg-theme-primary-500 text-theme-blueGray-300"
                    : "text-theme-blueGray-500"
                } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
              >
                <ArchiveIcon
                  className={`w-6 h-6 ${
                    !active && "text-theme-primary-500"
                  } mr-2`}
                />
                Archive Task
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            <DynamicAddDetails
              stateReload={stateReload}
              todo_id={todo_id}
              // isOpen={isOpen}
              // setIsOpen={setIsOpen}
            />
          </Menu.Item>
        </div>
      }
      menu_show_button_icon={
        <DotsVerticalIcon
          className="w-5 h-5 text-theme-primary-50"
          aria-hidden="true"
        />
      }
      onkeydowncapture_callback={(event) => {
        if (event.key === "Delete") {
          onClick_handleDelete({ stateReload, todo_id, setShouldUseServer });
        } else if (event.key === "Enter") {
          set_display_text_edit(true);
        } else if (event.key === "h" && highlightCount === 0) {
          onClick_makeHighlight({
            stateReload,
            todo_id,
            setShouldUseServer,
          });
        }
      }}
      text_input_p={
        <>
          {display_text_edit === true ? (
            <input
              type="text"
              className="w-full bg-theme-blueGray-800 cursor-pointer"
              value={new_title}
              onChange={({ target }) => set_new_title(target.value)}
              ref={editTaskRef}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  onClick_handleTextSubmit({
                    todo_id,
                    todo_description: new_title,
                    stateReload,
                    setShouldUseServer,
                    set_display_text_edit,
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
              className={`${
                todo_state && "line-through"
              } w-full cursor-pointer`}
              onClick={(event) => {
                if (event.ctrlKey) {
                  setIsOpen(true);
                } else {
                  set_display_text_edit(!display_text_edit);
                }
              }}
            >
              {highlight ? (
                <label
                  className="cursor-pointer highlight text-theme-primary-500 leading-7 text-xl"
                  htmlFor={todo_id}
                >
                  <p>{new_title}</p>
                </label>
              ) : (
                <label className="cursor-pointer" htmlFor={todo_id}>
                  <p>{new_title}</p>
                </label>
              )}
            </p>
          )}
        </>
      }
      non_menu_button={
        <>
          {highlightCount === 0 && (
            <button
              title="Make Highlight"
              aria-label="Make Highlight"
              className="flex items-center"
              onClick={() => {
                onClick_makeHighlight({
                  stateReload,
                  todo_id,
                  setShouldUseServer,
                });
              }}
            >
              <SparklesIcon className="text-yellow-400 w-5 h-5" />
            </button>
          )}
          <DynamicTaskDetailsModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            todo_details={todo_details}
            // stateReload={stateReload}
            // todo_id={todo_id}
          />
        </>
      }
    />
  );
};
