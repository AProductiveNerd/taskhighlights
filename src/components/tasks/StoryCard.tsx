import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Story_and_Todos, Useful_Todo } from "../../constants/Types";

import { StoryTask } from "./StoryTask";

export const StoryCard = ({
  story_and_todo
}: {
  story_and_todo: Story_and_Todos;
}): JSX.Element => {
  const highlight = story_and_todo.Story_Todo.filter(
    (todo) => todo.todo_highlight === true
  )[0];

  const story = story_and_todo;

  const pageTodos = story_and_todo.Story_Todo.filter(
    (todo) => todo.todo_highlight !== true
  );

  return (
    <div className="noScrollbar relative space-y-5 max-h-[80vh] w-11/12 sm:max-w-md md:max-w-lg py-4 px-8 bg-theme-blueGray-800 shadow-lg rounded-lg mx-auto selection:bg-theme-primary-500/60 overflow-y-scroll overflow-x-hidden">
      <div className="space-y-2">
        {highlight && story && <StoryTask todo={highlight} highlight={true} />}

        {pageTodos && story ? (
          pageTodos?.map((todo: Useful_Todo) => (
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
