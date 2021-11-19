import * as TYPES from "../constants/Types";

import Dexie from "dexie";
import cuid from "cuid";

// Prevent multiple instances of Dexie Client in development
// eslint-disable-next-line init-declarations
declare const global: NodeJS.Global & { indexDB?: Dexie };

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
  const s = await indexDB.table("pages").add({
    _id: page._id,
    page_id: page.page_id,
    page: page.page,
  });
  console.log({ s });
};

export const indexDb_updatePageByTitle = async (page: type_indexDB_page) => {
  await indexDB.table("pages").update(page._id, {
    _id: page._id,
    page_id: page.page_id,
    page: page.page,
  });
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

export const indexDB_getPageByPageIndexID = async (
  _id: TYPES.type_page_title
): Promise<type_indexDB_page> => {
  const page = await indexDB.table("pages").get(_id);

  return page as type_indexDB_page;
};

export const indexDB_createTodo = async ({
  body: { todo_description, todo_highlight },
  _id,
}: {
  body: TYPES.type_Todo_Body;
  _id: TYPES.type_page_title;
}): Promise<void> => {
  console.log({ _id });
  const { page } = await indexDB_getPageByPageIndexID(_id);

  page.Page_Todo.push({
    todo_archived: false,
    todo_description,
    todo_details: null,
    todo_highlight,
    todo_id: cuid(),
    todo_done: false,
    todo_story_id: null,
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
    page.page.Page_Todo.map((todo: TYPES.type_Useful_Todo) => {
      if (todo.todo_id === todo_id) {
        todo.todo_done = !todo.todo_done;
        updated_page = page;
      }
    });
  });

  await indexDB.table("pages").update(updated_page._id, updated_page);
};

export const indexDB_deleteTodo = async (
  todo_id: TYPES.type_todo_id
): Promise<void> => {
  let updated_page: type_indexDB_page = null;
  const allIndexDBPages = await indexDB_getAllPages();

  allIndexDBPages.map((page) => {
    page.page.Page_Todo.map((todo: TYPES.type_Useful_Todo, index) => {
      if (todo.todo_id === todo_id) {
        page.page.Page_Todo.splice(index, 1);
        updated_page = page;
      }
    });
  });

  await indexDB.table("pages").update(updated_page._id, updated_page);
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
    page.page.Page_Todo.map((todo: TYPES.type_Useful_Todo) => {
      if (todo.todo_id === todo_id) {
        todo.todo_description = todo_description;
        updated_page = page;
      }
    });
  });

  await indexDB.table("pages").update(updated_page._id, updated_page);
};
