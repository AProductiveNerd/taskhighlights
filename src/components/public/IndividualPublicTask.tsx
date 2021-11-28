import { IndividualItem } from "../layout/IndividualItem";
import { Todo } from "@prisma/client";
import cuid from "cuid";

export const IndividualPublicTask = ({
  todo: { todo_description, todo_done },
}: {
  todo: Todo;
}): JSX.Element => {
  const cuid_id = cuid();
  return (
    <IndividualItem
      input_checkbox={
        <input
          type="checkbox"
          className="cursor-pointer"
          id={cuid_id}
          checked={todo_done}
          onClick={(event) => {
            event.preventDefault();
            return false;
          }}
        />
      }
      onkeydowncapture_callback={() => {}}
      text_input_p={
        <p className={`${todo_done && "line-through"} w-full cursor-pointer`}>
          <label className="cursor-pointer" htmlFor={cuid_id}>
            <p>{todo_description}</p>
          </label>
        </p>
      }
    />
  );
};
