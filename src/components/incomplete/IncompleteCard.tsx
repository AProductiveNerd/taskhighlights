import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useContext, useEffect, useState } from "react";

import { Card } from "../layout/Card";
import FireUserContext from "../../contexts/FireUserContext";
import { IncompleteTask } from "./IncompleteTask";
import { Todo } from "@prisma/client";
import { fetch_getAllIncompleteTodos } from "../../utils/fetchHelpers";

// ! Limit the number of tasks a user can add to amplify the constraints lead to creativity effect

export const IncompleteCard = (): JSX.Element => {
  const [todos, setTodos] = useState<Todo[]>(null);
  const [addedCounter, setAddedCounter] = useState<number>(0);
  // const [serverCounter, setServerCounter] = useState<number>(0);
  const [shouldUseServer, setShouldUseServer] = useState(true);
  const fireId = useContext(FireUserContext);
  console.log(shouldUseServer);

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
  // const serverReload = (): void => {
  //   if (serverCounter < 50) {
  //     setServerCounter(serverCounter + 1);
  //   } else {
  //     setServerCounter(0);
  //   }
  // };
  return (
    <Card
      spaced_elements={
        <>
          {todos ? (
            todos?.map((todo: Todo) => (
              <IncompleteTask
                todo={todo}
                key={todo.todo_id}
                stateReload={stateReload}
                setShouldUseServer={setShouldUseServer}
              />
            ))
          ) : (
            <SkeletonTheme baseColor="#0F172A" highlightColor="#1E293B">
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
