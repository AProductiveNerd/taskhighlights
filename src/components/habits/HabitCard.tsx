import { FastForwardIcon, RewindIcon } from "@heroicons/react/solid";
import { Routine_and_Habits, Useful_Habit } from "../../constants/Types";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useContext, useEffect, useState } from "react";

import { IndividualHabit } from "./IndividualHabit";
import { User } from "@prisma/client";
import UserContext from "../../contexts/UserContext";
import { fetch_createRetDailyRoutine } from "../../utils/fetchHelpers";

// ! Limit the number of tasks a user can add to amplify the constraints lead to creativity effect

export const HabitCard = (): JSX.Element => {
  const [currentRoutine, setCurrentRoutine] =
    useState<Routine_and_Habits>(null);
  const [back_date_num, setBack_date_num] = useState<number>(0);
  const [routineHabits, setRoutineHabits] = useState<Useful_Habit[]>(null);
  const currentUser: User = useContext(UserContext);

  useEffect(() => {
    (async () => {
      const today: string = new Date(
        new Date().setDate(new Date().getDate() - back_date_num)
      ).toLocaleDateString("en-GB");

      const routine = await fetch_createRetDailyRoutine(
        currentUser?.user_id,
        today
      );

      if (JSON.stringify(routine) !== JSON.stringify(currentRoutine)) {
        setCurrentRoutine(routine);

        if (
          JSON.stringify(routineHabits) !==
          JSON.stringify(routine?.Routine_Habits)
        ) {
          setRoutineHabits(routine?.Routine_Habits);
        }
      }
    })();
  }, [back_date_num, currentRoutine, currentUser?.user_id, routineHabits]);

  return (
    <div className="noScrollbar relative space-y-5 max-h-[80vh] w-11/12 sm:max-w-md md:max-w-lg py-4 px-8 bg-theme-blueGray-800 shadow-lg rounded-lg mx-auto selection:bg-theme-primary-500/60 overflow-y-scroll overflow-x-hidden">
      <div className="flex justify-between items-center">
        <p className="text-4xl">
          {currentRoutine?.routine_title ||
            new Date(
              new Date().setDate(new Date().getDate() - back_date_num)
            ).toLocaleDateString("en-GB")}
        </p>
      </div>

      <hr className="border-dashed" />

      <div className="space-y-2">
        {routineHabits ? (
          routineHabits?.map((habit: Useful_Habit) => (
            <IndividualHabit habit={habit} key={habit.habit_id} />
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
