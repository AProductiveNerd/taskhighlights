/*
  Warnings:

  - You are about to drop the column `routine_description` on the `Routine` table. All the data in the column will be lost.
  - You are about to drop the column `routine_done` on the `Routine` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[routine_user_id,routine_title]` on the table `Routine` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `routine_last_accessed` to the `Routine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `routine_title` to the `Routine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Routine" DROP COLUMN "routine_description",
DROP COLUMN "routine_done",
ADD COLUMN     "routine_last_accessed" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "routine_title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "user_routine_tasks" TEXT[];

-- CreateTable
CREATE TABLE "Habit" (
    "habit_id" TEXT NOT NULL,
    "habit_datecreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "habit_description" TEXT NOT NULL,
    "habit_done" BOOLEAN NOT NULL DEFAULT false,
    "habit_user_id" TEXT NOT NULL,
    "habit_routine_id" TEXT NOT NULL,

    PRIMARY KEY ("habit_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_routine_title_unique" ON "Routine"("routine_user_id", "routine_title");

-- AddForeignKey
ALTER TABLE "Habit" ADD FOREIGN KEY ("habit_routine_id") REFERENCES "Routine"("routine_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Habit" ADD FOREIGN KEY ("habit_user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
