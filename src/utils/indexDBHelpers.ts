import * as TYPES from "../constants/Types";

import Dexie from "dexie";
import { Todo } from "@prisma/client";
import cuid from "cuid";

// Prevent multiple instances of Dexie Client in development
// eslint-disable-next-line init-declarations
declare const global: typeof globalThis & { indexDB?: Dexie };

export const indexDB = global.indexDB || new Dexie("MainDB");
if (process.env.NODE_ENV === "development") global.indexDB = indexDB;

export interface type_indexDB_page {
  _id: TYPES.type_page_title | "";
  page_id: TYPES.type_page_id;
  page: TYPES.type_Page_Story_Todos;
}

indexDB.version(1).stores({
  pages: "_id, page_id",
});

export const indexDB_createPageByTitle = async (page: type_indexDB_page) => {
  await indexDB.table("pages").add({
    _id: page._id,
    page_id: page.page_id,
    page: page.page,
  });
};

export const indexDb_updatePageByTitle = async (page: type_indexDB_page) => {
  await indexDB.table("pages").update(page._id, {
    _id: page._id,
    page_id: page.page_id,
    page: page.page,
  });
};
export const indexDb_updatePageById = async (page: type_indexDB_page) => {
  await indexDB.table("pages").update(
    { page_id: page.page.page_id },
    {
      _id: page._id,
      page_id: page.page_id,
      page: page.page,
    }
  );
};

export const indexDB_getAllPages = async (): Promise<type_indexDB_page[]> => {
  const allPages = await indexDB.table("pages").toArray();

  return allPages as type_indexDB_page[];
};

export const indexDB_doesPageExist = ({
  page_title,
  all_pages,
}: {
  page_title: TYPES.type_page_title;
  all_pages: type_indexDB_page[];
}): boolean => {
  const page = all_pages.find(
    (page_local: type_indexDB_page) => page_local._id === page_title
  );

  return !!page;
};
export const indexDB_doesPageExistByPageID = ({
  page_id,
  all_pages,
}: {
  page_id: TYPES.type_page_id;
  all_pages: type_indexDB_page[];
}): boolean => {
  const page = all_pages.find(
    (page_local: type_indexDB_page) => page_local.page_id === page_id
  );

  return !!page;
};

export const indexDB_getPageByPageIndexID = async (
  _id: TYPES.type_page_title
): Promise<type_indexDB_page> => {
  const page: type_indexDB_page = await indexDB.table("pages").get(_id);
  page.page.Page_Todo?.sort((a, b) => {
    if (
      new Date(a.todo_datecreated).getTime() <
      new Date(b.todo_datecreated).getTime()
    ) {
      return -1;
    } else {
      return 1;
    }
  });

  page.page.Page_Todo?.sort(({ todo_done }) => {
    return todo_done ? 1 : -1;
  });

  page.page.Page_Todo = page.page.Page_Todo?.filter(({ todo_archived }) => {
    return !todo_archived;
  });

  return page as type_indexDB_page;
};

export const indexDB_getPageByPageid = async (
  page_id: TYPES.type_page_id
): Promise<type_indexDB_page> => {
  const page: type_indexDB_page = await indexDB.table("pages").get({ page_id });

  return page as type_indexDB_page;
};

export const indexDB_createTodo = async ({
  body: {
    todo_description,
    todo_highlight,
    todo_datecreated,
    todo_archived,
    todo_details,
    todo_done,
    todo_id,
    todo_story_id,
  },
  _id,
}: {
  body: TYPES.type_Todo_Body;
  _id: TYPES.type_page_title;
}): Promise<void> => {
  const { page } = await indexDB_getPageByPageIndexID(_id);

  page.Page_Todo.push({
    todo_archived: todo_archived || false,
    todo_description,
    todo_details: todo_details || null,
    todo_highlight,
    todo_id: todo_id || cuid(),
    todo_done: todo_done || false,
    todo_story_id: todo_story_id || null,
    todo_datecreated: todo_datecreated || new Date(),
    todo_highlight_questions: [],
    todo_page_id: _id,
    todo_user_id: page.page_user_id,
  });

  await indexDB.table("pages").update(_id, {
    page,
  });
};

export const indexDB_toggleTodoDone = async (
  todo_id: TYPES.type_todo_id
): Promise<void> => {
  let updated_page: type_indexDB_page = null;
  const allIndexDBPages = await indexDB_getAllPages();

  allIndexDBPages.map((page) => {
    page.page.Page_Todo.map(async (todo: Todo) => {
      if (todo.todo_id === todo_id) {
        todo.todo_done = !todo.todo_done;
        updated_page = page;
        await indexDB.table("pages").update(updated_page._id, updated_page);
      }
    });
  });
};

export const indexDB_deleteTodo = async (
  todo_id: TYPES.type_todo_id
): Promise<void> => {
  let updated_page: type_indexDB_page = null;
  const allIndexDBPages = await indexDB_getAllPages();

  allIndexDBPages.map((page) => {
    page.page.Page_Todo.map(async (todo: Todo, index) => {
      if (todo.todo_id === todo_id) {
        page.page.Page_Todo.splice(index, 1);
        updated_page = page;
        await indexDB.table("pages").update(updated_page._id, updated_page);
      }
    });
  });
};

