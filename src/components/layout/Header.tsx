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
  RefreshIcon,
  SearchCircleIcon,
  TemplateIcon,
  UploadIcon,
} from "@heroicons/react/outline";
import { Fragment, useContext, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import Avatar from "react-nice-avatar";
import { EmptyCircleIcon } from "../../constants/customIcons";
import FireUserContext from "../../contexts/FireUserContext";
import Image from "next/image";
import Link from "next/link";
import PageSearchContext from "../../contexts/PageSearchContext";
import { User } from "@prisma/client";
import UserContext from "../../contexts/UserContext";
import { auth } from "../../libs/Firebase";
import dynamic from "next/dynamic";
import { fetch_getUserByUserid } from "../../utils/fetchHelpers";
import { signOut } from "@firebase/auth";

const DynamicPageSearch = dynamic(() => import("../page/PageSearch"));

export const Header = ({ path }: { path: string }): JSX.Element => {
  const { pageSearchIsOpen: isOpen, setPageSearchIsOpen: setIsOpen } =
    useContext(PageSearchContext);
  const [currentUser, setCurrentUser] = useState<User>(null);
  const fireId = useContext(FireUserContext);

  const { setCurrentUser: setContextUser } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      const user = await fetch_getUserByUserid(fireId);

      if (JSON.stringify(currentUser) !== JSON.stringify(user)) {
        setCurrentUser(user);
        setContextUser(user);
      }
    })();
  }, [fireId, currentUser, setContextUser]);

  return (
    <div className="py-3 px-6 sm:px-0 flex-1 max-w-7xl flex justify-between items-center">
      {!INDEX_HEADER.includes(path) ? (
        <div className="w-11/12 sm:max-w-md md:max-w-lg flex items-center justify-between flex-1 mx-auto">
          {currentUser?.user_avatar ? (
            <Link href={`/u/${currentUser.user_username}`}>
              <a title="Your profile" aria-label="Your profile">
                <Avatar className="w-12 h-12" {...currentUser.user_avatar} />
              </a>
            </Link>
          ) : (
            <SkeletonTheme color="#0F172A" highlightColor="#1E293B">
              <Skeleton circle={true} height={44} width={44} />
            </SkeletonTheme>
          )}

          <div>
            <Menu
              as="div"
              className="relative inline-block text-left text-theme-blueGray-300 z-50"
            >
              <div className="flex space-x-1.5">
                <button
                  type="button"
                  aria-label="Search Pages"
                  title="Search Pages"
                  onClick={() => setIsOpen(true)}
                  className="
                    inline-flex justify-center
                    w-full px-3.5 py-3.5
                    text-sm font-medium
                    rounded-md
                    bg-black bg-opacity-20 filter backdrop-blur-3xl
                    hover:bg-opacity-30 focus:outline-none focus-visible:ring-2
                    focus-visible:ring-white focus-visible:ring-opacity-75
                  "
                >
                  <SearchCircleIcon
                    className="w-5 h-5 text-theme-primary-50"
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
                  inline-flex justify-center
                  w-full px-3.5 py-3.5
                  text-sm font-medium
                  rounded-md
                  bg-black bg-opacity-20 filter backdrop-blur-3xl
                  hover:bg-opacity-30 focus:outline-none focus-visible:ring-2
                  focus-visible:ring-white focus-visible:ring-opacity-75
                "
                >
                  <DotsVerticalIcon
                    className="w-5 h-5 text-theme-primary-50"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-black filter backdrop-blur-3xl bg-opacity-40 divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                              } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                            >
                              <CalendarIcon
                                className={`w-6 h-6 ${
                                  !active && "text-theme-primary-500"
                                } mr-2`}
                              />
                              Daily Page
                            </button>
                          )}
                        </Menu.Item>
                      </a>
                    </Link>

                    {/* Habits */}
                    <Link href="/habits">
                      <a
                        title="Habits"
                        aria-label="Habits"
                        className="flex items-center"
                      >
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active
                                  ? "bg-theme-primary-500 text-theme-blueGray-300"
                                  : "text-theme-blueGray-500"
                              } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                            >
                              <RefreshIcon
                                className={`w-6 h-6 ${
                                  !active && "text-theme-primary-500"
                                } mr-2`}
                              />
                              Habits
                            </button>
                          )}
                        </Menu.Item>
                      </a>
                    </Link>
                  </div>

                  <div className="px-1 py-1">
                    {/* Templates */}
                    <Link href="/templates" passHref>
                      <a
                        title="Templates"
                        aria-label="Templates"
                        className="flex items-center"
                      >
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active
                                  ? "bg-theme-primary-500 text-theme-blueGray-300"
                                  : "text-theme-blueGray-500"
                              } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                            >
                              <TemplateIcon
                                className={`w-6 h-6 ${
                                  !active && "text-theme-primary-500"
                                } mr-2`}
                              />
                              Templates
                            </button>
                          )}
                        </Menu.Item>
                      </a>
                    </Link>

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
                              } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                            >
                              <EmptyCircleIcon
                                className={`w-6 h-6 ${
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
                              } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                            >
                              <ArchiveIcon
                                className={`w-6 h-6 ${
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
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                          title="Sign out"
                          onClick={() => signOut(auth)}
                        >
                          <LogoutIcon
                            className={`w-6 h-6 ${
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
        <div className="px-7 py-0.5 sm:max-w-3xl flex-1 mx-auto font-semibold text-lg">
          <div className="flex flex-1 items-center justify-between py-0.5">
            <div className="flex items-center justify-center">
              <Link href={INDEX}>
                <a className="flex items-center space-x-3 group cursor-pointer">
                  <span className="relative w-11 h-11 -mt-1">
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
              className="relative inline-block text-left text-theme-blueGray-300 z-50 sm:hidden"
            >
              <div>
                <Menu.Button
                  as="button"
                  title="Menu"
                  aria-label="Menu"
                  className="
                  inline-flex justify-center
                  w-full px-3.5 py-3.5
                  text-sm font-medium
                  rounded-md
                  bg-black bg-opacity-20 filter backdrop-blur-3xl
                  hover:bg-opacity-30 focus:outline-none focus-visible:ring-2
                  focus-visible:ring-white focus-visible:ring-opacity-75
                "
                >
                  <DotsVerticalIcon
                    className="w-5 h-5 text-theme-primary-50"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 w-32 mt-2 origin-top-right bg-black filter backdrop-blur-3xl bg-opacity-40 divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                              } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                            >
                              <LoginIcon
                                className={`w-6 h-6 ${
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
                              } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                            >
                              <UploadIcon
                                className={`w-6 h-6 ${
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

            <div className="space-x-3 hidden sm:block">
              <Link href={currentUser ? APP : LOG_IN}>
                <a className="border-theme-primary-500 hover:border-b-2 cursor-pointer">
                  Log In
                </a>
              </Link>

              <Link href={currentUser ? APP : SIGN_UP}>
                <a className="border-theme-primary-500 hover:border-b-2 cursor-pointer">
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
