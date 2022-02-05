import {
  APP,
  INDEX,
  INDEX_HEADER,
  LOG_IN,
  SIGN_UP,
} from "../../constants/Routes";
import {
  ArchiveIcon,
  CalendarIcon,
  DotsVerticalIcon,
  LoginIcon,
  LogoutIcon,
  SearchCircleIcon,
  UploadIcon,
} from "@heroicons/react/outline";
import {
  Header_Props,
  Header_Transition_Props,
} from "../../types/layout/Header";
import { Menu, Transition } from "@headlessui/react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useContext, useEffect, useState } from "react";

import Avatar from "react-nice-avatar";
import { EmptyCircleIcon } from "../../constants/customIcons";
import FireUserContext from "../../contexts/FireUserContext";
import Image from "next/image";
import Link from "next/link";
import PageSearchContext from "../../contexts/PageSearchContext";
import { User } from "@prisma/client";
import UserContext from "../../contexts/UserContext";
import { are_args_same } from "../../utils/generalHelpers";
import { auth } from "../../libs/Firebase";
import dynamic from "next/dynamic";
import { fetch_getUserByUserid } from "../../utils/fetchHelpers";
import { signOut } from "@firebase/auth";

const DynamicPageSearch = dynamic(() => import("../page/PageSearch"));

