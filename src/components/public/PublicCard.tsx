import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import {
  fetch_getPageByPublicLink,
  fetch_getPageByPublicLinkNOCHECK,
} from "../../utils/fetchHelpers";

import { Card } from "../layout/Card";
import { IndividualPublicTask } from "./IndividualPublicTask";
import { Todo } from "@prisma/client";
import UserContext from "../../contexts/UserContext";
import { are_args_same } from "../../utils/generalHelpers";
import { is_valid_prop } from "../../utils/validationHelpers";
import { type_Page_and_Todos } from "../../constants/Types";
import { useRouter } from "next/router";

export const PublicCard = ({
  setParTitle,
}: {
  setParTitle: Dispatch<SetStateAction<string>>;
}): JSX.Element => {
  const router = useRouter();
  const { public_id, username } = router.query;
  const [currentTodos, setCurrentTodos] = useState<Todo[]>(null);
  const [currentPage, setCurrentPage] = useState<type_Page_and_Todos>(null);
  const context = useContext(UserContext);
  const logged_in_username = context?.currentUser?.user_username;

  useEffect(() => {
    (async () => {
      if (logged_in_username && logged_in_username === username) {
        const page = await fetch_getPageByPublicLinkNOCHECK(
          public_id.toString()
        );
        if (page.page_title === undefined) {
          router.push("/404");
        } else {
          router.push(`/p/${page.page_title}`);
        }
      } else if (is_valid_prop(public_id)) {
        const ret = await fetch_getPageByPublicLink(public_id.toString());
        if (ret.ok) {
          const page = await ret.page;
          if (!are_args_same(currentPage, page)) {
            if (page.Page_User.user_username !== username) {
              router.push("/404");
            }
            setCurrentPage(page);
            setParTitle(page.page_title);
          }
        } else {
          router.push("/404");
        }
      }
    })();
  }, [
    currentPage,
    logged_in_username,
    public_id,
    router,
    setParTitle,
    username,
  ]);

  useEffect(() => {
    const fetchedTodos = currentPage?.Page_Todo;

    if (!are_args_same(currentTodos, fetchedTodos)) {
      setCurrentTodos(fetchedTodos);
    }
  }, [currentPage?.Page_Todo, currentTodos]);

  return (
    <Card
      title={currentPage?.page_title || "Page"}
      spaced_elements={
        <>
          {currentTodos ? (
            currentTodos?.map((todo: Todo) => (
              <IndividualPublicTask todo={todo} key={todo.todo_id} />
            ))
          ) : (
            <SkeletonTheme baseColor="#0F172A" highlightColor="#1E293B">
              <Skeleton count={10} height={20} />
            </SkeletonTheme>
          )}
        </>
      }
    />
  );
};
