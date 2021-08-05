import { Useful_Todo, todo_highlight } from "../../constants/Types";

export const StoryTask = ({
  todo: { todo_description, todo_done, todo_id },
  highlight
}: {
  todo: Useful_Todo;
  highlight?: todo_highlight;
}): JSX.Element => {
  return (
    <div
      className="flex items-center space-x-2 text-left text-lg break-words leading-6 group"
      tabIndex={0}
    >
      <input type="checkbox" id={todo_id} checked={todo_done} readOnly={true} />

      <p className={`${todo_done && "line-through"} w-full cursor-text`}>
        {highlight ? (
          <label
            className="cursor-text highlight text-theme-primary-500 leading-7 text-xl"
            htmlFor={todo_id}
          >
            <p>{todo_description}</p>
          </label>
        ) : (
          <label className="cursor-text" htmlFor={todo_id}>
            <p>{todo_description}</p>
          </label>
        )}
      </p>
    </div>
  );
};
