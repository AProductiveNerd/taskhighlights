/*
  Warnings:

  - Added the required column `routine_description` to the `Routine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `routine_user_id` to the `Routine` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Routine" DROP CONSTRAINT "Routine_routine_id_fkey";

-- AlterTable
ALTER TABLE "Routine" ADD COLUMN     "routine_datecreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "routine_description" TEXT NOT NULL,
ADD COLUMN     "routine_done" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "routine_user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Routine" ADD FOREIGN KEY ("routine_user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
