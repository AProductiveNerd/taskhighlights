import { Todo } from "@prisma/client";

export const IndividualTask = ({
  todo: { todo_description, todo_done }
}: {
  todo: Todo;
}): JSX.Element => {
  return (
    <div className="flex items-center space-x-2">
      <input type="checkbox" defaultChecked={todo_done} />
      <p>{todo_description}</p>
      <h2></h2>
    </div>
  );
};
