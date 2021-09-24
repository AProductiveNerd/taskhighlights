import { Dialog, Transition } from "@headlessui/react";
import { Dispatch, Fragment, useEffect, useState } from "react";
import { page_title, user_id } from "../../constants/Types";

import Fuse from "fuse.js";
import Link from "next/link";
import { date_time_EN_GB } from "../../constants/Regexes";
import { fetch_getAllPageNamesByUserid } from "../../utils/fetchHelpers";

interface PageSearch_Props {
  user: user_id;
  isOpen: boolean;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
}

export const PageSearch = ({
  user,
  isOpen,
  setIsOpen
}: PageSearch_Props): JSX.Element => {
  const [page_names, set_page_names] = useState<page_title[]>(null);
  const [results, setResults] = useState([]);

  const options = {
    includeScore: true
  };

  useEffect(() => {
    (async () => {
      const names = await fetch_getAllPageNamesByUserid(user);
      if (JSON.stringify(page_names) !== JSON.stringify(names)) {
        set_page_names(names);
      }
    })();
  }, [page_names, user]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => setIsOpen(false)}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div
              className="
                  inline-block w-full
                  max-w-md p-6 my-8
                  overflow-hidden align-middle
                  transition-all transform
                  bg-theme-blueGray-800 shadow-lg
                  border-theme-primary-500
                  border-2 rounded-lg space-y-5
                  justify-center items-center flex-col
                  filter backdrop-blur-3xl bg-opacity-40
                "
            >
              <>
                <Dialog.Title
                  as="h3"
                  className="text-2xl font-medium leading-6 text-theme-blueGray-300 selection:bg-theme-primary-500/60"
                >
                  Add a task
                </Dialog.Title>
                <div className="mt-2">
                  <input
                    className="w-full bg-theme-blueGray-800 cursor-pointer text-theme-blueGray-300"
                    onKeyDown={(event) => {
                      if (event.key === "Escape") {
                        setIsOpen(false);
                      }
                    }}
                    onChange={({ target }) => {
                      const fuse = new Fuse(page_names, options);
                      setResults(fuse.search(target.value));
                    }}
                  />
                </div>

                <div className="mt-4 flex justify-center space-x-6 text-theme-blueGray-300 selection:bg-theme-primary-500/60">
                  <button
                    type="button"
                    aria-label="Close add tasks popup"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium bg-theme-primary-500/60 border border-transparent rounded-md hover:bg-theme-primary-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 text-theme-blueGray-50"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    aria-label="Close add tasks popup"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium bg-theme-primary-500/60 border border-transparent rounded-md hover:bg-theme-primary-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  >
                    Submit
                  </button>
                </div>

                <div className="flex">
                  {results.map((result) => (
                    <Link
                      href={
                        date_time_EN_GB.test(result.item)
                          ? `/app?date=${result.item}`
                          : `/p/${result.item}`
                      }
                      key={result.item}
                    >
                      <a>{result.item}</a>
                    </Link>
                  ))}
                </div>
              </>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
