import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import {
  type_Page_and_Todos,
  type_Useful_Todo,
  type_user_id,
} from "../../constants/Types";
import { useContext, useEffect, useState } from "react";

import { Card } from "../layout/Card";
import FireUserContext from "../../contexts/FireUserContext";
import { IndividualPageTask } from "./IndividualPageTask";
import dynamic from "next/dynamic";
import { fetch_createRetPageByTitle } from "../../utils/fetchHelpers";

// import { AddPageTask } from "./AddPageTask";

const DynamicAddPageTask = dynamic(() => import("./AddPageTask"));

export const PageCard = ({ title }: { title: string }): JSX.Element => {
  const [currentPage, setCurrentPage] = useState<type_Page_and_Todos>(null);
  const [currentTodos, setCurrentTodos] = useState<type_Useful_Todo[]>(null);
  const [addedCounter, setAddedCounter] = useState<number>(0);

  const fireId: type_user_id = useContext(FireUserContext);

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
        <DynamicAddPageTask
          user={fireId}
          page={currentPage?.page_id}
          stateReload={stateReload}
        />
      }
      spaced_elements={
        <>
          {currentTodos ? (
            currentTodos?.map((todo: type_Useful_Todo) => (
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
