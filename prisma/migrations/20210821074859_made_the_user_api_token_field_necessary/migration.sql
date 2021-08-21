/*
  Warnings:

  - Made the column `user_api_token` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "user_api_token" SET NOT NULL;
