import {
  ArchiveIcon,
  DotsVerticalIcon,
  TrashIcon,
} from "@heroicons/react/solid";
import {
  Dispatch,
  SetStateAction,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  onClick_handleDelete,
  onClick_handleTextSubmit,
  onClick_toggleArchiving,
  onClick_toggleTodoDone,
} from "../../utils/onClickHelpers";
import { type_todo_description, type_todo_done } from "../../constants/Types";

import { IndividualItem } from "../layout/IndividualItem";
import { Menu } from "@headlessui/react";
import { Todo } from "@prisma/client";

export const IndividualPageTask = ({
  todo: { todo_description, todo_done: db_done, todo_id },
  stateReload,
  setShouldUseServer,
}: {
  todo: Todo;
  stateReload: VoidFunction;
  setShouldUseServer: Dispatch<SetStateAction<boolean>>;
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
          className="cursor-pointer"
          id={todo_id}
          defaultChecked={todo_state}
          onChange={() => {
            set_todo_state(!db_done);
            onClick_toggleTodoDone({
              todo_id,
              stateReload,
              setShouldUseServer,
            });
          }}
        />
      }
      onkeydowncapture_callback={(event) => {
        if (event.key === "Delete") {
          onClick_handleDelete({ stateReload, setShouldUseServer, todo_id });
        } else if (event.key === "Enter") {
          set_display_text_edit(true);
        }
      }}
      text_input_p={
        <>
          {display_text_edit === true ? (
            <input
              type="text"
              className="w-full cursor-pointer bg-theme-blueGray-800"
              value={new_title}
              onChange={({ target }) => set_new_title(target.value)}
              ref={editTaskRef}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  onClick_handleTextSubmit({
                    todo_id,
                    todo_description: new_title,
                    stateReload,
                    set_display_text_edit,
                    setShouldUseServer,
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
              <label className="cursor-pointer" htmlFor={todo_id}>
                <p>{new_title}</p>
              </label>
            </p>
          )}
        </>
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
                    setShouldUseServer,
                  })
                }
                className={`${
                  active
                    ? "bg-theme-primary-500 text-theme-blueGray-300"
                    : "text-theme-blueGray-500"
                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
              >
                <TrashIcon
                  className={`h-6 w-6 ${
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
                  onClick_toggleArchiving({
                    stateReload,
                    setShouldUseServer,
                    todo_id,
                  });
                }}
                className={`${
                  active
                    ? "bg-theme-primary-500 text-theme-blueGray-300"
                    : "text-theme-blueGray-500"
                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
              >
                <ArchiveIcon
                  className={`h-6 w-6 ${
                    !active && "text-theme-primary-500"
                  } mr-2`}
                />
                Archive Task
              </button>
            )}
          </Menu.Item>
        </div>
      }
      menu_show_button_icon={
        <DotsVerticalIcon
          className="h-5 w-5 text-theme-primary-50"
          aria-hidden="true"
        />
      }
    />
  );
};
