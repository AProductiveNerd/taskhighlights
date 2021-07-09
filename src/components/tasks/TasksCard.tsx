import { User } from "@prisma/client";
import { useContext, useEffect, useState } from "react";
import { fetchPageRet } from "../../utils/fetchHelpers";
import { Page_and_Todos, Useful_Todo } from "../../utils/prismaHelpers";
import UserContext from "./../../contexts/UserContext";

import { AddTask } from "./AddTask";
import { IndividualTask } from "./IndividualTask";
// ! Limit the number of tasks a user can add to amplify the constraints lead to creativity effect

export const TasksCard = (): JSX.Element => {
  const [currentPage, setCurrentPage] = useState<Page_and_Todos>(null);
  const [pageTodos, setPageTodos] = useState<Useful_Todo[]>(null);
  const [addedCounter, setAddedCounter] = useState<number>(0);

  const currentUser: User = useContext(UserContext);

  useEffect(() => {
    (async () => {
      const page: Page_and_Todos = await fetchPageRet(currentUser?.user_id);

      if (JSON.stringify(currentPage) !== JSON.stringify(page)) {
        setCurrentPage(page);
        if (JSON.stringify(pageTodos) !== JSON.stringify(page.Page_Todo)) {
          setPageTodos(page?.Page_Todo);
        }
      }
    })();
  }, [currentPage, currentUser?.user_id, addedCounter, pageTodos]);

  return (
    <div className="noScrollbar space-y-5 max-h-[80vh] w-11/12 sm:max-w-md md:max-w-lg py-4 px-8 bg-theme-blueGray-800 shadow-lg rounded-lg mx-auto selection:bg-theme-primary-500/60 overflow-y-scroll overflow-x-hidden">
      <div className="flex justify-between items-center">
        <p className="text-4xl">{currentPage?.page_title}</p>
        <AddTask
          user={currentUser?.user_id}
          page={currentPage?.page_id}
          addedCounter={addedCounter}
          setAddedCounter={setAddedCounter}
        />
      </div>
      <hr className="border-dashed" />
      <div>
        {pageTodos?.map((todo: Useful_Todo) => (
          <IndividualTask
            todo={todo}
            key={todo.todo_id}
            addedCounter={addedCounter}
            setAddedCounter={setAddedCounter}
          />
        ))}
      </div>
    </div>
  );
};
