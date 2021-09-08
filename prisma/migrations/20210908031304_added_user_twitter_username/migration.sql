-- DropForeignKey
ALTER TABLE "Habit" DROP CONSTRAINT "Habit_habit_routine_id_fkey";

-- DropForeignKey
ALTER TABLE "Habit" DROP CONSTRAINT "Habit_habit_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Page" DROP CONSTRAINT "Page_page_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Routine" DROP CONSTRAINT "Routine_routine_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Routine_Templates" DROP CONSTRAINT "Routine_Templates_template_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Story" DROP CONSTRAINT "Story_story_page_id_fkey";

-- DropForeignKey
ALTER TABLE "Story" DROP CONSTRAINT "Story_story_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_todo_page_id_fkey";

-- DropForeignKey
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_todo_user_id_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "user_twitter_username" TEXT;

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_page_user_id_fkey" FOREIGN KEY ("page_user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Routine" ADD CONSTRAINT "Routine_routine_user_id_fkey" FOREIGN KEY ("routine_user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Story" ADD CONSTRAINT "Story_story_page_id_fkey" FOREIGN KEY ("story_page_id") REFERENCES "Page"("page_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Story" ADD CONSTRAINT "Story_story_user_id_fkey" FOREIGN KEY ("story_user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_todo_page_id_fkey" FOREIGN KEY ("todo_page_id") REFERENCES "Page"("page_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_todo_user_id_fkey" FOREIGN KEY ("todo_user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Habit" ADD CONSTRAINT "Habit_habit_routine_id_fkey" FOREIGN KEY ("habit_routine_id") REFERENCES "Routine"("routine_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Habit" ADD CONSTRAINT "Habit_habit_user_id_fkey" FOREIGN KEY ("habit_user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Routine_Templates" ADD CONSTRAINT "Routine_Templates_template_user_id_fkey" FOREIGN KEY ("template_user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "user_title_unique" RENAME TO "Page_page_user_id_page_title_key";

-- RenameIndex
ALTER INDEX "user_routine_title_unique" RENAME TO "Routine_routine_user_id_routine_title_key";

-- RenameIndex
ALTER INDEX "Story.story_page_id_unique" RENAME TO "Story_story_page_id_key";

-- RenameIndex
ALTER INDEX "story_user_title_unique" RENAME TO "Story_story_user_id_story_title_key";

-- RenameIndex
ALTER INDEX "User.user_email_unique" RENAME TO "User_user_email_key";

-- RenameIndex
ALTER INDEX "User.user_username_unique" RENAME TO "User_user_username_key";
