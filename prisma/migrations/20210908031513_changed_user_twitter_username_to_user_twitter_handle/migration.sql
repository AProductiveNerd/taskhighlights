/*
  Warnings:

  - You are about to drop the column `user_twitter_username` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "user_twitter_username",
ADD COLUMN     "user_twitter_handle" TEXT;
