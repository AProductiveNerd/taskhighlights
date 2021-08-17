import * as TYPES from "./../constants/Types";

import {
  Habit,
  Page,
  Prisma,
  PrismaClient,
  Routine,
  Story,
  User
} from "@prisma/client";

const prisma = new PrismaClient();

export const prisma_getUserByUsername = async (
  user_username: TYPES.user_username
): Promise<TYPES.User_Story_Todo> => {
  const user: TYPES.User_Story_Todo = await prisma.user.findUnique({
    where: {
      user_username
    },
    include: {
      User_Story: {
        include: {
          Story_Todo: {
            select: TYPES.Useful_Todo_Include_Object
          }
        },
        orderBy: {
          story_datecreated: "asc"
        }
      }
    }
  });

  return user;
};

export const prisma_getUserByUserid = async (
  user_id: TYPES.user_id
): Promise<User> => {
  const user: User = await prisma.user.findUnique({
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
  const avatar = JSON.parse(JSON.stringify(user_avatar));
  const createdUser: User = await prisma.user.create({
    data: {
      user_avatar: avatar,
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

export const prisma_getAllIncompleteTodosByPage = async (
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
        Todo_User: {
          is: {
            user_id
          }
        },
        todo_done: false
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

export const prisma_moveTasks = async ({
  old_page_id,
  new_page_id
}: TYPES.moveTasks): Promise<Prisma.BatchPayload> => {
  const todos: Prisma.BatchPayload = await prisma.todo.updateMany({
    where: {
      AND: {
        Todo_Page: {
          page_id: old_page_id
        },
        todo_done: false
      }
    },
    data: {
      todo_page_id: new_page_id
    }
  });

  return todos;
};

export const prisma_createRetDailyRoutine = async (
  user_id: TYPES.user_id,
  today: TYPES.routine_title
): Promise<TYPES.Routine_and_Habits> => {
  if (user_id.toString() !== "undefined") {
    const page = await prisma.routine.upsert({
      where: {
        user_routine_title_unique: {
          routine_title: today,
          routine_user_id: user_id
        }
      },
      create: {
        routine_title: today,
        Routine_User: {
          connect: {
            user_id
          }
        }
      },
      update: {},
      include: {
        Routine_Habits: {
          select: TYPES.Useful_Habit_Include_Object,
          orderBy: [{ habit_done: "asc" }, { habit_datecreated: "desc" }]
        }
      }
    });

    return page;
  }
};

export const prisma_getRoutineByRoutineid = async (
  routine_id: TYPES.routine_id
): Promise<Routine> => {
  const routine: Routine = await prisma.routine.findUnique({
    where: {
      routine_id
    }
  });

  return routine;
};

export const prisma_deleteRoutineByRoutineid = async (
  routine_id: TYPES.routine_id
): Promise<Routine> => {
  const deletedRoutine: Routine = await prisma.routine.delete({
    where: {
      routine_id
    }
  });

  return deletedRoutine;
};

export const prisma_getRoutineByRoutineTitle = async (
  routine_title: TYPES.routine_title,
  user_id: TYPES.user_id
): Promise<Routine> => {
  const Routine: Routine = await prisma.routine.findUnique({
    where: {
      user_routine_title_unique: {
        routine_title,
        routine_user_id: user_id
      }
    }
  });

  return Routine;
};

export const prisma_createRoutine = async ({
  routine_title,
  user_id
}: TYPES.Routine_Body): Promise<Routine> => {
  const createdRoutine: Routine = await prisma.routine.create({
    data: {
      routine_title,
      Routine_User: {
        connect: {
          user_id
        }
      }
    }
  });

  return createdRoutine;
};

export const prisma_getHabitbyHabitid = async (
  habit_id: TYPES.habit_id
): Promise<TYPES.Useful_Habit> => {
  const habit: Habit = await prisma.habit.findUnique({
    where: {
      habit_id
    }
  });

  return habit;
};

export const prisma_toggleHabitDone = async ({
  habit_id,
  habit_done
}: TYPES.Habit_Body): Promise<TYPES.Useful_Habit> => {
  const habit: TYPES.Useful_Habit = await prisma.habit.update({
    where: {
      habit_id
    },
    data: {
      habit_done
    }
  });

  return habit;
};

export const prisma_createHabit = async ({
  habit_description,
  routine_id,
  user_id
}: TYPES.Habit_Body): Promise<TYPES.Useful_Habit> => {
  const todo: TYPES.Useful_Habit = await prisma.habit.create({
    data: {
      habit_description,
      Habit_User: {
        connect: {
          user_id
        }
      },
      Habit_Routine: {
        connect: {
          routine_id
        }
      }
    }
  });

  return todo;
};

export const prisma_deleteHabit = async (
  habit_id: TYPES.habit_id
): Promise<TYPES.Useful_Habit> => {
  const deletedHabit: TYPES.Useful_Habit = await prisma.habit.delete({
    where: {
      habit_id
    }
  });

  return deletedHabit;
};

export const prisma_createManyHabit = async ({
  habits,
  routine_id,
  user_id
}: TYPES.Habit_Body): Promise<Prisma.BatchPayload> => {
  const dataArr = habits.map((i) => {
    return {
      habit_description: i,
      habit_routine_id: routine_id,
      habit_user_id: user_id
    };
  });

  const count: Prisma.BatchPayload = await prisma.habit.createMany({
    data: dataArr
  });

  // await prisma.routine.update({
  //   where: {
  //     routine_id
  //   },
  //   data: {
  //     Routine_Habits: {
  //       createMany: {
  //         data: habits,
  //         skipDuplicates: true
  //       }
  //     }
  //   }
  // });

  return count;
};

export const prisma_createTemplate = async ({
  template_habits,
  template_id,
  template_name,
  user_id
}: TYPES.User_Request_Body): Promise<User> => {
  const user: User = await prisma.user.update({
    where: {
      user_id
    },
    data: {
      user_routine_templates: {
        push: {
          template_id,
          template_name,
          template_habits
        }
      }
    }
  });

  return user;
};
