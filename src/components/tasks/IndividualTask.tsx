import { Todo } from "@prisma/client";

export const IndividualTask = ({ todo_description }: Todo): JSX.Element => {
  console.log("hi");
  console.log(todo_description);
  return (
    <div>
      {/* <h1>{todo_description}</h1> */}
      <h1>asd;alskdjasd</h1>
    </div>
  );
};
