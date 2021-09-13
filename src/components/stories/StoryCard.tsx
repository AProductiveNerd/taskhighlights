import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Useful_Todo, todo_id } from "../../constants/Types";
import { useEffect, useState } from "react";

import { StoryTask } from "./StoryTask";

export const StoryCard = ({
  todos,
  loggedInSame
}: {
  todos: Useful_Todo[];
  loggedInSame: boolean;
}): JSX.Element => {
  const [highlights, setHighlights] = useState(null);
  const [normalTodos, setNormalTodos] = useState(null);

  useEffect(() => {
    setHighlights(todos.filter((todo) => todo.todo_highlight === true));
    setNormalTodos(todos.filter((todo) => todo.todo_highlight === false));
  }, [todos]);

  const stateReload = (todo_id: todo_id): void => {
    const newHigh = [...highlights];
    const newNorm = [...normalTodos];

    for (let i = 0; i < newHigh.length; i++) {
      if (newHigh[i].todo_id === todo_id) {
        newHigh.splice(i, 1);
      }
    }

    for (let i = 0; i < newNorm.length; i++) {
      if (newNorm[i].todo_id === todo_id) {
        newNorm.splice(i, 1);
      }
    }

    setHighlights(newHigh);
    setNormalTodos(newNorm);
  };

  return (
    <div className="noScrollbar relative space-y-5 max-h-[80vh] w-11/12 sm:max-w-md md:max-w-lg py-4 px-8 bg-theme-blueGray-800 shadow-lg rounded-lg mx-auto overflow-y-scroll overflow-x-hidden">
      <div className="space-y-2">
        {highlights &&
          highlights.map((highlight: Useful_Todo) => (
            <StoryTask
              key={highlight.todo_id}
              todo={highlight}
              highlight={true}
              loggedInSame={loggedInSame}
              stateReload={stateReload}
            />
          ))}

        {normalTodos ? (
          normalTodos.map((todo: Useful_Todo) => (
            <StoryTask
              todo={todo}
              key={todo.todo_id}
              loggedInSame={loggedInSame}
              stateReload={stateReload}
            />
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
