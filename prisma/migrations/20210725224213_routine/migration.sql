/*
  Warnings:

  - You are about to drop the column `todo_routine` on the `Todo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "todo_routine";

-- CreateTable
CREATE TABLE "Routine" (
    "routine_id" TEXT NOT NULL,
    "routine_datecreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "routine_description" TEXT NOT NULL,
    "routine_done" BOOLEAN NOT NULL DEFAULT false,
    "routine_user_id" TEXT NOT NULL,

    PRIMARY KEY ("routine_id")
);

-- AddForeignKey
ALTER TABLE "Routine" ADD FOREIGN KEY ("routine_user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
