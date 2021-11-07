import { type_Page_and_Todos, type_Useful_Todo } from "../../constants/Types";
import { useContext, useEffect, useState } from "react";

import UserContext from "../../contexts/UserContext";
import { fetch_createRetPageByTitle } from "../../utils/fetchHelpers";
import { is_valid_prop } from "../../utils/validationHelpers";
import { useRouter } from "next/router";

export const PublicCard = (): JSX.Element => {
  const router = useRouter();
  const { page_title, username } = router.query;
  const [currentTodos, setCurrentTodos] = useState<type_Useful_Todo[]>(null);

  const [currentPage, setCurrentPage] = useState<type_Page_and_Todos>(null);

  const context = useContext(UserContext);
  const context_username = context?.currentUser?.user_username;
  const context_userid = context?.currentUser?.user_id;
  const [fireId, setFireId] = useState(null);

  useEffect(() => {
    if (context_username && context_username === username) {
      router.push(`/p/${page_title}`);
    } else {
      setFireId(context_userid);
    }
  }, [context_userid, context_username, page_title, router, username]);

  useEffect(() => {
    (async () => {
      if (is_valid_prop(fireId)) {
        const page = await fetch_createRetPageByTitle(
          fireId,
          page_title.toString()
        );

        if (JSON.stringify(currentPage) !== JSON.stringify(page)) {
          setCurrentPage(page);
        }
      }
    })();
  }, [currentPage, fireId, page_title]);

  useEffect(() => {
    const fetchedTodos = currentPage?.Page_Todo;

    if (JSON.stringify(currentTodos) !== JSON.stringify(fetchedTodos)) {
      setCurrentTodos(fetchedTodos);
    }
  }, [currentPage?.Page_Todo, currentTodos]);
  return (
    <div>
      <h1>hi from ayyoo</h1>
    </div>
  );
};
