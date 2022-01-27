import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useContext, useEffect, useState } from "react";

import { ArchivedTask } from "./ArchivedTask";
import { Card } from "../layout/Card";
import FireUserContext from "../../contexts/FireUserContext";
import { Todo } from "@prisma/client";
import { are_args_same } from "../../utils/generalHelpers";
import { server_getAllArchivedTodosByPage } from "../../utils/serverHelpers";

export const ArchivedCard = (): JSX.Element => {
  const [todos, setTodos] = useState<Todo[]>(null);
  const [addedCounter, setAddedCounter] = useState<number>(0);
  const [shouldUseServer, setShouldUseServer] = useState(true);

  const fireId = useContext(FireUserContext);

  console.log(shouldUseServer);

  useEffect(() => {
    (async () => {
      const fetchedTodos = await server_getAllArchivedTodosByPage(fireId);
      if (!are_args_same(fetchedTodos, todos)) {
        setTodos(fetchedTodos);
      }
    })();
  }, [fireId, todos, addedCounter]);

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
            todos?.map(
              (todo: Todo) =>
                todo && (
                  <ArchivedTask
                    todo={todo}
                    key={todo.todo_id}
                    stateReload={stateReload}
                    setShouldUseServer={setShouldUseServer}
                  />
                )
            )
          ) : (
            <SkeletonTheme baseColor="#0F172A" highlightColor="#1E293B">
              <Skeleton count={10} height={20} />
            </SkeletonTheme>
          )}
        </>
      }
      title="Archived Todos"
    />
  );
};
