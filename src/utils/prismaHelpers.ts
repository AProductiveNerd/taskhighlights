import * as TYPES from "./../constants/Types";

import { Page, Prisma, PrismaClient, Story, User } from "@prisma/client";

const prisma = new PrismaClient();

export const prisma_getUserByUsername = async (
  user_username: TYPES.user_username
): Promise<User> => {
  const user = await prisma.user.findUnique({
    where: {
      user_username
    }
  });

  return user;
};

export const prisma_getUserByUserid = async (
  user_id: TYPES.user_id
): Promise<User> => {
  const user = await prisma.user.findUnique({
    where: {
      user_id
    }
  });

  return user;
};

export const prisma_createUser = async ({
  user_avatar,
  user_email,
  user_fullname,
  user_id,
  user_username
}: TYPES.User_Request_Body): Promise<User> => {
  const createdUser: User = await prisma.user.create({
    data: {
      user_avatar,
      user_email,
      user_fullname,
      user_id,
      user_username
    }
  });

  return createdUser;
};

export const prisma_deleteUserbyuserid = async (
  user_id: TYPES.user_id
): Promise<User> => {
  const deletedUser: User = await prisma.user.delete({
    where: {
      user_id
    }
  });

  return deletedUser;
};

export const prisma_deleteUserbyusername = async (
  user_username: TYPES.user_username
): Promise<User> => {
  const deletedUser: User = await prisma.user.delete({
    where: {
      user_username
    }
  });

  return deletedUser;
};

export const prisma_getPageByPageid = async (
  page_id: TYPES.page_id
): Promise<Page> => {
  const page: Page = await prisma.page.findUnique({
    where: {
      page_id
    }
  });

  return page;
};

export const prisma_getPageByPageTitle = async (
  page_title: TYPES.page_title,
  user_id: TYPES.user_id
): Promise<Page> => {
  const page: Page = await prisma.page.findUnique({
    where: {
      user_title_unique: {
        page_title,
        page_user_id: user_id
      }
    }
  });

  return page;
};

export const prisma_createPage = async ({
  page_title,
  user_id
}: TYPES.Page_Body): Promise<Page> => {
  const createdPage: Page = await prisma.page.create({
    data: {
      page_title,
      Page_User: {
        connect: {
          user_id
        }
      },
      Page_Story: {}
    }
  });

  return createdPage;
};

export const prisma_createRetDailyPage = async (
  user_id: TYPES.user_id,
  today: TYPES.page_title
): Promise<TYPES.Page_Story_Todos> => {
  if (user_id.toString() !== "undefined") {
    const page = await prisma.page.upsert({
      where: {
        user_title_unique: {
          page_title: today,
          page_user_id: user_id
        }
      },
      create: {
        page_title: today,
        Page_User: {
          connect: {
            user_id
          }
        },
        Page_Story: {
          connectOrCreate: {
            where: {
              story_user_title_unique: {
                story_title: today,
                story_user_id: user_id
              }
            },
            create: {
              story_title: today,
              Story_User: {
                connect: {
                  user_id
                }
              }
            }
          }
        }
      },
      update: {},
      include: {
        Page_Story: true,
        Page_Todo: {
          select: TYPES.Useful_Todo_Include_Object,
          where: {
            todo_archived: false
          },
          orderBy: [{ todo_done: "asc" }, { todo_datecreated: "desc" }]
        }
      }
    });

    return page;
  }
};

export const prisma_deletePageByPageid = async (
  page_id: TYPES.page_id
): Promise<Page> => {
  const deletedPage: Page = await prisma.page.delete({
    where: {
      page_id
    }
  });

  return deletedPage;
};

export const prisma_deletePageByPageTitle = async (
  page_title: TYPES.page_title,
  user_id: TYPES.user_id
): Promise<Page> => {
  const deletedPage: Page = await prisma.page.delete({
    where: {
      user_title_unique: {
        page_title,
        page_user_id: user_id
      }
    }
  });

  return deletedPage;
};

