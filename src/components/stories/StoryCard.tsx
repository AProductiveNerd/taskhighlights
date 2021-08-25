import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Useful_Todo, todo_id } from "../../constants/Types";

import { StoryTask } from "./StoryTask";
import { useState } from "react";

export const StoryCard = ({
  todos,
  loggedInSame
}: {
  todos: Useful_Todo[];
  loggedInSame: boolean;
}): JSX.Element => {
  const [highlights, setHighlights] = useState(null);
  const [normalTodos, setNormalTodos] = useState(null);

  setHighlights(todos.filter((todo) => todo.todo_highlight === true));
  setNormalTodos(todos.filter((todo) => todo.todo_highlight === false));

  const stateReload = (todo_id: todo_id): void => {
    const newNormal = [...normalTodos];
    const newHighlight = [...highlights];

    for (let i = 0; i < newNormal.length; i++) {
      if (newNormal[i].todo_id === todo_id) {
        newNormal.splice(i, 1);
      }
    }

    setNormalTodos(newNormal);

    for (let i = 0; i < newHighlight.length; i++) {
      if (newHighlight[i].todo_id === todo_id) {
        newHighlight.splice(i, 1);
      }
    }
    setHighlights(newHighlight);
  };

  return (
    <div className="noScrollbar relative space-y-5 max-h-[80vh] w-11/12 sm:max-w-md md:max-w-lg py-4 px-8 bg-theme-blueGray-800 shadow-lg rounded-lg mx-auto selection:bg-theme-primary-500/60 overflow-y-scroll overflow-x-hidden">
      <div className="space-y-2">
        {highlights &&
          highlights.map((highlight) => (
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
