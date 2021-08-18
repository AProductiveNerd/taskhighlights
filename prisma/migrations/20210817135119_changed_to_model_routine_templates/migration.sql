/*
  Warnings:

  - You are about to drop the column `user_routine_templates` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "user_routine_templates";

-- CreateTable
CREATE TABLE "Routine_Templates" (
    "template_id" TEXT NOT NULL,
    "template_title" TEXT NOT NULL,
    "template_habits" TEXT[],
    "template_user_id" TEXT NOT NULL,

    PRIMARY KEY ("template_id")
);

-- AddForeignKey
ALTER TABLE "Routine_Templates" ADD FOREIGN KEY ("template_user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
