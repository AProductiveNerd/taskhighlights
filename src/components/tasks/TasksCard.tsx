import { AddTask } from "./AddTask";
import { Page, Todo, User } from "@prisma/client";
import { useContext, useEffect, useState } from "react";
import { fetchPageRet } from "../../utils/fetchHelpers";
import UserContext from "./../../contexts/UserContext";
// import { IndividualTask } from "./IndividualTask";
import { fetchAllTodosByPage } from "./../../utils/fetchHelpers";

export const TasksCard = (): JSX.Element => {
  // ! Limit the number of tasks a user can add to amplify the constraints lead to creativity effect
  const [currentPage, setCurrentPage] = useState<Page>(null);
  const [pageTodos, setPageTodos] = useState<Todo[]>(null);

  const currentUser: User = useContext(UserContext);

  useEffect(() => {
    (async () => {
      const page: Page = await fetchPageRet(currentUser?.user_id);

      if (JSON.stringify(currentPage) !== JSON.stringify(page)) {
        setCurrentPage(page);
      }
    })();
  }, [currentPage, currentUser]);

  useEffect(() => {
    if (currentPage?.page_id) {
      (async () => {
        const todos: Todo[] = await fetchAllTodosByPage(currentPage?.page_id);
        if (JSON.stringify(pageTodos) !== JSON.stringify(todos)) {
          setPageTodos(todos);
        }
      })();
    }
  }, [currentPage, currentUser, pageTodos]);

  return (
    <div className="noScrollbar space-y-5 max-h-[80vh] w-11/12 sm:max-w-md md:max-w-lg py-4 px-8 bg-theme-blueGray-800 shadow-lg rounded-lg mx-auto selection:bg-theme-primary-500/60 overflow-y-scroll overflow-x-hidden">
      <div className="flex justify-between items-center">
        <p>{currentPage?.page_title}</p>
        <AddTask user={currentUser?.user_id} page={currentPage?.page_id} />
      </div>
      <hr className="border-dashed" />
      <div>
        {/* {pageTodos?.map((todo) => {
					<IndividualTask />;
				})} */}
      </div>
    </div>
  );
};
