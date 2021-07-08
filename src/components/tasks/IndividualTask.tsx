import { Todo } from "@prisma/client";
import { useState } from "react";
import { toggleTodoState as toggle_todo_state } from "../../utils/fetchHelpers";
// import { useState } from "react";
import { updateTodoDescription } from "./../../utils/fetchHelpers";

export const IndividualTask = ({
  todo: { todo_description, todo_done, todo_id },
  addedCounter,
  setAddedCounter
}: {
  todo: Todo;
  addedCounter: number;
  setAddedCounter: React.Dispatch<React.SetStateAction<number>>;
}): JSX.Element => {
  const [display_text_edit, set_display_text_edit] = useState(false);
  const [todo_state, set_todo_state] = useState<boolean>(todo_done);
  const [new_title, set_new_title] = useState<string>(todo_description);

  const state_toggle = async () => {
    await toggle_todo_state({ todo_id, todo_done: todo_state });
    set_todo_state(todo_state);
    setAddedCounter(addedCounter++);
  };

  const handleTextSubmit = async () => {
    await updateTodoDescription({ todo_id, todo_description: new_title });
    set_display_text_edit(false);
    setAddedCounter(addedCounter++);
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        defaultChecked={todo_state}
        onChange={state_toggle}
      />

      {display_text_edit === true ? (
        <input
          type="text"
          className={`${todo_state && "line-through"}`}
          value={new_title}
          onChange={({ target }) => set_new_title(target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleTextSubmit();
              set_display_text_edit(false);
            }
            if (event.key === "Escape") {
              set_display_text_edit(false);
              set_new_title(todo_description);
            }
          }}
        />
      ) : (
        <p
          className={`${todo_state && "line-through"}`}
          onClick={() => set_display_text_edit(!display_text_edit)}
        >
          {new_title}
        </p>
      )}
    </div>
  );
};
