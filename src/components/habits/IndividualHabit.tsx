import { Useful_Habit, todo_done } from "../../constants/Types";

import { onClick_toggleHabitDone } from "../../utils/onClickHelpers";
import { useState } from "react";

export const IndividualHabit = ({
  habit: { habit_description, habit_done: db_done, habit_id }
}: {
  habit: Useful_Habit;
}): JSX.Element => {
  const [habit_state, setHabitState] = useState<todo_done>(db_done);

  return (
    <div
      className="flex items-center space-x-2 text-left text-lg break-words leading-6 group"
      tabIndex={0}
    >
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

      <p className={`${habit_state && "line-through"} w-full cursor-pointer`}>
        <label className="cursor-pointer" htmlFor={habit_id}>
          <p>{habit_description}</p>
        </label>
      </p>
    </div>
  );
};
