import { Page_and_Todos, Useful_Todo, user_id } from "../../constants/Types";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useContext, useEffect, useState } from "react";

import { AddPageTask } from "./AddPageTask";
import { Card } from "../layout/Card";
import FireUserContext from "../../contexts/FireUserContext";
import { IndividualPageTask } from "./IndividualPageTask";
import { fetch_createRetPageByTitle } from "../../utils/fetchHelpers";

export const PageCard = ({ title }: { title: string }): JSX.Element => {
  const [currentPage, setCurrentPage] = useState<Page_and_Todos>(null);
  const [currentTodos, setCurrentTodos] = useState<Useful_Todo[]>(null);
  const [addedCounter, setAddedCounter] = useState<number>(0);

  const fireId: user_id = useContext(FireUserContext);

  useEffect(() => {
    (async () => {
      const page = await fetch_createRetPageByTitle(fireId, title);

      if (JSON.stringify(currentPage) !== JSON.stringify(page)) {
        setCurrentPage(page);
      }
    })();
  }, [addedCounter, currentPage, fireId, title]);

  useEffect(() => {
    const fetchedTodos = currentPage?.Page_Todo;

    if (JSON.stringify(currentTodos) !== JSON.stringify(fetchedTodos)) {
      setCurrentTodos(fetchedTodos);
    }
  }, [currentPage?.Page_Todo, currentTodos]);

  const stateReload = (): void => {
    if (addedCounter < 50) {
      setAddedCounter(addedCounter + 1);
    } else {
      setAddedCounter(0);
    }
  };

  return (
    <Card
      action_component={
        <AddPageTask
          user={fireId}
          page={currentPage?.page_id}
          stateReload={stateReload}
        />
      }
      spaced_elements={
        <>
          {currentTodos ? (
            currentTodos?.map((todo: Useful_Todo) => (
              <IndividualPageTask
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
      title={currentPage?.page_title || "Page"}
    />
  );
};
