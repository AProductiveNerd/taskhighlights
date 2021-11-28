import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useContext, useEffect, useState } from "react";

import { ArchivedTask } from "./ArchivedTask";
import { Card } from "../layout/Card";
import FireUserContext from "../../contexts/FireUserContext";
import { Todo } from "@prisma/client";
import { are_args_same } from "../../utils/generalHelpers";
import { fetch_getAllArchivedTodos } from "../../utils/fetchHelpers";
import { indexDB_getAllArchivedTodos } from "../../utils/indexDBHelpers";

export const ArchivedCard = (): JSX.Element => {
  const [todos, setTodos] = useState<Todo[]>(null);
  const [addedCounter, setAddedCounter] = useState<number>(0);
  const [serverTodos, setServerTodos] = useState<Todo[]>(null);

  const fireId = useContext(FireUserContext);

  useEffect(() => {
    (async () => {
      const fetchedTodos = await indexDB_getAllArchivedTodos();
      if (serverTodos && !are_args_same(serverTodos, fetchedTodos)) {
        // indexDB_updateArchivedTodos(serverTodos);
        setTodos(serverTodos);
      } else if (!are_args_same(fetchedTodos, todos)) {
        setTodos(fetchedTodos);
      }
    })();
  }, [todos, addedCounter, serverTodos]);

  useEffect(() => {
    (async () => {
      const fetchedTodos = await fetch_getAllArchivedTodos(fireId);
      if (!are_args_same(fetchedTodos, serverTodos)) {
        setServerTodos(fetchedTodos);
      }
    })();
  }, [fireId, serverTodos]);

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
                  />
                )
            )
          ) : (
            <SkeletonTheme color="#0F172A" highlightColor="#1E293B">
              <Skeleton count={10} height={20} />
            </SkeletonTheme>
          )}
        </>
      }
      title="Archived Todos"
    />
  );
};
