import { Routine_Templates, User } from "@prisma/client";
import { useContext, useEffect, useState } from "react";

import { CreateTemplate } from "./CreateTemplate";
import { IndividualRoutine } from "./IndividualRoutine";
import UserContext from "../../contexts/UserContext";
import { fetch_getAllUserTemplates } from "../../utils/fetchHelpers";

export const RoutineCard = (): JSX.Element => {
  const currentUser: User = useContext(UserContext);
  const [routines, setRoutines] = useState<Routine_Templates[]>(null);
  const [addedCounter, setAddedCounter] = useState<number>(0);

  useEffect(() => {
    (async () => {
      const templates: Routine_Templates[] = await fetch_getAllUserTemplates(
        currentUser?.user_id
      );

      if (JSON.stringify(templates) !== JSON.stringify(routines)) {
        setRoutines(templates);
      }
    })();
  }, [currentUser?.user_id, routines, addedCounter]);

  const stateReload = (): void => {
    setAddedCounter(addedCounter + 1);
  };

  return (
    <div className="noScrollbar relative space-y-5 max-h-[80vh] w-11/12 sm:max-w-md md:max-w-lg py-4 px-8 bg-theme-blueGray-800 shadow-lg rounded-lg mx-auto selection:bg-theme-primary-500/60 overflow-y-scroll overflow-x-hidden">
      <div className="flex justify-between items-center">
        <p className="text-4xl flex w-full justify-between">
          Routines{" "}
          <CreateTemplate
            stateReload={stateReload}
            user_id={currentUser?.user_id}
          />
        </p>
      </div>

      <hr className="border-dashed" />

      <div className="space-y-2 flex flex-col">
        {routines?.map((routine) => (
          <IndividualRoutine
            routine={routine}
            key={routine.template_id}
            stateReload={stateReload}
          />
        ))}
      </div>
    </div>
  );
};
