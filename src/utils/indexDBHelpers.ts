import * as TYPES from "../constants/Types";

import Dexie from "dexie";

// Prevent multiple instances of Prisma Client in development
// eslint-disable-next-line init-declarations
declare const global: NodeJS.Global & { indexDB?: Dexie };

export const indexDB = global.indexDB || new Dexie("MainDB");
if (process.env.NODE_ENV === "development") global.indexDB = indexDB;

indexDB.version(1).stores({
  pages: "id, page_id",
});

export const indexDB_getAllPages = async (): Promise<
  TYPES.type_indexDB_getAllPages[]
> => {
  const allPages = await indexDB.table("pages").toArray();

  return allPages as TYPES.type_indexDB_getAllPages[];
};

export const indexDB_addPage = async ({
  today,
  page,
}: {
  today: TYPES.type_page_title;
  page: TYPES.type_Page_Story_Todos;
}): Promise<void> => {
  await indexDB.table("pages").add({
    id: today,
    page_id: page?.page_id || "",
    page,
  });
};

export const indexDB_updatePage = async ({
  today,
  page,
}: {
  today: TYPES.type_page_title;
  page: TYPES.type_Page_Story_Todos;
}): Promise<void> => {
  await indexDB.table("pages").update(today, {
    page,
  });
};

export const indexDB_getPagebyPageID = async (
  page_id: TYPES.type_page_id
): Promise<TYPES.type_Page_Story_Todos> => {
  const page = await indexDB.table("pages").get({ page_id });

  return page as TYPES.type_Page_Story_Todos;
};
