import { FastForwardIcon, RewindIcon } from "@heroicons/react/solid";
import { Page_Story_Todos, Useful_Todo } from "../../constants/Types";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Story, User } from "@prisma/client";
import { useContext, useEffect, useState } from "react";

import { AddTask } from "./AddTask";
import { IndividualTask } from "./IndividualTask";
import UserContext from "./../../contexts/UserContext";
import { fetch_createRetDailyPage } from "../../utils/fetchHelpers";

// ! Limit the number of tasks a user can add to amplify the constraints lead to creativity effect

export const TasksCard = (): JSX.Element => {
  const [currentPage, setCurrentPage] = useState<Page_Story_Todos>(null);
  const [pageTodos, setPageTodos] = useState<Useful_Todo[]>(null);
  const [addedCounter, setAddedCounter] = useState<number>(0);
  const [back_date_num, setBack_date_num] = useState<number>(0);
  const [highlight, setHighlight] = useState<Useful_Todo>(null);
  const [story, set_story] = useState<Story>(null);

  const currentUser: User = useContext(UserContext);

  useEffect(() => {
    (async () => {
      const today: string = new Date(
        new Date().setDate(new Date().getDate() - back_date_num)
      ).toLocaleDateString("en-GB");

      const page = await fetch_createRetDailyPage(currentUser?.user_id, today);
      if (JSON.stringify(currentPage) !== JSON.stringify(page)) {
        setCurrentPage(page);

        if (JSON.stringify(pageTodos) !== JSON.stringify(page.Page_Todo)) {
          const noHighlight = page?.Page_Todo.filter(
            (todo) => todo.todo_highlight === false
          );
          setPageTodos(noHighlight);

          const highlightTask = page?.Page_Todo.filter(
            (todo) => todo.todo_highlight === true
          );
          setHighlight(highlightTask[0]);
        }
      }
    })();
  }, [
    currentPage,
    currentUser?.user_id,
    addedCounter,
    pageTodos,
    back_date_num,
    story
  ]);

  useEffect(() => {
    if (JSON.stringify(story) !== JSON.stringify(currentPage?.Page_Story)) {
      set_story(currentPage?.Page_Story);
    }
  }, [addedCounter, pageTodos, currentPage, story]);

  const stateReload = (): void => {
    setAddedCounter(addedCounter + 1);
  };

  return (
    <div className="noScrollbar space-y-5 max-h-[80vh] w-11/12 sm:max-w-md md:max-w-lg py-4 px-8 bg-theme-blueGray-800 shadow-lg rounded-lg mx-auto selection:bg-theme-primary-500/60 overflow-y-scroll overflow-x-hidden">
      <div className="flex justify-between items-center">
        <p className="text-4xl">
          {currentPage?.page_title ||
            new Date(
              new Date().setDate(new Date().getDate() - back_date_num)
            ).toLocaleDateString("en-GB")}
        </p>

        <AddTask
          user={currentUser?.user_id}
          page={currentPage?.page_id}
          count={pageTodos?.length}
          highlight={highlight}
          stateReload={stateReload}
        />
      </div>

      <hr className="border-dashed" />

      <div className="space-y-2">
        {highlight && story && (
          <IndividualTask
            todo={highlight}
            highlight={true}
            story={story}
            stateReload={stateReload}
            highlightCount={1}
          />
        )}

        {pageTodos && story ? (
          pageTodos?.map((todo: Useful_Todo) => (
            <IndividualTask
              todo={todo}
              story={story}
              key={todo.todo_id}
              stateReload={stateReload}
              highlightCount={highlight ? 1 : 0}
            />
          ))
        ) : (
          <SkeletonTheme color="#0F172A" highlightColor="#1E293B">
            <Skeleton count={10} height={20} />
          </SkeletonTheme>
        )}
      </div>

      <div className="flex justify-between">
        <button
          aria-label="Go to previous date page"
          onClick={() => setBack_date_num(back_date_num + 1)}
        >
          <RewindIcon className="w-6 h-6" />
        </button>

        <button
          aria-label="Go to next date page"
          onClick={() => setBack_date_num(back_date_num - 1)}
        >
          <FastForwardIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
