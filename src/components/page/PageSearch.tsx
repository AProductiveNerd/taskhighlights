import { Dialog, Menu, Transition } from "@headlessui/react";
import { Dispatch, Fragment, useEffect, useRef, useState } from "react";
import { are_args_same, isDailyPage } from "../../utils/generalHelpers";
import { type_page_title, type_user_id } from "../../constants/Types";

import Fuse from "fuse.js";
import Link from "next/link";
import { PageSearch_Transition_Props } from "../../types/layout/PageSearch";
import { fetch_getAllPageNamesByUserid } from "../../utils/fetchHelpers";

interface PageSearch_Props {
  user: type_user_id;
  isOpen: boolean;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
}

export const PageSearch = ({
  user,
  isOpen,
  setIsOpen,
}: PageSearch_Props): JSX.Element => {
  const focusRef = useRef(null);

  const [page_names, set_page_names] = useState<type_page_title[]>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] =
    useState<{ isCreate: boolean; item: string }[]>(null);

  useEffect(() => {
    (async () => {
      const names = await fetch_getAllPageNamesByUserid(user);
      if (!are_args_same(page_names, names)) {
        set_page_names(names);
      }
    })();
  }, [page_names, user]);

  useEffect(() => {
    if (page_names) {
      const options = {
        includeScore: true,
      };
      const fuse = new Fuse(page_names, options);
      const res = fuse.search(query);
      const max_five = res.slice(0, 5).map((result) => {
        return {
          isCreate: false,
          item: result.item,
        };
      });

      if (max_five?.length <= 4 && !max_five.toString().includes(query)) {
        max_five.unshift({
          isCreate: true,
          item: query,
        });
      }
      setResults(max_five);
    }
  }, [page_names, query]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => setIsOpen(false)}
        initialFocus={focusRef}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child {...PageSearch_Transition_Props}>
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
                my-8 inline-block
                w-full max-w-md transform
                flex-col items-center
                justify-center space-y-5
                overflow-hidden rounded-lg
                border-2
                border-theme-primary-500 bg-theme-blueGray-800 bg-opacity-40
                p-6 align-middle shadow-lg
                filter backdrop-blur-3xl transition-all
              "
            >
              <>
                <Dialog.Title
                  as="h3"
                  className="text-2xl font-medium leading-6 text-theme-blueGray-300 selection:bg-theme-primary-500/60"
                >
                  Search
                </Dialog.Title>

                <Menu as="div" className="mt-4">
                  <input
                    ref={focusRef}
                    className="group flex w-full items-center rounded-md px-2 py-2 text-sm text-theme-blueGray-500 hover:bg-white"
                    onChange={({ target }) => setQuery(target.value)}
                    value={query}
                    onKeyDown={(event) => {
                      if (event.key === "Escape") {
                        setIsOpen(false);
                      }
                    }}
                  />

                  {results && (
                    <Menu.Items
                      static
                      as="div"
                      className="
                        mt-2 w-full
                      divide-gray-100 rounded-md bg-black bg-opacity-40
                      shadow-lg ring-1 ring-black ring-opacity-5
                      filter backdrop-blur-3xl focus:outline-none
                    "
                    >
                      <div className="px-1 py-1 ">
                        {results.map((result) => (
                          <Link
                            href={
                              isDailyPage(result.item)
                                ? encodeURI(`/app?date=${result.item}`)
                                : encodeURI(`/p/${result.item}`)
                            }
                            key={result.item}
                          >
                            <a
                              className="text-theme-blueGray-300"
                              title={result.item}
                              aria-label={result.item}
                            >
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    className={`${
                                      active
                                        ? "bg-theme-primary-500 text-theme-blueGray-300"
                                        : "text-theme-blueGray-500"
                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                  >
                                    {result.isCreate && "Create"} {result.item}
                                  </button>
                                )}
                              </Menu.Item>
                            </a>
                          </Link>
                        ))}
                      </div>
                    </Menu.Items>
                  )}
                </Menu>
              </>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default PageSearch;