export const indexDB_updateTodoDescription = async ({
  todo_id,
  todo_description,
}: {
  todo_id: TYPES.type_todo_id;
  todo_description: string;
}): Promise<void> => {
  let updated_page: type_indexDB_page = null;
  const allIndexDBPages = await indexDB_getAllPages();

  allIndexDBPages.map((page) => {
    page.page.Page_Todo.map(async (todo: Todo) => {
      if (todo.todo_id === todo_id) {
        todo.todo_description = todo_description;
        updated_page = page;
        await indexDB.table("pages").update(updated_page._id, updated_page);
      }
    });
  });
};

export const indexDB_makeHighlight = async (
  todo_id: TYPES.type_todo_id
): Promise<void> => {
  let updated_page: type_indexDB_page = null;
  const allIndexDBPages = await indexDB_getAllPages();

  allIndexDBPages.map((page) => {
    page.page.Page_Todo.map(async (todo: Todo) => {
      if (todo.todo_id === todo_id) {
        todo.todo_highlight = true;
        updated_page = page;
        await indexDB.table("pages").update(updated_page._id, updated_page);
      }
    });
  });
};

export const indexDB_toggleArchive = async (
  todo_id: TYPES.type_todo_id
): Promise<void> => {
  let updated_page: type_indexDB_page = null;
  const allIndexDBPages = await indexDB_getAllPages();

  allIndexDBPages.map((page) => {
    page.page.Page_Todo.map(async (todo: Todo) => {
      if (todo.todo_id === todo_id) {
        todo.todo_archived = !todo.todo_archived;
        updated_page = page;
        await indexDB.table("pages").update(updated_page._id, updated_page);
      }
    });
  });
};

// export const indexDB_getAllArchivedTodos = async (): Promise<Todo[]> => {
//   const all_indexDB_pages = await indexDB_getAllPages();

//   const filtered_pages = all_indexDB_pages.map((page) => {
//     page.page.Page_Todo = page.page.Page_Todo.filter(({ todo_archived }) => {
//       return todo_archived;
//     });
//     return page;
//   });

//   let all_archived_todos: Todo[] = [];
//   filtered_pages.map(({ page: { Page_Todo } }) => {
//     all_archived_todos = all_archived_todos.concat(Page_Todo);
//   });
//   all_archived_todos.sort((a, b) => {
//     if (a.todo_datecreated.getTime() < b.todo_datecreated.getTime()) {
//       return -1;
//     } else {
//       return 1;
//     }
//   });

//   all_archived_todos.sort(({ todo_done }) => {
//     return todo_done ? 1 : -1;
//   });

//   return all_archived_todos;
// };

export const indexDB_getAllArchivedTodos = async (): Promise<Todo[]> => {
  const all_indexDB_pages = await indexDB_getAllPages();

  const filtered_pages = all_indexDB_pages.map((page) => {
    page.page.Page_Todo = page.page.Page_Todo.filter(({ todo_archived }) => {
      return todo_archived;
    });
    return page;
  });

  let all_archived_todos: Todo[] = [];
  filtered_pages.map(({ page: { Page_Todo } }) => {
    all_archived_todos = all_archived_todos.concat(Page_Todo);
  });
  all_archived_todos.sort((a, b) => {
    if (a.todo_datecreated.getTime() < b.todo_datecreated.getTime()) {
      return -1;
    } else {
      return 1;
    }
  });

  all_archived_todos.sort(({ todo_done }) => {
    return todo_done ? 1 : -1;
  });

  return all_archived_todos;
};

export const indexDB_getAllIncompleteTodos = async (): Promise<Todo[]> => {
  const all_indexDB_pages = await indexDB_getAllPages();

  const filtered_pages = all_indexDB_pages.map((page) => {
    page.page.Page_Todo = page.page.Page_Todo.filter(({ todo_done }) => {
      return !todo_done;
    });

    return page;
  });

  let all_incomplete_todos: Todo[] = [];
  filtered_pages.map(({ page: { Page_Todo } }) => {
    all_incomplete_todos = all_incomplete_todos.concat(Page_Todo);
  });
  all_incomplete_todos.sort((a, b) => {
    if (
      new Date(a.todo_datecreated).getTime() <
      new Date(b.todo_datecreated).getTime()
    ) {
      return -1;
    } else {
      return 1;
    }
  });

  all_incomplete_todos.sort(({ todo_archived }) => {
    return todo_archived ? 1 : -1;
  });

  return all_incomplete_todos;
};

export const indexDB_getTodoById = async (
  todo_id: TYPES.type_todo_id
): Promise<Todo> => {
  let todo: Todo = null;

  const all_indexDB_pages = await indexDB_getAllPages();
  all_indexDB_pages.map(({ page: { Page_Todo } }) => {
    Page_Todo.map((page_todo: Todo) => {
      if (page_todo.todo_id === todo_id) {
        todo = page_todo;
      }
    });
  });

  return todo;
};

export const indexDB_moveTaskToToday = async (
  todo_id: TYPES.type_todo_id
): Promise<void> => {
  console.log(todo_id);
  const {
    todo_archived,
    todo_datecreated,
    todo_description,
    todo_details,
    todo_done,
    todo_story_id,
  } = await indexDB_getTodoById(todo_id);

  indexDB_createTodo({
    body: {
      todo_description,
      todo_highlight: false,
      todo_datecreated,
      todo_archived,
      todo_details,
      todo_done,
      todo_id,
      todo_story_id,
    },
    _id: new Date().toLocaleDateString("en-GB"),
  });

  await indexDB_deleteTodo(todo_id);
};
