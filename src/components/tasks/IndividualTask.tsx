import {
  ArchiveIcon,
  DotsVerticalIcon,
  EyeIcon,
  EyeOffIcon,
  TrashIcon
} from "@heroicons/react/solid";
import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  Useful_Todo,
  todo_archived,
  todo_description,
  todo_done,
  todo_highlight
} from "../../constants/Types";
import {
  onClick_addToStory,
  onClick_handleDelete,
  onClick_handleTextSubmit,
  onClick_makeHighlight,
  onClick_removeFromStory,
  onClick_toggleArchiving,
  onClick_toggleTodoDone
} from "../../utils/onClickHelpers";

import { Story } from "@prisma/client";

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
  highlight,
  highlightCount
}: {
  todo: Useful_Todo;
  story: Story;
  stateReload: VoidFunction;
  highlightCount: number;
  highlight?: todo_highlight;
}): JSX.Element => {
  const [display_text_edit, set_display_text_edit] = useState<boolean>(false);
  const [todo_state, set_todo_state] = useState<todo_done>(db_done);
  const [new_title, set_new_title] =
    useState<todo_description>(todo_description);
  const [todo_archive_state, set_todo_archive_state] =
    useState<todo_archived>(db_archive);

  return (
    <div className="flex items-center space-x-2 text-left text-xl break-words leading-6 group">
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
          className="w-full bg-theme-blueGray-800 cursor-pointer"
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
          {highlight ? (
            <label
              className="cursor-pointer highlight text-theme-primary-500 leading-7 text-2xl"
              htmlFor={todo_id}
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "Delete") {
                  onClick_handleDelete({ stateReload, todo_id });
                }
              }}
            >
              <h1>{new_title}</h1>
            </label>
          ) : (
            <label
              className="cursor-pointer"
              htmlFor={todo_id}
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "Delete") {
                  onClick_handleDelete({ stateReload, todo_id });
                }
              }}
            >
              <p>{new_title}</p>
            </label>
          )}
        </p>
      )}

      <div className="text-right hidden group-hover:block flex-shrink">
        <Menu as="div" className="inline-block text-left">
          <div>
            <Menu.Button className="inline-flex justify-center px-3 py-2 w-full bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
              <DotsVerticalIcon
                className="w-5 h-5 text-white"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="sticky inline-flex w-max flex-col items-center px-4 py-2 right-0 bg-black rounded-md bg-opacity-20 backdrop-blur hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 space-y-1 overflow-y-hidden mt-1">
              {!highlight && (
                <>
                  <div>
                    <Menu.Item>
                      <div>
                        {highlightCount === 0 && (
                          <button
                            title="Make Highlight"
                            aria-label="Make Highlight"
                            onClick={() => {
                              onClick_makeHighlight({
                                stateReload,
                                todo_id
                              });
                            }}
                          >
                            ✨
                          </button>
                        )}
                      </div>
                    </Menu.Item>
                  </div>
                  <div>
                    <Menu.Item>
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
                    </Menu.Item>
                  </div>
                  <div>
                    <Menu.Item>
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
                    </Menu.Item>
                  </div>
                </>
              )}
              <div>
                <Menu.Item>
                  <div>
                    {storyid === todo_story_id ? (
                      <button
                        title="Remove from story"
                        aria-label="Remove from story"
                        className="flex items-center"
                      >
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
                      <button
                        title="Add to story"
                        aria-label="Add to story"
                        className="flex items-center"
                      >
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
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
};
