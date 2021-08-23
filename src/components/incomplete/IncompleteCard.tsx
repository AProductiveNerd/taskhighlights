import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useContext, useEffect, useState } from "react";

import { IncompleteTask } from "./IncompleteTask";
import { Useful_Todo } from "../../constants/Types";
import { User } from "@prisma/client";
import UserContext from "./../../contexts/UserContext";
import { fetch_getAllIncompleteTodosByPage } from "../../utils/fetchHelpers";

// ! Limit the number of tasks a user can add to amplify the constraints lead to creativity effect

export const IncompleteCard = (): JSX.Element => {
  const [todos, setTodos] = useState<Useful_Todo[]>(null);
  const [addedCounter, setAddedCounter] = useState<number>(0);

  const currentUser: User = useContext(UserContext);

  useEffect(() => {
    (async () => {
      const fetchedTodos = await fetch_getAllIncompleteTodosByPage(
        currentUser?.user_id
      );
      if (JSON.stringify(fetchedTodos) !== JSON.stringify(todos)) {
        setTodos(fetchedTodos);
      }
    })();
  }, [currentUser?.user_id, todos, addedCounter]);

  const stateReload = (): void => {
    setAddedCounter(addedCounter + 1);
  };

  return (
    <div className="noScrollbar relative space-y-5 max-h-[80vh] w-11/12 sm:max-w-md md:max-w-lg py-4 px-8 bg-theme-blueGray-800 shadow-lg rounded-lg mx-auto selection:bg-theme-primary-500/60 overflow-y-scroll overflow-x-hidden">
      <div className="flex justify-between items-center">
        <p className="text-4xl">Incomplete Todos</p>
      </div>

      <hr className="border-dashed" />

      <div className="space-y-2">
        {todos ? (
          todos?.map((todo: Useful_Todo) => (
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
      </div>
    </div>
  );
};
