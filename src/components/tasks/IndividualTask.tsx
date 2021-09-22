import {
  ArchiveIcon,
  CalendarIcon,
  DotsVerticalIcon,
  EyeIcon,
  EyeOffIcon,
  TrashIcon,
  UploadIcon
} from "@heroicons/react/solid";
import { Dispatch, Fragment, SetStateAction, useState } from "react";
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
import { useLayoutEffect } from "react";
import { useRef } from "react";

export const IndividualTask = ({
  todo: {
    todo_description,
    todo_done: db_done,
    todo_id,
    todo_highlight,
    todo_archived: db_archive,
    todo_story_id
  },
  story: { story_id: storyid },
  stateReload,
  highlight,
  set_party_display,
  highlightCount
}: {
  todo: Useful_Todo;
  story: Story;
  set_party_display?: Dispatch<SetStateAction<boolean>>;
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

  const editTaskRef = useRef(null);

  useLayoutEffect(() => {
    editTaskRef.current?.focus();
  }, [display_text_edit]);

  return (
    <div
      className="flex items-center space-x-2 text-left text-lg break-words leading-6 group relative"
      tabIndex={0}
      onKeyDownCapture={(event) => {
        if (event.key === "Delete") {
          onClick_handleDelete({ stateReload, todo_id });
        } else if (event.key === "Enter") {
          set_display_text_edit(true);
        } else if (event.key === "h" && highlightCount === 0) {
          onClick_makeHighlight({
            stateReload,
            todo_id
          });
        }
      }}
    >
      <input
        type="checkbox"
        className="cursor-pointer"
        id={todo_id}
        defaultChecked={todo_state}
        onChange={() => {
          set_todo_state(!db_done);
          if (todo_highlight && !todo_state) {
            set_party_display(true);
          }
          onClick_toggleTodoDone({
            todo_done: todo_state,
            todo_id,
            stateReload
          });
        }}
      />

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

      <div>
        <Menu
          as="div"
          className="relative inline-block text-left text-theme-blueGray-300"
        >
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              className="
                absolute right-0 w-56 mr-10 -mt-9 origin-bottom-left
                bg-black bg-opacity-70 filter backdrop-blur-3xl
                divide-gray-100 rounded-md
                shadow-lg ring-1 ring-black ring-opacity-5
                focus:outline-none
                z-50
              "
            >
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
                            todo_id
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
                            todo_id
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
                          todo_id
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
                      title="Archive Task"
                      aria-label="Archive Task"
                      onClick={() => {
                        set_todo_archive_state(!db_archive);
                        onClick_toggleArchiving({
                          stateReload,
                          todo_archived: todo_archive_state,
                          todo_id
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
              </div>
            </Menu.Items>
          </Transition>

          <div>
            <Menu.Button
              as="button"
              title="Menu"
              aria-label="Menu"
              className="
                  inline-flex justify-center
                  w-full px-2 py-2
                  text-sm font-medium
                  rounded-md
                  bg-black bg-opacity-20 filter backdrop-blur-3xl
                  hover:bg-opacity-30 focus:outline-none focus-visible:ring-2
                  focus-visible:ring-white focus-visible:ring-opacity-75
                "
            >
              <DotsVerticalIcon
                className="w-5 h-5 text-theme-primary-50"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>
        </Menu>
      </div>
    </div>
  );
};

function EditInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
    </svg>
  );
}

function EditActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
    </svg>
  );
}

function DuplicateInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 4H12V12H4V4Z"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
      <path
        d="M8 8H16V16H8V8Z"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
    </svg>
  );
}

function DuplicateActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 4H12V12H4V4Z"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
      <path
        d="M8 8H16V16H8V8Z"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
    </svg>
  );
}

function ArchiveInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="8"
        width="10"
        height="8"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
      <rect
        x="4"
        y="4"
        width="12"
        height="4"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
      <path d="M8 12H12" stroke="#A78BFA" strokeWidth="2" />
    </svg>
  );
}

function ArchiveActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="8"
        width="10"
        height="8"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
      <rect
        x="4"
        y="4"
        width="12"
        height="4"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
      <path d="M8 12H12" stroke="#A78BFA" strokeWidth="2" />
    </svg>
  );
}

function MoveInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 4H16V10" stroke="#A78BFA" strokeWidth="2" />
      <path d="M16 4L8 12" stroke="#A78BFA" strokeWidth="2" />
      <path d="M8 6H4V16H14V12" stroke="#A78BFA" strokeWidth="2" />
    </svg>
  );
}

function MoveActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 4H16V10" stroke="#C4B5FD" strokeWidth="2" />
      <path d="M16 4L8 12" stroke="#C4B5FD" strokeWidth="2" />
      <path d="M8 6H4V16H14V12" stroke="#C4B5FD" strokeWidth="2" />
    </svg>
  );
}

function DeleteInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="6"
        width="10"
        height="10"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
      <path d="M3 6H17" stroke="#A78BFA" strokeWidth="2" />
      <path d="M8 6V4H12V6" stroke="#A78BFA" strokeWidth="2" />
    </svg>
  );
}

function DeleteActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="6"
        width="10"
        height="10"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
      <path d="M3 6H17" stroke="#C4B5FD" strokeWidth="2" />
      <path d="M8 6V4H12V6" stroke="#C4B5FD" strokeWidth="2" />
    </svg>
  );
}
