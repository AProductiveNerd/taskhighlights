import * as TYPES from "./../constants/Types";

import { Page, Prisma, PrismaClient, Story, Todo, User } from "@prisma/client";

import { make_json_string } from "./generalHelpers";

// Prevent multiple instances of Prisma Client in development
// eslint-disable-next-line init-declarations
declare const global: typeof globalThis & { prisma?: PrismaClient };

export const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV === "development") global.prisma = prisma;

export const prisma_getUserByUsername = async (
  user_username: TYPES.type_user_username,
  today: string
): Promise<TYPES.User_Story_Todo> => {
  const user: TYPES.User_Story_Todo = await prisma.user.findUnique({
    where: {
      user_username,
    },
    include: {
      User_Story: {
        where: {
          story_title: today,
        },
        include: {
          Story_Todo: {},
        },
        orderBy: {
          story_datecreated: "asc",
        },
      },
    },
  });

  return user;
};

export const prisma_getUserByUserid = async (
  user_id: TYPES.type_user_id
): Promise<User> => {
  const user: User = await prisma.user.findUnique({
    where: {
      user_id,
    },
  });

  return user;
};

export const prisma_createUser = async ({
  user_avatar,
  user_email,
  user_fullname,
  user_id,
  user_username,
}: TYPES.type_User_Request_Body): Promise<User> => {
  const avatar = JSON.parse(make_json_string(user_avatar));
  const createdUser: User = await prisma.user.create({
    data: {
      user_avatar: avatar,
      user_email,
      user_fullname,
      user_id,
      user_username,
    },
  });
  return createdUser;
};

export const prisma_deleteUserbyuserid = async (
  user_id: TYPES.type_user_id
): Promise<User> => {
  const deletedUser: User = await prisma.user.delete({
    where: {
      user_id,
    },
  });

  return deletedUser;
};

export const prisma_deleteUserbyusername = async (
  user_username: TYPES.type_user_username
): Promise<User> => {
  const deletedUser: User = await prisma.user.delete({
    where: {
      user_username,
    },
  });

  return deletedUser;
};

export const prisma_getPageByPageid = async (
  page_id: TYPES.type_page_id
): Promise<Page> => {
  const page: Page = await prisma.page.findUnique({
    where: {
      page_id,
    },
  });

  return page;
};

export const prisma_getPageByPageTitle = async (
  page_title: TYPES.type_page_title,
  user_id: TYPES.type_user_id
): Promise<Page> => {
  const page: Page = await prisma.page.findUnique({
    where: {
      user_title_unique: {
        page_title,
        page_user_id: user_id,
      },
    },
  });

  return page;
};

export const prisma_createPage = async ({
  page_title,
  user_id,
}: TYPES.type_Page_Body): Promise<Page> => {
  const createdPage: Page = await prisma.page.create({
    data: {
      page_title,
      Page_User: {
        connect: {
          user_id,
        },
      },
      Page_Story: {},
    },
  });

  return createdPage;
};

export const prisma_createRetDailyPage = async (
  user_id: TYPES.type_user_id,
  today: TYPES.type_page_title
): Promise<TYPES.type_Page_Story_Todos> => {
  if (user_id.toString() !== "undefined") {
    const page = await prisma.page.upsert({
      where: {
        user_title_unique: {
          page_title: today,
          page_user_id: user_id,
        },
      },
      create: {
        page_title: today,
        Page_User: {
          connect: {
            user_id,
          },
        },
        Page_Story: {
          connectOrCreate: {
            where: {
              story_user_title_unique: {
                story_title: today,
                story_user_id: user_id,
              },
            },
            create: {
              story_title: today,
              Story_User: {
                connect: {
                  user_id,
                },
              },
            },
          },
        },
      },
      update: {},
      include: {
        Page_Story: true,
        Page_Todo: {
          //
          where: {
            todo_archived: false,
          },
          orderBy: [{ todo_done: "asc" }, { todo_datecreated: "desc" }],
        },
      },
    });

    return page;
  }
};

export const prisma_deletePageByPageid = async (
  page_id: TYPES.type_page_id
): Promise<Page> => {
  const deletedPage: Page = await prisma.page.delete({
    where: {
      page_id,
    },
  });

  return deletedPage;
};

