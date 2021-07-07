import { Todo } from "@prisma/client";
import { toggleTodoState } from "../../utils/fetchHelpers";
// import { useState } from "react";

export const IndividualTask = ({
  todo: { todo_description, todo_done, todo_id },
  addedCounter,
  setAddedCounter
}: {
  todo: Todo;
  addedCounter: number;
  setAddedCounter: React.Dispatch<React.SetStateAction<number>>;
}): JSX.Element => {
  const stateToggle = async () => {
    await toggleTodoState({ todo_id, todo_done });
    console.log("hi");
    setAddedCounter(addedCounter++);
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        defaultChecked={todo_done}
        onChange={stateToggle}
      />
      <p>{todo_description}</p>
      <h2></h2>
    </div>
  );
};
