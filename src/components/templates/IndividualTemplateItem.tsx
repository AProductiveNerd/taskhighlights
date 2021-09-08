import { AddItemToTemplate } from "./AddItemToTemplate";
import { ChevronUpIcon } from "@heroicons/react/outline";
import { Disclosure } from "@headlessui/react";
import { Routine_Templates } from "@prisma/client";

export const IndividualTemplateItem = ({
  routine,
  stateReload
}: {
  stateReload: VoidFunction;
  routine: Routine_Templates;
}): JSX.Element => {
  return (
    <Disclosure key={routine.template_id}>
      {({ open }) => (
        <>
          <Disclosure.Button className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white/70 bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 space-x-3">
            <div className="flex justify-between w-full items-center text-lg text-theme-blueGray-300">
              {routine.template_title}

              <AddItemToTemplate
                stateReload={stateReload}
                template_id={routine.template_id}
              />
            </div>

            <ChevronUpIcon
              className={`${
                open && "rotate-[180deg]"
              } w-5 h-5 text-theme-blueGray-300`}
            />
          </Disclosure.Button>

          <Disclosure.Panel className="px-4 text-base text-gray-500 mx-auto">
            <ol className="list-decimal list-outside">
              {routine.template_habits.map((habit) => (
                <li className="text-theme-blueGray-300 w-max" key={habit}>
                  {habit}
                </li>
              ))}
            </ol>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
