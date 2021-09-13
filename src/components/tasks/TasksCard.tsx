import { FastForwardIcon, RewindIcon } from "@heroicons/react/solid";
import { Page_Story_Todos, Useful_Todo, user_id } from "../../constants/Types";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useContext, useEffect, useState } from "react";

import { AddTask } from "./AddTask";
import FireUserContext from "../../contexts/FireUserContext";
import { IndividualTask } from "./IndividualTask";
import { Story } from "@prisma/client";
import { fetch_createRetDailyPage } from "../../utils/fetchHelpers";

// ! Limit the number of tasks a user can add to amplify the constraints lead to creativity effect

export const TasksCard = (): JSX.Element => {
  const [currentPage, setCurrentPage] = useState<Page_Story_Todos>(null);
  const [currentTodos, setCurrentTodos] = useState<Useful_Todo[]>(null);
  const [addedCounter, setAddedCounter] = useState<number>(0);
  const [back_date_num, setBack_date_num] = useState<number>(0);
  const [currentHighlight, setCurrentHighlight] = useState<Useful_Todo>(null);
  const [story, set_story] = useState<Story>(null);

  const fireId: user_id = useContext(FireUserContext);

  useEffect(() => {
    (async () => {
      const today: string = new Date(
        new Date().setDate(new Date().getDate() - back_date_num)
      ).toLocaleDateString("en-GB");

      const page = await fetch_createRetDailyPage(fireId, today);

      if (JSON.stringify(currentPage) !== JSON.stringify(page)) {
        setCurrentPage(page);
      }
    })();
  }, [addedCounter, back_date_num, currentPage, fireId]);

  useEffect(() => {
    const fetchedTodos = currentPage?.Page_Todo;

    if (JSON.stringify(currentTodos) !== JSON.stringify(fetchedTodos)) {
      const noHighlight = fetchedTodos?.filter(
        (todo) => todo.todo_highlight === false
      );

      setCurrentTodos(noHighlight);
    }

    const highlightTask = fetchedTodos?.filter(
      (todo: Useful_Todo) => todo?.todo_highlight === true
    );

    if (highlightTask) {
      setCurrentHighlight(highlightTask[0]);
    } else {
      setCurrentHighlight(null);
    }
  }, [currentPage?.Page_Todo, currentTodos, setCurrentHighlight]);

  useEffect(() => {
    if (JSON.stringify(story) !== JSON.stringify(currentPage?.Page_Story)) {
      set_story(currentPage?.Page_Story);
    }
  }, [addedCounter, currentTodos, currentPage, story]);

  const stateReload = (): void => {
    if (addedCounter < 50) {
      setAddedCounter(addedCounter + 1);
    } else {
      setAddedCounter(0);
    }
  };

  return (
    <div
      className="
        noScrollbar relative space-y-5 max-h-[80vh] w-11/12
        sm:max-w-md md:max-w-lg py-5 px-[1.6rem]
        bg-theme-blueGray-800 shadow-lg rounded-lg mx-auto
        selection:bg-theme-primary-500/60
        overflow-y-scroll overflow-x-hidden
        filter backdrop-blur-3xl bg-opacity-40
      "
    >
      <div className="flex justify-between items-center">
        <p className="text-4xl">
          {currentPage?.page_title ||
            new Date(
              new Date().setDate(new Date().getDate() - back_date_num)
            ).toLocaleDateString("en-GB")}
        </p>

        <AddTask
          user={fireId}
          page={currentPage?.page_id}
          count={currentTodos?.length}
          highlight={currentHighlight}
          stateReload={stateReload}
        />
      </div>

      <hr className="border-dashed" />

      <div className="space-y-1">
        {currentHighlight && story && (
          <IndividualTask
            todo={currentHighlight}
            highlight={true}
            story={story}
            stateReload={stateReload}
            highlightCount={1}
          />
        )}

        {currentTodos && story ? (
          currentTodos?.map((todo: Useful_Todo) => (
            <IndividualTask
              todo={todo}
              story={story}
              key={todo.todo_id}
              stateReload={stateReload}
              highlightCount={currentHighlight ? 1 : 0}
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
