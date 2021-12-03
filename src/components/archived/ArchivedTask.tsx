import {
  ArchiveIcon,
  DotsVerticalIcon,
  TrashIcon,
} from "@heroicons/react/solid";
import {
  onClick_handleDelete,
  onClick_handleTextSubmit,
  onClick_toggleArchiving,
  onClick_toggleTodoDone,
} from "../../utils/onClickHelpers";
import {
  type_serverReload,
  type_todo_description,
  type_todo_done,
} from "../../constants/Types";
import { useLayoutEffect, useRef, useState } from "react";

import { IndividualItem } from "../layout/IndividualItem";
import { Menu } from "@headlessui/react";
import { Todo } from "@prisma/client";

export const ArchivedTask = ({
  todo: { todo_description, todo_done: db_done, todo_id, todo_highlight },
  stateReload,
  serverReload,
}: {
  todo: Todo;
  stateReload: VoidFunction;
  serverReload: type_serverReload;
}): JSX.Element => {
  const [display_text_edit, set_display_text_edit] = useState<boolean>(false);
  const [todo_state, set_todo_state] = useState<type_todo_done>(db_done);
  const [new_title, set_new_title] =
    useState<type_todo_description>(todo_description);

  const editTaskRef = useRef(null);

  useLayoutEffect(() => {
    editTaskRef.current?.focus();
  }, [display_text_edit]);

  return (
    <IndividualItem
      input_checkbox={
        <input
          type="checkbox"
          id={todo_id}
          defaultChecked={todo_state}
          onChange={() => {
            set_todo_state(!db_done);
            onClick_toggleTodoDone({
              todo_id,
              serverReload,
              stateReload,
            });
          }}
        />
      }
      onkeydowncapture_callback={(event) => {
        if (event.key === "Delete") {
          onClick_handleDelete({ stateReload, serverReload, todo_id });
        } else if (event.key === "Enter") {
          set_display_text_edit(true);
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
                    serverReload,
                    todo_description,
                    stateReload,
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
              onClick={() => set_display_text_edit(!display_text_edit)}
            >
              {todo_highlight ? (
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
      menu_show_button_icon={
        <DotsVerticalIcon
          className="w-5 h-5 text-theme-primary-50"
          aria-hidden="true"
        />
      }
      menu_items={
        <div className="px-1 py-1">
          <Menu.Item>
            {({ active }) => (
              <button
                aria-label="Permanently Delete Task"
                title="Permanently Delete"
                onClick={() =>
                  onClick_handleDelete({
                    stateReload,
                    todo_id,
                    serverReload,
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
                title="Unarchive"
                aria-label="Unarchive Task"
                onClick={() => {
                  onClick_toggleArchiving({
                    stateReload,
                    todo_id,
                    serverReload,
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
                Unarchive
              </button>
            )}
          </Menu.Item>
        </div>
      }
    />
  );
};
