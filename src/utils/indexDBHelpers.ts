import * as TYPES from "../constants/Types";

import Dexie from "dexie";

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
