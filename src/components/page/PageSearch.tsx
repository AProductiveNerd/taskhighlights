import { Dialog, Transition } from "@headlessui/react";
import { Dispatch, Fragment, useEffect, useState } from "react";
import { page_title, user_id } from "../../constants/Types";

import Fuse from "fuse.js";
import Link from "next/link";
import { fetch_getAllPageNamesByUserid } from "../../utils/fetchHelpers";
import { isDailyPage } from "../../utils/generalHelpers";

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
  const [results, setResults] = useState<{ isCreate: boolean; item: string }[]>(
    []
  );

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
                  Search
                </Dialog.Title>
                <input
                  className="w-full bg-theme-blueGray-800 cursor-pointer text-theme-blueGray-300 mt-2"
                  onKeyDown={(event) => {
                    if (event.key === "Escape") {
                      setIsOpen(false);
                    }
                  }}
                  onChange={({ target }) => {
                    const fuse = new Fuse(page_names, options);
                    const res = fuse.search(target.value);
                    const max_five = res.slice(0, 5).map((result) => {
                      return {
                        isCreate: false,
                        item: result.item
                      };
                    });

                    if (
                      max_five.length <= 4 &&
                      !max_five.toString().includes(target.value)
                    ) {
                      max_five.unshift({
                        isCreate: true,
                        item: target.value
                      });
                    }
                    setResults(max_five);
                  }}
                />

                <div className="flex flex-col space-y-2">
                  {results.map((result) => (
                    <Link
                      href={
                        isDailyPage(result.item)
                          ? encodeURI(`/app?date=${result.item}`)
                          : encodeURI(`/p/${result.item}`)
                      }
                      key={result.item}
                    >
                      <a>
                        {result.isCreate && "Create"} {result.item}
                      </a>
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
