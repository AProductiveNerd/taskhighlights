import { Routine_Templates, User } from "@prisma/client";
import { useContext, useEffect, useState } from "react";

import { ChevronUpIcon } from "@heroicons/react/solid";
import { Disclosure } from "@headlessui/react";
import UserContext from "../../contexts/UserContext";
import { fetch_getAllUserTemplates } from "../../utils/fetchHelpers";

export const RoutineCard = (): JSX.Element => {
  const currentUser: User = useContext(UserContext);
  const [routines, setRoutines] = useState<Routine_Templates[]>(null);

  useEffect(() => {
    (async () => {
      const templates: Routine_Templates[] = await fetch_getAllUserTemplates(
        currentUser?.user_id
      );

      if (JSON.stringify(templates) !== JSON.stringify(routines)) {
        setRoutines(templates);
      }
    })();
  }, [currentUser?.user_id, routines]);

  return (
    <div className="noScrollbar relative space-y-5 max-h-[80vh] w-11/12 sm:max-w-md md:max-w-lg py-4 px-8 bg-theme-blueGray-800 shadow-lg rounded-lg mx-auto selection:bg-theme-primary-500/60 overflow-y-scroll overflow-x-hidden">
      <div className="flex justify-between items-center">
        <p className="text-4xl">Routines</p>
      </div>

      <hr className="border-dashed" />

      <div className="space-y-2">
        {routines?.map((routine) => (
          <Disclosure key={routine.template_id}>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                  <span>{routine.template_title}</span>

                  <ChevronUpIcon
                    className={`${
                      open && "rotate-[180deg]"
                    } w-5 h-5 text-purple-500`}
                  />
                </Disclosure.Button>

                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                  {routine.template_habits.map((habit) => (
                    <p key={habit}>{habit}</p>
                  ))}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </div>
    </div>
  );
};
