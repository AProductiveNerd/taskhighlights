import { Page, Prisma, PrismaClient, Todo, User } from "@prisma/client";

const prisma = new PrismaClient();

export interface User_Body {
  user_avatar: string;
  user_email: string;
  user_fullname: string;
  user_username: string;
  user_id: string;
}

export interface Page_Body {
  page_title: string;
  user_id: string;
}

export interface Todo_Body {
  todo_description?: string;
  user_id?: string;
  page_id?: string;
  task?: string;
  todo_id?: string;
  todo_done?: boolean;
  todo_archived?: boolean;
}

export type Page_and_Todos = Page & {
  Page_Todo: {
    todo_archived: boolean;
    todo_description: string;
    todo_done: boolean;
    todo_id: string;
  }[];
};

export interface Useful_Todo {
  todo_archived: boolean;
  todo_description: string;
  todo_done: boolean;
  todo_id: string;
}
export const getUserByUsername = async (
  user_username: string
): Promise<User> => {
  const user = await prisma.user.findUnique({
    where: {
      user_username
    }
  });

  return user;
};

export const getUserByUserid = async (user_id: string): Promise<User> => {
  const user = await prisma.user.findUnique({
    where: {
      user_id
    }
  });

  return user;
};

export const getUserByEmailaddress = async (
  user_email: string
): Promise<User> => {
  const user = await prisma.user.findUnique({
    where: {
      user_email
    }
  });

  return user;
};

export const createUser = async ({
  user_avatar,
  user_email,
  user_fullname,
  user_id,
  user_username
}: User_Body): Promise<User> => {
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

export const deleteUserbyuserid = async (user_id: string): Promise<User> => {
  const deletedUser: User = await prisma.user.delete({
    where: {
      user_id
    }
  });

  return deletedUser;
};

export const deleteUserbyemail = async (user_email: string): Promise<User> => {
  const deletedUser: User = await prisma.user.delete({
    where: {
      user_email
    }
  });

  return deletedUser;
};

export const deleteUserbyusername = async (
  user_username: string
): Promise<User> => {
  const deletedUser: User = await prisma.user.delete({
    where: {
      user_username
    }
  });

  return deletedUser;
};

export const getPageByPageid = async (page_id: string): Promise<Page> => {
  const page: Page = await prisma.page.findUnique({
    where: {
      page_id
    }
  });

  return page;
};

export const getPageByPageTitle = async (
  page_title: string,
  user_id: string
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

export const createPage = async ({
  page_title,
  user_id
}: Page_Body): Promise<Page> => {
  const createdPage: Page = await prisma.page.create({
    data: {
      page_title,
      Page_User: {
        connect: {
          user_id
        }
      }
    }
  });

  return createdPage;
};

export const createRetDailyPage = async (
  user_id: string,
  today: string
): Promise<Page_and_Todos> => {
  if (user_id.toString() !== "undefined") {
    const page: Page_and_Todos = await prisma.page.upsert({
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
        }
      },
      update: {},
      include: {
        Page_Todo: {
          select: {
            todo_archived: true,
            todo_description: true,
            todo_done: true,
            todo_id: true,
            Todo_Page: false,
            Todo_User: false,
            todo_datecreated: false,
            todo_page_id: false,
            todo_user_id: false
          }
        }
      }
    });

    return page;
  }
};

export const deletePageByPageid = async (page_id: string): Promise<Page> => {
  const deletedPage: Page = await prisma.page.delete({
    where: {
      page_id
    }
  });

  return deletedPage;
};

export const deletePageByPageTitle = async (
  page_title: string,
  user_id: string
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

export const getAllPagesByUserid = async (user_id: string): Promise<Page[]> => {
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

export const deleteAllPagesByUserid = async (
  user_id: string
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

export const getTodobyTodoId = async (todo_id: string): Promise<Todo> => {
  const todo: Todo = await prisma.todo.findUnique({
    where: {
      todo_id
    }
  });

  return todo;
};

export const createTodo = async ({
  todo_description,
  page_id,
  user_id
}: Todo_Body): Promise<Todo> => {
  const todo: Todo = await prisma.todo.create({
    data: {
      todo_description,
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

export const deleteTodo = async (todo_id: string): Promise<Todo> => {
  const deletedTodo: Todo = await prisma.todo.delete({
    where: {
      todo_id
    }
  });

  return deletedTodo;
};

export const getAllTodosByPage = async (
  page_id: string,
  user_id: string
): Promise<Todo[]> => {
  const todos: Todo[] = await prisma.todo.findMany({
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

export const toggleTodoDone = async ({
  todo_id,
  todo_done
}: Todo_Body): Promise<Todo> => {
  const todo: Todo = await prisma.todo.update({
    where: {
      todo_id
    },
    data: {
      todo_done
    }
  });

  return todo;
};

export const updateTodoDescription = async ({
  todo_id,
  todo_description
}: Todo_Body): Promise<Todo> => {
  const todo: Todo = await prisma.todo.update({
    where: {
      todo_id
    },
    data: {
      todo_description
    }
  });

  return todo;
};

export const toggleArchived = async ({
  todo_id,
  todo_archived
}: Todo_Body): Promise<Todo> => {
  const todo: Todo = await prisma.todo.update({
    where: {
      todo_id
    },
    data: {
      todo_archived
    }
  });

  return todo;
};