export const Header = ({ path }: Header_Props): JSX.Element => {
  const { pageSearchIsOpen: isOpen, setPageSearchIsOpen: setIsOpen } =
    useContext(PageSearchContext);
  const [currentUser, setCurrentUser] = useState<User>(null);
  const fireId = useContext(FireUserContext);

  const { setCurrentUser: setContextUser } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      const user = await fetch_getUserByUserid(fireId);

      if (!are_args_same(currentUser, user)) {
        setCurrentUser(user);
        setContextUser(user);
      }
    })();
  }, [fireId, currentUser, setContextUser]);

  return (
    <div className="flex max-w-7xl flex-1 items-center justify-between py-3 px-6 sm:px-0">
      {!INDEX_HEADER.includes(path) ? (
        <div className="mx-auto flex w-11/12 flex-1 items-center justify-between sm:max-w-md md:max-w-lg">
          {currentUser?.user_avatar ? (
            <Link href={`/u/${currentUser.user_username}`}>
              <a title="Your profile" aria-label="Your profile">
                <Avatar className="h-12 w-12" {...currentUser.user_avatar} />
              </a>
            </Link>
          ) : (
            <SkeletonTheme baseColor="#0F172A" highlightColor="#1E293B">
              <Skeleton circle={true} height={44} width={44} />
            </SkeletonTheme>
          )}

          <div>
            <Menu
              as="div"
              className="relative z-50 inline-block text-left text-theme-blueGray-300"
            >
              <div className="flex space-x-1.5">
                <button
                  type="button"
                  aria-label="Search Pages"
                  title="Search Pages"
                  onClick={() => setIsOpen(true)}
                  className="
                    inline-flex w-full
                    justify-center rounded-md bg-black
                    bg-opacity-20 px-3.5
                    py-3.5
                    text-sm font-medium filter backdrop-blur-3xl
                    hover:bg-opacity-30 focus:outline-none focus-visible:ring-2
                    focus-visible:ring-white focus-visible:ring-opacity-75
                  "
                >
                  <SearchCircleIcon
                    className="h-5 w-5 text-theme-primary-50"
                    aria-hidden="true"
                  />
                  <DynamicPageSearch
                    user={currentUser?.user_id}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                  />
                </button>
                <Menu.Button
                  as="button"
                  title="Menu"
                  aria-label="Menu"
                  className="
                  inline-flex w-full
                  justify-center rounded-md bg-black
                  bg-opacity-20 px-3.5
                  py-3.5
                  text-sm font-medium filter backdrop-blur-3xl
                  hover:bg-opacity-30 focus:outline-none focus-visible:ring-2
                  focus-visible:ring-white focus-visible:ring-opacity-75
                "
                >
                  <DotsVerticalIcon
                    className="h-5 w-5 text-theme-primary-50"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition {...Header_Transition_Props}>
                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-gray-100 rounded-md bg-black bg-opacity-40 shadow-lg ring-1 ring-black ring-opacity-5 filter backdrop-blur-3xl focus:outline-none">
                  <div className="px-1 py-1 ">
                    {/* Daily Page */}
                    <Link
                      href={`/app?date=${new Date().toLocaleDateString(
                        "en-GB"
                      )}`}
                    >
                      <a
                        title="Daily Page"
                        aria-label="Daily Page"
                        className="flex items-center"
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
                              <CalendarIcon
                                className={`h-6 w-6 ${
                                  !active && "text-theme-primary-500"
                                } mr-2`}
                              />
                              Daily Page
                            </button>
                          )}
                        </Menu.Item>
                      </a>
                    </Link>
                  </div>

                  <div className="px-1 py-1">
                    {/* Incompletes */}
                    <Link href="/incomplete">
                      <a
                        title="Incomplete"
                        aria-label="Incomplete"
                        className="flex items-center"
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
                              <EmptyCircleIcon
                                className={`h-6 w-6 ${
                                  !active && "text-theme-primary-500"
                                } mr-2`}
                              />
                              Incomplete
                            </button>
                          )}
                        </Menu.Item>
                      </a>
                    </Link>

                    {/* Archived */}
                    <Link href="/archived">
                      <a
                        title="Archived"
                        aria-label="Archived"
                        className="flex items-center"
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
                              <ArchiveIcon
                                className={`h-6 w-6 ${
                                  !active && "text-theme-primary-500"
                                } mr-2`}
                              />
                              Archived
                            </button>
                          )}
                        </Menu.Item>
                      </a>
                    </Link>
                  </div>

                  {/* Sign Out */}
                  <div className="px-1 py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          aria-label="Sign out"
                          className={`${
                            active
                              ? "bg-theme-primary-500 text-theme-blueGray-300"
                              : "text-theme-blueGray-500"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          title="Sign out"
                          onClick={() => signOut(auth)}
                        >
                          <LogoutIcon
                            className={`h-6 w-6 ${
                              !active && "text-theme-primary-500"
                            } mr-2`}
                          />
                          Sign Out
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      ) : (
        <div className="mx-auto flex-1 px-7 py-0.5 text-lg font-semibold sm:max-w-3xl">
          <div className="flex flex-1 items-center justify-between py-0.5">
            <div className="flex items-center justify-center">
              <Link href={INDEX}>
                <a className="group flex cursor-pointer items-center space-x-3">
                  <span className="relative -mt-1 h-11 w-11">
                    <Image
                      src="/icon.png"
                      alt="icon"
                      layout="fill"
                      aria-label="Task Highlights"
                      title="Task Highlights"
                    />
                  </span>

                  <span>Task Highlights</span>
                </a>
              </Link>
            </div>

            <Menu
              as="div"
              className="relative z-50 inline-block text-left text-theme-blueGray-300 sm:hidden"
            >
              <div>
                <Menu.Button
                  as="button"
                  title="Menu"
                  aria-label="Menu"
                  className="
                  inline-flex w-full
                  justify-center rounded-md bg-black
                  bg-opacity-20 px-3.5
                  py-3.5
                  text-sm font-medium filter backdrop-blur-3xl
                  hover:bg-opacity-30 focus:outline-none focus-visible:ring-2
                  focus-visible:ring-white focus-visible:ring-opacity-75
                "
                >
                  <DotsVerticalIcon
                    className="h-5 w-5 text-theme-primary-50"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition {...Header_Transition_Props}>
                <Menu.Items className="absolute right-0 mt-2 w-32 origin-top-right divide-gray-100 rounded-md bg-black bg-opacity-40 shadow-lg ring-1 ring-black ring-opacity-5 filter backdrop-blur-3xl focus:outline-none">
                  <div className="px-1 py-1 ">
                    <Link href="/log-in">
                      <a
                        title="Log In"
                        aria-label="Log In"
                        className="flex items-center"
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
                              <LoginIcon
                                className={`h-6 w-6 ${
                                  !active && "text-theme-primary-500"
                                } mr-2`}
                              />
                              Log In
                            </button>
                          )}
                        </Menu.Item>
                      </a>
                    </Link>

                    <Link href="/sign-up">
                      <a
                        title="Sign Up"
                        aria-label="Sign Up"
                        className="flex items-center"
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
                              <UploadIcon
                                className={`h-6 w-6 ${
                                  !active && "text-theme-primary-500"
                                } mr-2`}
                              />
                              Sign Up
                            </button>
                          )}
                        </Menu.Item>
                      </a>
                    </Link>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            <div className="hidden space-x-3 sm:block">
              <Link href={currentUser ? APP : LOG_IN}>
                <a className="cursor-pointer border-theme-primary-500 hover:border-b-2">
                  Log In
                </a>
              </Link>

              <Link href={currentUser ? APP : SIGN_UP}>
                <a className="cursor-pointer border-theme-primary-500 hover:border-b-2">
                  Sign Up
                </a>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
