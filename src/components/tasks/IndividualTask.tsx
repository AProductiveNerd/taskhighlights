import { Todo } from "@prisma/client";
import { useState } from "react";
import { toggleTodoState } from "../../utils/fetchHelpers";
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
  const [displayTextEdit, setDisplayTextEdit] = useState(false);
  const [newTitle, setNewTitle] = useState(todo_description);

  const stateToggle = async () => {
    await toggleTodoState({ todo_id, todo_done });
    setAddedCounter(addedCounter++);
  };

  const handleTextSubmit = async () => {
    await updateTodoDescription({ todo_id, todo_description });
    setDisplayTextEdit(false);
    setAddedCounter(addedCounter++);
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        defaultChecked={todo_done}
        onChange={stateToggle}
      />

      {displayTextEdit === true ? (
        <input
          type="text"
          className={`bg-theme-secondary outline-none w-full border-b-2 border-theme-primary ${
            todo_done && "line-through"
          }`}
          value={newTitle}
          onChange={({ target }) => setNewTitle(target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleTextSubmit();
              setDisplayTextEdit(false);
            }
            if (event.key === "Escape") {
              setDisplayTextEdit(false);
            }
          }}
        />
      ) : (
        <p
          className={`w-full border-b-2 border-theme-primary ${
            todo_done && "line-through"
          }`}
          onClick={() => setDisplayTextEdit(!displayTextEdit)}
        >
          {todo_description}
        </p>
      )}
    </div>
  );
};