export const prisma_deletePageByPageTitle = async (
  page_title: TYPES.type_page_title,
  user_id: TYPES.type_user_id
): Promise<Page> => {
  const deletedPage: Page = await prisma.page.delete({
    where: {
      user_title_unique: {
        page_title,
        page_user_id: user_id,
      },
    },
  });

  return deletedPage;
};

export const prisma_getAllPagesByUserid = async (
  user_id: TYPES.type_user_id
): Promise<Page[]> => {
  const pages: Page[] = await prisma.page.findMany({
    where: {
      Page_User: {
        is: {
          user_id,
        },
      },
    },
  });

  return pages;
};

export const prisma_deleteAllPagesByUserid = async (
  user_id: TYPES.type_user_id
): Promise<Prisma.BatchPayload> => {
  const deletedPages: Prisma.BatchPayload = await prisma.page.deleteMany({
    where: {
      Page_User: {
        is: {
          user_id,
        },
      },
    },
  });

  return deletedPages;
};

export const prisma_getTodobyTodoId = async (
  todo_id: TYPES.type_todo_id
): Promise<Todo> => {
  const todo: Todo = await prisma.todo.findUnique({
    where: {
      todo_id,
    },
    include: TYPES.Useful_Todo_Include_Object,
  });

  return todo;
};

export const prisma_createTodo = async ({
  todo_description,
  page_id,
  user_id,
  todo_highlight,
}: {
  todo_description: TYPES.type_todo_description;
  page_id: TYPES.type_page_id;
  user_id: TYPES.type_user_id;
  todo_highlight: TYPES.type_todo_highlight;
}): Promise<Todo> => {
  const todo: Todo = await prisma.todo.create({
    data: {
      todo_description,
      todo_highlight,
      Todo_User: {
        connect: {
          user_id,
        },
      },
      Todo_Page: {
        connect: {
          page_id,
        },
      },
    },
  });

  return todo;
};

export const prisma_deleteTodo = async (
  todo_id: TYPES.type_todo_id
): Promise<Todo> => {
  const deletedTodo: Todo = await prisma.todo.delete({
    where: {
      todo_id,
    },
  });

  return deletedTodo;
};

export const prisma_getAllIncompleteTodosByPage = async (
  user_id: TYPES.type_user_id
): Promise<Todo[]> => {
  const todos: Todo[] = await prisma.todo.findMany({
    orderBy: [{ todo_datecreated: "desc" }, { todo_archived: "asc" }],
    where: {
      AND: {
        Todo_User: {
          is: {
            user_id,
          },
        },
        todo_done: false,
      },
    },
  });

  return todos;
};

export const prisma_getTodoByTodoId = async (
  todo_id: TYPES.type_todo_id
): Promise<Todo> => {
  console.log("todo_id", todo_id);
  const todo = await prisma.todo.findUnique({
    where: {
      todo_id,
    },
  });

  return todo;
};

export const prisma_toggleTodoDone = async (
  todo_id: TYPES.type_todo_id
): Promise<Todo> => {
  const { todo_done } = await prisma_getTodoByTodoId(todo_id);
  console.log({ todo_done });

  const todo: Todo = await prisma.todo.update({
    where: {
      todo_id,
    },
    data: {
      todo_done: !todo_done,
    },
  });

  if (todo.todo_highlight) {
    if (todo.todo_done) {
      const if_todo: Todo = await prisma.todo.update({
        where: {
          todo_id,
        },
        data: {
          Todo_User: {
            update: {
              user_streak: {
                increment: 1,
              },
            },
          },
        },
      });

      return if_todo;
    } else {
      const if_todo: Todo = await prisma.todo.update({
        where: {
          todo_id,
        },
        data: {
          Todo_User: {
            update: {
              user_streak: {
                decrement: 1,
              },
            },
          },
        },
      });

      return if_todo;
    }
  }

  return todo;
};

export const prisma_updateTodoDescription = async ({
  todo_id,
  todo_description,
}: {
  todo_id: TYPES.type_todo_id;
  todo_description: TYPES.type_todo_description;
}): Promise<Todo> => {
  const todo: Todo = await prisma.todo.update({
    where: {
      todo_id,
    },
    data: {
      todo_description,
    },
  });

  return todo;
};

