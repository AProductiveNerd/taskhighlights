/*
  Warnings:

  - The `user_routine_templates` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "user_routine_templates",
ADD COLUMN     "user_routine_templates" JSONB;
