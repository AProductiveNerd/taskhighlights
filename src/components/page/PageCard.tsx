import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import {
  indexDB_createPageByTitle,
  indexDB_doesPageExist,
  indexDB_getAllPages,
  indexDB_getPageByPageIndexID,
  indexDb_updatePageByTitle,
} from "../../utils/indexDBHelpers";
import { type_Page_and_Todos, type_user_id } from "../../constants/Types";
import { useContext, useEffect, useState } from "react";

import { Card } from "../layout/Card";
import FireUserContext from "../../contexts/FireUserContext";
import { IndividualPageTask } from "./IndividualPageTask";
import { Todo } from "@prisma/client";
import { are_args_same } from "../../utils/generalHelpers";
import cuid from "cuid";
import dynamic from "next/dynamic";
import { fetch_createRetPageByTitle } from "../../utils/fetchHelpers";
import { useHotkeys } from "react-hotkeys-hook";

const DynamicAddPageTask = dynamic(() => import("./AddPageTask"));
const DynamicGlobalMenu = dynamic(() => import("../layout/GlobalMenu"));

export const PageCard = ({ title }: { title: string }): JSX.Element => {
  const [currentPage, setCurrentPage] = useState<type_Page_and_Todos>(null);
  const [currentTodos, setCurrentTodos] = useState<Todo[]>(null);
  const [addedCounter, setAddedCounter] = useState<number>(0);
  const [globalMenuIsOpen, setGlobalMenuIsOpen] = useState(false);
  const [serverPage, setServerPage] = useState<type_Page_and_Todos>(null);
  const fireId: type_user_id = useContext(FireUserContext);
  const [shouldUseServer, setShouldUseServer] = useState(true);

  const set_all_default = () => {
    setShouldUseServer(true);
    setServerPage(null);
    setCurrentPage(null);
    setCurrentTodos(null);
  };

  useEffect(() => {
    (async () => {
      console.log("JUST SERVER");
      const server_page = await fetch_createRetPageByTitle(fireId, title);
      if (!are_args_same(serverPage, server_page) && shouldUseServer) {
        setServerPage(server_page);
        setShouldUseServer(true);
      }
    })();
  }, [addedCounter, serverPage, fireId, title, shouldUseServer]);

  useEffect(() => {
    set_all_default();
  }, [title]);

  useEffect(() => {
    (async () => {
      const page_title = title;
      const all_indexDb_page = await indexDB_getAllPages();
      const does_page_exist_in_indexDB = indexDB_doesPageExist({
        all_pages: all_indexDb_page,
        page_title,
      });

      if (does_page_exist_in_indexDB) {
        const { page: page_from_indexDB } = await indexDB_getPageByPageIndexID(
          page_title
        );

        if (
          serverPage &&
          serverPage.page_title === page_title &&
          shouldUseServer
        ) {
          if (!are_args_same(serverPage, page_from_indexDB)) {
            indexDb_updatePageByTitle({
              page_id: serverPage.page_id,
              page: {
                ...serverPage,
                Page_Story: null,
              },
              _id: serverPage.page_title,
            });
          }
          setCurrentPage(serverPage);
          setShouldUseServer(false);
        } else if (!are_args_same(currentPage, page_from_indexDB)) {
          setCurrentPage(page_from_indexDB);
        }
      }

      if (!does_page_exist_in_indexDB && fireId) {
        if (
          serverPage &&
          serverPage.page_title === page_title &&
          shouldUseServer
        ) {
          await indexDB_createPageByTitle({
            page: { ...serverPage, Page_Story: null },
            _id: serverPage.page_title,
            page_id: serverPage.page_id,
          });
        } else {
          const page_id = cuid();

          await indexDB_createPageByTitle({
            page: {
              Page_Story: null,
              Page_Todo: [],
              page_datecreated: new Date(),
              page_id,
              page_is_public: false,
              page_last_accessed: new Date(),
              page_public_link: cuid(),
              page_title,
              page_user_id: fireId,
            },
            _id: page_title,
            page_id,
          });
        }

        const { page: page_from_indexDB } = await indexDB_getPageByPageIndexID(
          page_title
        );

        if (
          serverPage &&
          serverPage.page_title === page_title &&
          shouldUseServer
        ) {
          if (!are_args_same(serverPage, page_from_indexDB)) {
            indexDb_updatePageByTitle({
              page_id: serverPage.page_id,
              page: { ...serverPage, Page_Story: null },
              _id: serverPage.page_title,
            });
          }
          setCurrentPage(serverPage);
          setShouldUseServer(false);
        } else if (!are_args_same(currentPage, page_from_indexDB)) {
          setCurrentPage(page_from_indexDB);
        }
      } else if (
        serverPage &&
        serverPage.page_title === page_title &&
        !are_args_same(currentPage, serverPage) &&
        shouldUseServer
      ) {
        setCurrentPage(serverPage);
        setShouldUseServer(false);
      }
    })();
  }, [currentPage, fireId, addedCounter, serverPage, shouldUseServer, title]);

  useEffect(() => {
    const fetchedTodos = currentPage?.Page_Todo;

    if (!are_args_same(currentTodos, fetchedTodos)) {
      setCurrentTodos(fetchedTodos);
    }
  }, [currentPage?.Page_Todo, currentTodos]);

  const stateReload = (): void => {
    if (addedCounter < 50) {
      setAddedCounter(addedCounter + 1);
    } else {
      setAddedCounter(0);
    }
  };
  useHotkeys("ctrl+p, command+p, ctrl+shift+f", (event, handler) => {
    event.preventDefault();
    switch (handler.key) {
      case "ctrl+p":
      case "command+p":
        setGlobalMenuIsOpen(true);
        break;
    }

    return false;
  });

  return (
    <>
      <DynamicGlobalMenu
        globalMenuIsOpen={globalMenuIsOpen}
        setGlobalMenuIsOpen={setGlobalMenuIsOpen}
        page={currentPage?.page_public_link}
        page_is_public={currentPage?.page_is_public}
        stateReload={stateReload}
      />
      <Card
        action_component={
          <DynamicAddPageTask
            page_id={currentPage?.page_id}
            user_id={fireId}
            setShouldUseServer={setShouldUseServer}
            page={currentPage?.page_id}
            stateReload={stateReload}
          />
        }
        spaced_elements={
          <>
            {currentTodos ? (
              currentTodos?.map((todo: Todo) => (
                <IndividualPageTask
                  todo={todo}
                  setShouldUseServer={setShouldUseServer}
                  key={todo.todo_id}
                  stateReload={stateReload}
                />
              ))
            ) : (
              <SkeletonTheme baseColor="#0F172A" highlightColor="#1E293B">
                <Skeleton count={10} height={20} />
              </SkeletonTheme>
            )}
          </>
        }
        title={currentPage?.page_title || "Page"}
      />
    </>
  );
};
