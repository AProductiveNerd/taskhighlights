import { Useful_Habit, todo_done } from "../../constants/Types";

import { IndividualItem } from "../layout/IndividualItem";
import { onClick_toggleHabitDone } from "../../utils/onClickHelpers";
import { useState } from "react";

export const IndividualHabit = ({
  habit: { habit_description, habit_done: db_done, habit_id }
}: {
  habit: Useful_Habit;
}): JSX.Element => {
  const [habit_state, setHabitState] = useState<todo_done>(db_done);

  return (
    <IndividualItem
      input_checkbox={
        <input
          type="checkbox"
          id={habit_id}
          defaultChecked={habit_state}
          onChange={() => {
            setHabitState(!db_done);
            onClick_toggleHabitDone({
              habit_done: habit_state,
              habit_id
            });
          }}
        />
      }
      onkeydowncapture_callback={null}
      text_input_p={
        <p className={`${habit_state && "line-through"} w-full cursor-pointer`}>
          <label className="cursor-pointer" htmlFor={habit_id}>
            <p>{habit_description}</p>
          </label>
        </p>
      }
    />
  );
};