export const prisma_toggleArchived = async (
  todo_id: TYPES.type_todo_id
): Promise<Todo> => {
  const { todo_archived } = await prisma_getTodoByTodoId(todo_id);
  const todo: Todo = await prisma.todo.update({
    where: {
      todo_id,
    },
    data: {
      todo_archived: !todo_archived,
    },
  });

  return todo;
};

export const prisma_makeHighlight = async (
  todo_id: TYPES.type_todo_id
): Promise<Todo> => {
  const todo: Todo = await prisma.todo.update({
    where: {
      todo_id,
    },
    data: {
      todo_highlight: true,
    },
  });

  return todo;
};

export const prisma_getStoryByStoryId = async (
  story_id: TYPES.type_story_id
): Promise<TYPES.type_Story_and_Todos> => {
  const story: TYPES.type_Story_and_Todos = await prisma.story.findUnique({
    where: {
      story_id,
    },
    include: {
      Story_Todo: {
        where: {
          todo_archived: false,
        },
        orderBy: [
          { todo_done: "asc" },
          { todo_description: "asc" },
          { todo_archived: "asc" },
        ],
      },
    },
  });

  return story;
};

export const prisma_getStoryByStoryTitle = async (
  story_title: TYPES.type_story_title,
  user_id: TYPES.type_user_id
): Promise<TYPES.type_Story_and_Todos> => {
  const story: TYPES.type_Story_and_Todos = await prisma.story.findUnique({
    where: {
      story_user_title_unique: {
        story_title,
        story_user_id: user_id,
      },
    },
    include: {
      Story_Todo: {
        where: {
          todo_archived: false,
        },
        orderBy: [
          { todo_done: "asc" },
          { todo_description: "asc" },
          { todo_archived: "asc" },
        ],
      },
    },
  });

  return story;
};

export const prisma_createUpdateStory = async ({
  story_user_id,
  page_id,
  today: story_title,
}: {
  story_user_id: TYPES.type_user_id;
  today: TYPES.type_story_title;
  page_id: TYPES.type_page_id;
}): Promise<TYPES.type_Story_and_Todos> => {
  const story: TYPES.type_Story_and_Todos = await prisma.story.upsert({
    where: {
      story_user_title_unique: {
        story_title,
        story_user_id,
      },
    },
    update: {},
    create: {
      story_title,
      Story_Page: {
        connect: {
          page_id,
        },
      },
      Story_User: {
        connect: {
          user_id: story_user_id,
        },
      },
    },
    include: {
      Story_Todo: {
        where: {
          todo_archived: false,
        },
        orderBy: [
          { todo_done: "asc" },
          { todo_description: "asc" },
          { todo_archived: "asc" },
        ],
      },
    },
  });

  return story;
};

export const prisma_deleteStoryByStoryid = async (
  story_id: TYPES.type_story_id
): Promise<Story> => {
  const story: Story = await prisma.story.delete({
    where: {
      story_id,
    },
  });

  return story;
};

export const prisma_deleteStoryByStoryTitle = async (
  story_title: TYPES.type_story_title,
  story_user_id: TYPES.type_user_id
): Promise<Story> => {
  const story: Story = await prisma.story.delete({
    where: {
      story_user_title_unique: {
        story_title,
        story_user_id,
      },
    },
  });

  return story;
};

export const prisma_addTodoToStory = async ({
  todo_id,
  story_id,
}: TYPES.type_Story_Body): Promise<TYPES.type_Story_and_Todos> => {
  const story: TYPES.type_Story_and_Todos = await prisma.story.update({
    where: { story_id },
    data: {
      Story_Todo: {
        connect: {
          todo_id,
        },
      },
    },
    include: {
      Story_Todo: {
        where: {
          todo_archived: false,
        },
        orderBy: [
          { todo_done: "asc" },
          { todo_description: "asc" },
          { todo_archived: "asc" },
        ],
      },
    },
  });

  return story;
};