export const prisma_getAllPagesByUserid = async (
  user_id: TYPES.user_id
): Promise<Page[]> => {
  const pages: Page[] = await prisma.page.findMany({
    where: {
      Page_User: {
        is: {
          user_id
        }
      }
    }
  });

  return pages;
};

export const prisma_deleteAllPagesByUserid = async (
  user_id: TYPES.user_id
): Promise<Prisma.BatchPayload> => {
  const deletedPages: Prisma.BatchPayload = await prisma.page.deleteMany({
    where: {
      Page_User: {
        is: {
          user_id
        }
      }
    }
  });

  return deletedPages;
};

export const prisma_getTodobyTodoId = async (
  todo_id: TYPES.todo_id
): Promise<TYPES.Useful_Todo> => {
  const todo: TYPES.Useful_Todo = await prisma.todo.findUnique({
    where: {
      todo_id
    },
    include: TYPES.Useful_Todo_Include_Object
  });

  return todo;
};

export const prisma_createTodo = async ({
  todo_description,
  page_id,
  user_id,
  todo_highlight
}: TYPES.Todo_Body): Promise<TYPES.Useful_Todo> => {
  const todo: TYPES.Useful_Todo = await prisma.todo.create({
    data: {
      todo_description,
      todo_highlight,
      Todo_User: {
        connect: {
          user_id
        }
      },
      Todo_Page: {
        connect: {
          page_id
        }
      }
    }
  });

  return todo;
};

export const prisma_deleteTodo = async (
  todo_id: TYPES.todo_id
): Promise<TYPES.Useful_Todo> => {
  const deletedTodo: TYPES.Useful_Todo = await prisma.todo.delete({
    where: {
      todo_id
    }
  });

  return deletedTodo;
};

export const prisma_getAllTodosByPage = async (
  page_id: TYPES.page_id,
  user_id: TYPES.user_id
): Promise<TYPES.Useful_Todo[]> => {
  const todos: TYPES.Useful_Todo[] = await prisma.todo.findMany({
    orderBy: [
      { todo_done: "asc" },
      { todo_description: "asc" },
      { todo_archived: "asc" }
    ],
    where: {
      AND: {
        Todo_Page: {
          is: {
            page_id
          }
        },
        Todo_User: {
          is: {
            user_id
          }
        }
      }
    }
  });

  return todos;
};

export const prisma_toggleTodoDone = async ({
  todo_id,
  todo_done
}: TYPES.Todo_Body): Promise<TYPES.Useful_Todo> => {
  const todo: TYPES.Useful_Todo = await prisma.todo.update({
    where: {
      todo_id
    },
    data: {
      todo_done
    }
  });

  return todo;
};

export const prisma_updateTodoDescription = async ({
  todo_id,
  todo_description
}: TYPES.Todo_Body): Promise<TYPES.Useful_Todo> => {
  const todo: TYPES.Useful_Todo = await prisma.todo.update({
    where: {
      todo_id
    },
    data: {
      todo_description
    }
  });

  return todo;
};

export const prisma_toggleArchived = async ({
  todo_id,
  todo_archived
}: TYPES.Todo_Body): Promise<TYPES.Useful_Todo> => {
  const todo: TYPES.Useful_Todo = await prisma.todo.update({
    where: {
      todo_id
    },
    data: {
      todo_archived
    }
  });

  return todo;
};

export const prisma_makeHighlight = async (
  todo_id: TYPES.todo_id
): Promise<TYPES.Useful_Todo> => {
  const todo: TYPES.Useful_Todo = await prisma.todo.update({
    where: {
      todo_id
    },
    data: {
      todo_highlight: true
    }
  });

  return todo;
};

