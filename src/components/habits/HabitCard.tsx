import { FastForwardIcon, RewindIcon } from "@heroicons/react/solid";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import {
  fetch_createRetDailyRoutine,
  fetch_getAllUserTemplates,
} from "../../utils/fetchHelpers";
import {
  type_Routine_and_Habits,
  type_Useful_Habit,
  type_template_id,
  type_template_title,
  type_user_id,
} from "../../constants/Types";
import { useContext, useEffect, useState } from "react";

import { Card } from "../layout/Card";
import FireUserContext from "../../contexts/FireUserContext";
import { IndividualHabit } from "./IndividualHabit";
import { Template } from "@prisma/client";
import dynamic from "next/dynamic";

// import { UseTemplate } from "./UseTemplate";

const DynamicUseTemplate = dynamic(() => import("./UseTemplate"));
// ! Limit the number of tasks a user can add to amplify the constraints lead to creativity effect

export const HabitCard = (): JSX.Element => {
  const fireId: type_user_id = useContext(FireUserContext);
  const [addedCounter, setAddedCounter] = useState<number>(0);
  const [currentRoutine, setCurrentRoutine] =
    useState<type_Routine_and_Habits>(null);
  const [back_date_num, setBack_date_num] = useState<number>(0);
  const [routineHabits, setRoutineHabits] = useState<type_Useful_Habit[]>(null);
  const [my_template_data, set_my_template_data] = useState<
    {
      template_title: type_template_title;
      template_id: type_template_id;
    }[]
  >(null);

  // GETS THE TASKS ALREADY IN THE ROUTINE PAGE
  useEffect(() => {
    (async () => {
      const today: string = new Date(
        new Date().setDate(new Date().getDate() - back_date_num)
      ).toLocaleDateString("en-GB");

      const routine = await fetch_createRetDailyRoutine(fireId, today);

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
  }, [back_date_num, currentRoutine, routineHabits, addedCounter, fireId]);

  // FETCHES THE TEMPLATES
  useEffect(() => {
    (async () => {
      const templates: Template[] = await fetch_getAllUserTemplates(fireId);

      if (templates) {
        templates.sort();

        const template_data: {
          template_title: type_template_title;
          template_id: type_template_id;
        }[] = templates.map((t) => {
          return {
            template_title: t.template_title,
            template_id: t.template_id,
          };
        });

        if (
          JSON.stringify(template_data) !== JSON.stringify(my_template_data)
        ) {
          set_my_template_data(template_data);
        }
      }
    })();
  }, [fireId, my_template_data]);

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
        <DynamicUseTemplate
          stateReload={stateReload}
          routine_id={currentRoutine?.routine_id}
          template_data={my_template_data}
          user_id={fireId}
        />
      }
      spaced_elements={
        <>
          {routineHabits ? (
            routineHabits?.map((habit: type_Useful_Habit) => (
              <IndividualHabit habit={habit} key={habit.habit_id} />
            ))
          ) : (
            <SkeletonTheme color="#0F172A" highlightColor="#1E293B">
              <Skeleton count={10} height={20} />
            </SkeletonTheme>
          )}
        </>
      }
      title={
        currentRoutine?.routine_title ||
        new Date(
          new Date().setDate(new Date().getDate() - back_date_num)
        ).toLocaleDateString("en-GB")
      }
      buttons={
        <>
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
        </>
      }
    />
  );
};
