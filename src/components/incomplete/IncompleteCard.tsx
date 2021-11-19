import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useContext, useEffect, useState } from "react";

import { Card } from "../layout/Card";
import FireUserContext from "../../contexts/FireUserContext";
import { IncompleteTask } from "./IncompleteTask";
import { fetch_getAllIncompleteTodos } from "../../utils/fetchHelpers";
import { type_Useful_Todo } from "../../constants/Types";

// ! Limit the number of tasks a user can add to amplify the constraints lead to creativity effect

export const IncompleteCard = (): JSX.Element => {
  const [todos, setTodos] = useState<type_Useful_Todo[]>(null);
  const [addedCounter, setAddedCounter] = useState<number>(0);

  const fireId = useContext(FireUserContext);

  useEffect(() => {
    (async () => {
      const fetchedTodos = await fetch_getAllIncompleteTodos();
      if (JSON.stringify(fetchedTodos) !== JSON.stringify(todos)) {
        setTodos(fetchedTodos);
      }
    })();
  }, [todos, addedCounter, fireId]);

  const stateReload = (): void => {
    if (addedCounter < 50) {
      setAddedCounter(addedCounter + 1);
    } else {
      setAddedCounter(0);
    }
  };

  return (
    <Card
      spaced_elements={
        <>
          {todos ? (
            todos?.map((todo: type_Useful_Todo) => (
              <IncompleteTask
                todo={todo}
                key={todo.todo_id}
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
      title="Incomplete Todos"
      // title={`Incomplete Todos (${todos ? todos.length : null})`}
    />
  );
};
