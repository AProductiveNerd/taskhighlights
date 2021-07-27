/*
  Warnings:

  - Changed the type of `user_avatar` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "user_avatar",
ADD COLUMN     "user_avatar" JSON NOT NULL;
