import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import { StoryTask } from "./StoryTask";
import { Useful_Todo } from "../../constants/Types";

export const StoryCard = ({ todos }: { todos: Useful_Todo[] }): JSX.Element => {
  const highlights = todos.filter((todo) => todo.todo_highlight === true);

  const normalTodos = todos.filter((todo) => todo.todo_highlight === false);

  return (
    <div className="noScrollbar relative space-y-5 max-h-[80vh] w-11/12 sm:max-w-md md:max-w-lg py-4 px-8 bg-theme-blueGray-800 shadow-lg rounded-lg mx-auto selection:bg-theme-primary-500/60 overflow-y-scroll overflow-x-hidden">
      <div className="space-y-2">
        {highlights &&
          highlights.map((highlight) => (
            <StoryTask
              key={highlight.todo_id}
              todo={highlight}
              highlight={true}
            />
          ))}

        {normalTodos ? (
          normalTodos.map((todo: Useful_Todo) => (
            <StoryTask todo={todo} key={todo.todo_id} />
          ))
        ) : (
          <SkeletonTheme color="#0F172A" highlightColor="#1E293B">
            <Skeleton count={10} height={20} />
          </SkeletonTheme>
        )}
      </div>
    </div>
  );
};
