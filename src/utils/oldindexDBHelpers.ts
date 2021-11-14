// import * as TYPES from "../constants/Types";
export {};
// import Dexie from "dexie";

// // Prevent multiple instances of Prisma Client in development
// // eslint-disable-next-line init-declarations
// declare const global: NodeJS.Global & { indexDB?: Dexie };

// export const indexDB = global.indexDB || new Dexie("MainDB");
// if (process.env.NODE_ENV === "development") global.indexDB = indexDB;

// indexDB.version(1).stores({
//   pages: "id, page_id",
//   // user: "user_id, user_username, user_email",
// });

// // export const indexDB_userAlreadyExists = async (): Promise<boolean> => {
// //   const all = await indexDB.table("user").toArray();
// //   if (all.length > 0) {
// //     return true;
// //   } else {
// //     return false;
// //   }
// // };

// // export const indexDB_addUser = async (user: User): Promise<void> => {
// //   console.log("hahahaah");

// //   await indexDB.table("user").add({ user_id: user.user_id, user });
// // };

// // export const indexDB_updateUser = async ({
// //   user,
// //   user_id,
// // }: {
// //   user_id: TYPES.type_user_id;
// //   user: User;
// // }): Promise<void> => {
// //   await indexDB.table("user").update(user_id, { user_id: user.user_id, user });
// // };

// // export const indexDB_getUserByUserId = async (
// //   user_id: TYPES.type_user_id
// // ): Promise<User> => {
// //   const user = await indexDB.table("user").get(user_id);

// //   return user as User;
// // };

// export const indexDB_getAllPages = async (): Promise<
//   TYPES.type_indexDB_getAllPages[]
// > => {
//   const allPages = await indexDB.table("pages").toArray();

//   return allPages as TYPES.type_indexDB_getAllPages[];
// };

// export const indexDB_addPage = async ({
//   today,
//   page,
// }: {
//   today: TYPES.type_page_title;
//   page: TYPES.type_Page_Story_Todos;
// }): Promise<void> => {
//   await indexDB.table("pages").add({
//     id: today,
//     page_id: page?.page_id || "",
//     page,
//   });
// };

// export const indexDB_updatePage = async ({
//   today,
//   page,
// }: {
//   today: TYPES.type_page_title;
//   page: TYPES.type_Page_Story_Todos;
// }): Promise<void> => {
//   await indexDB.table("pages").update(today, {
//     page,
//   });
// };

// export const indexDB_getPagebyPageID = async (
//   page_id: TYPES.type_page_id
// ): Promise<TYPES.type_Page_Story_Todos> => {
//   const page = await indexDB.table("pages").get({ page_id });

//   return page as TYPES.type_Page_Story_Todos;
// };

// export const indexDB_getPagebyPageTitle = async (
//   page_title: TYPES.type_page_title
// ): Promise<TYPES.type_Page_Story_Todos> => {
//   const page = await indexDB.table("pages").get(page_title);
//   console.log("indexpage", page);
//   return page as TYPES.type_Page_Story_Todos;
// };

// export const indexDB_doesPageExistByTitle = async (
//   page_title: TYPES.type_page_title
// ) => {
//   const page = await indexDB
//     .table("pages")
//     .where("id")
//     .equals(page_title)
//     .toArray();
//   if (page.length > 0) {
//     return true;
//   } else {
//     return false;
//   }
// };
