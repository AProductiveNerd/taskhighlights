import { Todo } from "@prisma/client";
import { useEffect, useState } from "react";
import {
  deleteTodo,
  toggleTodoState,
  updateTodoDescription
} from "../../utils/fetchHelpers";
import { TrashIcon } from "@heroicons/react/solid";

export const IndividualTask = ({
  todo: { todo_description, todo_done: db_done, todo_id },
  addedCounter,
  setAddedCounter
}: {
  todo: Todo;
  addedCounter: number;
  setAddedCounter: React.Dispatch<React.SetStateAction<number>>;
}): JSX.Element => {
  const [display_text_edit, set_display_text_edit] = useState<boolean>(false);
  const [todo_state, set_todo_state] = useState<boolean>(db_done);
  const [new_title, set_new_title] = useState<string>(todo_description);

  const handleTextSubmit = async () => {
    await updateTodoDescription({ todo_id, todo_description: new_title });
    set_display_text_edit(false);
    setAddedCounter(addedCounter++);
  };

  const handleDelete = async () => {
    await deleteTodo(todo_id);
    setAddedCounter(addedCounter++);
  };

  useEffect(() => {
    (async () => {
      await toggleTodoState({ todo_done: todo_state, todo_id });
    })();
  }, [todo_id, todo_state]);

  return (
    <div className="flex items-center space-x-2 text-left text-xl break-all">
      <input
        type="checkbox"
        defaultChecked={todo_state}
        onChange={() => {
          set_todo_state(!todo_state);
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
              handleTextSubmit();
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
          {new_title}
        </p>
      )}
      <button
        // className="h-6 w-6 flex justify-center items-center"
        title="Permanently Delete"
        onClick={() => handleDelete()}
      >
        <TrashIcon className="w-6 h-6" />
      </button>
    </div>
  );
};
