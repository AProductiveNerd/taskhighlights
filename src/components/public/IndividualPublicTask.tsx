import { IndividualItem } from "../layout/IndividualItem";
import cuid from "cuid";
import { type_Useful_Todo } from "../../constants/Types";

export const IndividualPublicTask = ({
  todo: { todo_description, todo_done },
}: {
  todo: type_Useful_Todo;
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
