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
import { type_Page_and_Todos, type_Useful_Todo } from "../../constants/Types";

import { Card } from "../layout/Card";
import { IndividualPublicTask } from "./IndividualPublicTask";
import UserContext from "../../contexts/UserContext";
import { is_valid_prop } from "../../utils/validationHelpers";
import { useRouter } from "next/router";

export const PublicCard = ({
  setParTitle,
}: {
  setParTitle: Dispatch<SetStateAction<string>>;
}): JSX.Element => {
  const router = useRouter();
  const { public_id, username } = router.query;
  const [isPublic, setIsPublic] = useState(null);
  const [doesExit, setDoesExit] = useState(null);
  const [currentTodos, setCurrentTodos] = useState<type_Useful_Todo[]>(null);
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
          setDoesExit(false);
        } else {
          router.push(`/p/${page.page_title}`);
        }
      } else if (is_valid_prop(public_id)) {
        const ret = await fetch_getPageByPublicLink(public_id.toString());
        if (ret.status === 404) {
          setIsPublic(false);
        } else {
          const page = await ret.page;
          if (JSON.stringify(currentPage) !== JSON.stringify(page)) {
            setCurrentPage(page);
            setParTitle(page.page_title);
          }
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

    if (JSON.stringify(currentTodos) !== JSON.stringify(fetchedTodos)) {
      setCurrentTodos(fetchedTodos);
    }
  }, [currentPage?.Page_Todo, currentTodos]);

  if (isPublic === false) {
    return (
      <div>
        <h1>hi from nope</h1>
      </div>
    );
  } else if (doesExit === false) {
    return (
      <div>
        <h1>hi from the page doesnt exist nigg</h1>
      </div>
    );
  }
  return (
    <Card
      title={currentPage?.page_title || "Page"}
      spaced_elements={
        <>
          {currentTodos ? (
            currentTodos?.map((todo: type_Useful_Todo) => (
              <IndividualPublicTask todo={todo} key={todo.todo_id} />
            ))
          ) : (
            <SkeletonTheme color="#0F172A" highlightColor="#1E293B">
              <Skeleton count={10} height={20} />
            </SkeletonTheme>
          )}
        </>
      }
    />
  );
};
