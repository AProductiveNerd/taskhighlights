import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { type_Useful_Todo, type_todo_id } from "../../constants/Types";
import { useEffect, useState } from "react";

import { Card } from "../layout/Card";
import { StoryTask } from "./StoryTask";

export const StoryCard = ({
  todos,
  loggedInSame,
}: {
  todos: type_Useful_Todo[];
  loggedInSame: boolean;
}): JSX.Element => {
  const [highlights, setHighlights] = useState(null);
  const [normalTodos, setNormalTodos] = useState(null);

  useEffect(() => {
    setHighlights(todos.filter((todo) => todo.todo_highlight === true));
    setNormalTodos(todos.filter((todo) => todo.todo_highlight === false));
  }, [todos]);

  const stateReload = (todo_id: type_todo_id): void => {
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
    <Card
      spaced_elements={
        <>
          {highlights &&
            highlights.map((highlight: type_Useful_Todo) => (
              <StoryTask
                key={highlight.todo_id}
                todo={highlight}
                highlight={true}
                loggedInSame={loggedInSame}
                stateReload={stateReload}
              />
            ))}

          {normalTodos ? (
            normalTodos.map((todo: type_Useful_Todo) => (
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
        </>
      }
      title="Story"
    />
  );
};
