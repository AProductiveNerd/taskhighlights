import * as TYPES from "./../constants/Types";

import {
  Habit,
  Page,
  Prisma,
  PrismaClient,
  Routine,
  Story,
  Template,
  User,
} from "@prisma/client";

// Prevent multiple instances of Prisma Client in development
// eslint-disable-next-line init-declarations
declare const global: NodeJS.Global & { prisma?: PrismaClient };

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
          Story_Todo: {
            select: TYPES.Useful_Todo_Include_Object,
          },
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
  const avatar = JSON.parse(JSON.stringify(user_avatar));
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
          select: TYPES.Useful_Todo_Include_Object,
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
): Promise<TYPES.type_Useful_Todo> => {
  const todo: TYPES.type_Useful_Todo = await prisma.todo.findUnique({
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
}): Promise<TYPES.type_Useful_Todo> => {
  const todo: TYPES.type_Useful_Todo = await prisma.todo.create({
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
): Promise<TYPES.type_Useful_Todo> => {
  const deletedTodo: TYPES.type_Useful_Todo = await prisma.todo.delete({
    where: {
      todo_id,
    },
  });

  return deletedTodo;
};

export const prisma_getAllIncompleteTodosByPage = async (
  user_id: TYPES.type_user_id
): Promise<TYPES.type_Useful_Todo[]> => {
  const todos: TYPES.type_Useful_Todo[] = await prisma.todo.findMany({
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

export const prisma_toggleTodoDone = async ({
  todo_id,
  todo_done,
}: {
  todo_id: TYPES.type_todo_id;
  todo_done: TYPES.type_todo_done;
}): Promise<TYPES.type_Useful_Todo> => {
  const todo: TYPES.type_Useful_Todo = await prisma.todo.update({
    where: {
      todo_id,
    },
    data: {
      todo_done,
    },
  });

  if (todo.todo_highlight) {
    if (todo.todo_done) {
      const if_todo: TYPES.type_Useful_Todo = await prisma.todo.update({
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
      const if_todo: TYPES.type_Useful_Todo = await prisma.todo.update({
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
}): Promise<TYPES.type_Useful_Todo> => {
  const todo: TYPES.type_Useful_Todo = await prisma.todo.update({
    where: {
      todo_id,
    },
    data: {
      todo_description,
    },
  });

  return todo;
};

export const prisma_toggleArchived = async ({
  todo_id,
  todo_archived,
}: {
  todo_id: TYPES.type_todo_id;
  todo_archived: TYPES.type_todo_archived;
}): Promise<TYPES.type_Useful_Todo> => {
  const todo: TYPES.type_Useful_Todo = await prisma.todo.update({
    where: {
      todo_id,
    },
    data: {
      todo_archived,
    },
  });

  return todo;
};

export const prisma_makeHighlight = async (
  todo_id: TYPES.type_todo_id
): Promise<TYPES.type_Useful_Todo> => {
  const todo: TYPES.type_Useful_Todo = await prisma.todo.update({
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
        select: TYPES.Useful_Todo_Include_Object,
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
        select: TYPES.Useful_Todo_Include_Object,
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
        select: TYPES.Useful_Todo_Include_Object,
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
        select: TYPES.Useful_Todo_Include_Object,
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
        select: TYPES.Useful_Todo_Include_Object,
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

export const prisma_createRetDailyRoutine = async (
  user_id: TYPES.type_user_id,
  today: TYPES.type_routine_title
): Promise<TYPES.type_Routine_and_Habits> => {
  if (user_id.toString() !== "undefined") {
    const page = await prisma.routine.upsert({
      where: {
        user_routine_title_unique: {
          routine_title: today,
          routine_user_id: user_id,
        },
      },
      create: {
        routine_title: today,
        Routine_User: {
          connect: {
            user_id,
          },
        },
      },
      update: {},
      include: {
        Routine_Habits: {
          select: TYPES.Useful_Habit_Include_Object,
          orderBy: [{ habit_done: "asc" }, { habit_datecreated: "desc" }],
        },
      },
    });

    return page;
  }
};

export const prisma_getRoutineByRoutineid = async (
  routine_id: TYPES.type_routine_id
): Promise<Routine> => {
  const routine: Routine = await prisma.routine.findUnique({
    where: {
      routine_id,
    },
  });

  return routine;
};

export const prisma_deleteRoutineByRoutineid = async (
  routine_id: TYPES.type_routine_id
): Promise<Routine> => {
  const deletedRoutine: Routine = await prisma.routine.delete({
    where: {
      routine_id,
    },
  });

  return deletedRoutine;
};

export const prisma_getRoutineByRoutineTitle = async (
  routine_title: TYPES.type_routine_title,
  user_id: TYPES.type_user_id
): Promise<Routine> => {
  const routine: Routine = await prisma.routine.findUnique({
    where: {
      user_routine_title_unique: {
        routine_title,
        routine_user_id: user_id,
      },
    },
  });

  return routine;
};

export const prisma_createRoutine = async ({
  routine_title,
  user_id,
}: TYPES.type_Routine_Body): Promise<Routine> => {
  const createdRoutine: Routine = await prisma.routine.create({
    data: {
      routine_title,
      Routine_User: {
        connect: {
          user_id,
        },
      },
    },
  });

  return createdRoutine;
};

export const prisma_getHabitbyHabitid = async (
  habit_id: TYPES.type_habit_id
): Promise<TYPES.type_Useful_Habit> => {
  const habit: Habit = await prisma.habit.findUnique({
    where: {
      habit_id,
    },
  });

  return habit;
};

export const prisma_toggleHabitDone = async ({
  habit_id,
  habit_done,
}: TYPES.Habit_Body): Promise<TYPES.type_Useful_Habit> => {
  const habit: TYPES.type_Useful_Habit = await prisma.habit.update({
    where: {
      habit_id,
    },
    data: {
      habit_done,
    },
  });

  return habit;
};

export const prisma_createHabit = async ({
  habit_description,
  routine_id,
  user_id,
}: TYPES.Habit_Body): Promise<TYPES.type_Useful_Habit> => {
  const todo: TYPES.type_Useful_Habit = await prisma.habit.create({
    data: {
      habit_description,
      Habit_User: {
        connect: {
          user_id,
        },
      },
      Habit_Routine: {
        connect: {
          routine_id,
        },
      },
    },
  });

  return todo;
};

export const prisma_deleteHabit = async (
  habit_id: TYPES.type_habit_id
): Promise<TYPES.type_Useful_Habit> => {
  const deletedHabit: TYPES.type_Useful_Habit = await prisma.habit.delete({
    where: {
      habit_id,
    },
  });

  return deletedHabit;
};

// export const prisma_createManyHabit = async ({
//   habits,
//   routine_id,
//   user_id
// }: TYPES.Habit_Body): Promise<Prisma.BatchPayload> => {
//   const dataArr = habits.map((i) => {
//     return {
//       habit_description: i,
//       habit_routine_id: routine_id,
//       habit_user_id: user_id
//     };
//   });

//   const count: Prisma.BatchPayload = await prisma.habit.createMany({
//     data: dataArr
//   });

//   // await prisma.routine.update({
//   //   where: {
//   //     routine_id
//   //   },
//   //   data: {
//   //     Routine_Habits: {
//   //       createMany: {
//   //         data: habits,
//   //         skipDuplicates: true
//   //       }
//   //     }
//   //   }
//   // });

//   return count;
// };
export const prisma_createManyHabit = async ({
  template_id,
  routine_id,
  user_id,
}: TYPES.Habit_Body): Promise<Prisma.BatchPayload> => {
  const template = await prisma.template.findUnique({
    where: {
      template_id,
    },
  });

  const habits = template.template_habits;

  const dataArr = habits.map((i) => {
    return {
      habit_description: i,
      habit_routine_id: routine_id,
      habit_user_id: user_id,
    };
  });

  const count: Prisma.BatchPayload = await prisma.habit.createMany({
    data: dataArr,
  });

  return count;
};

export const prisma_createTemplate = async ({
  template_habits,

  template_title,
  user_id,
}: TYPES.type_Create_Template_Body): Promise<Template> => {
  const template: Template = await prisma.template.create({
    data: {
      template_title,
      template_habits,
      Template_User: {
        connect: {
          user_id,
        },
      },
    },
  });

  return template;
};

export const prisma_getAllUserTemplates = async (
  user_id: TYPES.type_user_id
): Promise<Template[]> => {
  const templates: Template[] = await prisma.template.findMany({
    where: {
      Template_User: {
        user_id,
      },
    },
  });

  return templates;
};

export const prisma_addHabitToTemplate = async ({
  habit_description,
  template_id,
}: {
  template_id: TYPES.type_template_id;
  habit_description: TYPES.type_habit_description;
}): Promise<Template> => {
  const template: Template = await prisma.template.update({
    where: {
      template_id,
    },
    data: {
      template_habits: {
        push: habit_description,
      },
    },
  });

  return template;
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
          select: TYPES.Useful_Todo_Include_Object,
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

export const prisma_getAllArchivedTodosByPage = async (
  user_id: TYPES.type_user_id
): Promise<TYPES.type_Useful_Todo[]> => {
  const todos: TYPES.type_Useful_Todo[] = await prisma.todo.findMany({
    orderBy: [
      { todo_done: "asc" },
      { todo_description: "asc" },
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
}): Promise<TYPES.type_Useful_Todo> => {
  const todo: TYPES.type_Useful_Todo = await prisma.todo.update({
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
}): Promise<TYPES.type_Useful_Todo> => {
  const page = await prisma.page.findUnique({
    where: {
      user_title_unique: {
        page_title: today,
        page_user_id: user_id,
      },
    },
  });
  const new_page_id: TYPES.type_page_title = page.page_id;
  const todo: TYPES.type_Useful_Todo = await prisma.todo.update({
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
): Promise<TYPES.type_Page_and_Todos> => {
  const page = await prisma.page.findUnique({
    where: {
      page_public_link,
    },
    include: {
      Page_Story: true,
      Page_Todo: {
        select: TYPES.Useful_Todo_Include_Object,
        where: {
          todo_archived: false,
        },
        orderBy: [{ todo_done: "asc" }, { todo_datecreated: "desc" }],
      },
    },
  });

  return page;
};
