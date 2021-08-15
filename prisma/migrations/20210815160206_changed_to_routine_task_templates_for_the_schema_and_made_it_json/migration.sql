/*
  Warnings:

  - You are about to drop the column `user_routine_tasks` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "user_routine_tasks",
ADD COLUMN     "user_routine_templates" JSONB[];
