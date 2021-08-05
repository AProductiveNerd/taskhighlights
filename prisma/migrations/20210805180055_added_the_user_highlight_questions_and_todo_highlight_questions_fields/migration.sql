-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "todo_highlight_questions" JSON;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "user_highlight_questions" TEXT[];