export const prisma_getStoryByStoryId = async (
  story_id: TYPES.story_id
): Promise<TYPES.Story_and_Todos> => {
  const story: TYPES.Story_and_Todos = await prisma.story.findUnique({
    where: {
      story_id
    },
    include: {
      Story_Todo: {
        select: TYPES.Useful_Todo_Include_Object,
        where: {
          todo_archived: false
        },
        orderBy: [
          { todo_done: "asc" },
          { todo_description: "asc" },
          { todo_archived: "asc" }
        ]
      }
    }
  });

  return story;
};

export const prisma_getStoryByStoryTitle = async (
  story_title: TYPES.story_title,
  user_id: TYPES.user_id
): Promise<TYPES.Story_and_Todos> => {
  const story: TYPES.Story_and_Todos = await prisma.story.findUnique({
    where: {
      story_user_title_unique: {
        story_title,
        story_user_id: user_id
      }
    },
    include: {
      Story_Todo: {
        select: TYPES.Useful_Todo_Include_Object,
        where: {
          todo_archived: false
        },
        orderBy: [
          { todo_done: "asc" },
          { todo_description: "asc" },
          { todo_archived: "asc" }
        ]
      }
    }
  });

  return story;
};

export const prisma_createUpdateStory = async ({
  story_user_id,
  page_id,
  today: story_title
}: {
  story_user_id: TYPES.user_id;
  today: TYPES.story_title;
  page_id: TYPES.page_id;
}): Promise<TYPES.Story_and_Todos> => {
  const story: TYPES.Story_and_Todos = await prisma.story.upsert({
    where: {
      story_user_title_unique: {
        story_title,
        story_user_id
      }
    },
    update: {},
    create: {
      story_title,
      Story_Page: {
        connect: {
          page_id
        }
      },
      Story_User: {
        connect: {
          user_id: story_user_id
        }
      }
    },
    include: {
      Story_Todo: {
        select: TYPES.Useful_Todo_Include_Object,
        where: {
          todo_archived: false
        },
        orderBy: [
          { todo_done: "asc" },
          { todo_description: "asc" },
          { todo_archived: "asc" }
        ]
      }
    }
  });

  return story;
};

export const prisma_deleteStoryByStoryid = async (
  story_id: TYPES.story_id
): Promise<Story> => {
  const story: Story = await prisma.story.delete({
    where: {
      story_id
    }
  });

  return story;
};

export const prisma_deleteStoryByStoryTitle = async (
  story_title: TYPES.story_title,
  story_user_id: TYPES.user_id
): Promise<Story> => {
  const story: Story = await prisma.story.delete({
    where: {
      story_user_title_unique: {
        story_title,
        story_user_id
      }
    }
  });

  return story;
};

export const prisma_addTodoToStory = async ({
  todo_id,
  story_id
}: TYPES.Story_Body): Promise<TYPES.Story_and_Todos> => {
  const story: TYPES.Story_and_Todos = await prisma.story.update({
    where: { story_id },
    data: {
      Story_Todo: {
        connect: {
          todo_id
        }
      }
    },
    include: {
      Story_Todo: {
        select: TYPES.Useful_Todo_Include_Object,
        where: {
          todo_archived: false
        },
        orderBy: [
          { todo_done: "asc" },
          { todo_description: "asc" },
          { todo_archived: "asc" }
        ]
      }
    }
  });

  return story;
};

export const prisma_removeTodoFromStory = async ({
  todo_id,
  story_id
}: TYPES.Story_Body): Promise<TYPES.Story_and_Todos> => {
  const story: TYPES.Story_and_Todos = await prisma.story.update({
    where: {
      story_id
    },
    data: {
      Story_Todo: {
        disconnect: {
          todo_id
        }
      }
    },
    include: {
      Story_Todo: {
        select: TYPES.Useful_Todo_Include_Object,
        where: {
          todo_archived: false
        },
        orderBy: [
          { todo_done: "asc" },
          { todo_description: "asc" },
          { todo_archived: "asc" }
        ]
      }
    }
  });

  return story;
};