export const prisma_removeTodoFromStory = async ({
  todo_id,
  story_id,
}: TYPES.type_Story_Body): Promise<TYPES.type_Story_and_Todos> => {
  const story: TYPES.type_Story_and_Todos = await prisma.story.update({
    where: {
      story_id,
    },
    data: {
      Story_Todo: {
        disconnect: {
          todo_id,
        },
      },
    },
    include: {
      Story_Todo: {
        where: {
          todo_archived: false,
        },
        orderBy: [
          { todo_done: "asc" },
          { todo_description: "asc" },
          { todo_archived: "asc" },
        ],
      },
    },
  });

  return story;
};

export const prisma_moveTasks = async ({
  old_page_id,
  new_page_id,
}: TYPES.type_moveTasks): Promise<Prisma.BatchPayload> => {
  const todos: Prisma.BatchPayload = await prisma.todo.updateMany({
    where: {
      AND: {
        Todo_Page: {
          page_id: old_page_id,
        },
        todo_done: false,
      },
    },
    data: {
      todo_page_id: new_page_id,
    },
  });

  return todos;
};

export const prisma_createRetPageByTitle = async (
  user_id: TYPES.type_user_id,
  page_title: TYPES.type_page_title
): Promise<TYPES.type_Page_and_Todos> => {
  if (user_id.toString() !== "undefined") {
    const page = await prisma.page.upsert({
      where: {
        user_title_unique: {
          page_title,
          page_user_id: user_id,
        },
      },
      create: {
        page_title,
        Page_User: {
          connect: {
            user_id,
          },
        },
      },
      update: {},
      include: {
        Page_Story: true,
        Page_Todo: {
          where: {
            todo_archived: false,
          },
          orderBy: [{ todo_done: "asc" }, { todo_datecreated: "desc" }],
        },
      },
    });

    return page;
  }
};

export const prisma_getAllArchivedTodos = async (
  user_id: TYPES.type_user_id
): Promise<Todo[]> => {
  const todos: Todo[] = await prisma.todo.findMany({
    orderBy: [
      { todo_done: "asc" },
      { todo_datecreated: "desc" },
      { todo_archived: "asc" },
    ],
    where: {
      AND: {
        Todo_User: {
          is: {
            user_id,
          },
        },
        todo_archived: true,
      },
    },
  });

  return todos;
};

export const prisma_updateTodoDetails = async ({
  todo_id,
  todo_details,
}: {
  todo_id: TYPES.type_todo_id;
  todo_details: TYPES.type_todo_details;
}): Promise<Todo> => {
  const todo: Todo = await prisma.todo.update({
    where: {
      todo_id,
    },
    data: {
      todo_details,
    },
  });

  return todo;
};

export const prisma_moveTasksToToday = async ({
  todo_id,
  today,
  user_id,
}: {
  todo_id: TYPES.type_todo_id;
  today: TYPES.type_page_title;
  user_id: TYPES.type_user_id;
}): Promise<Todo> => {
  const page = await prisma.page.findUnique({
    where: {
      user_title_unique: {
        page_title: today,
        page_user_id: user_id,
      },
    },
  });
  const new_page_id: TYPES.type_page_title = page.page_id;
  const todo: Todo = await prisma.todo.update({
    where: {
      todo_id,
    },
    data: {
      todo_page_id: new_page_id,
    },
  });

  return todo;
};

export const prisma_getPageByPublicLink = async (
  page_public_link: TYPES.type_page_public_link
): Promise<TYPES.type_Page_Username_Todos> => {
  const page = await prisma.page.findUnique({
    where: {
      page_public_link,
    },
    include: {
      Page_Story: true,
      Page_User: {
        select: {
          user_username: true,
        },
      },
      Page_Todo: {
        where: {
          todo_archived: false,
        },
        orderBy: [{ todo_done: "asc" }, { todo_datecreated: "desc" }],
      },
    },
  });

  return page;
};

export const prisma_changePagePublic = async ({
  page_public_link,
  page_is_public,
}: {
  page_public_link: TYPES.type_page_public_link;
  page_is_public: TYPES.type_page_is_public;
}): Promise<Page> => {
  const page = await prisma.page.update({
    where: {
      page_public_link,
    },
    data: {
      page_is_public,
    },
  });

  return page;
};
