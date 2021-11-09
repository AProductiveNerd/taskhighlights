/*
  Warnings:

  - Made the column `page_public_link` on table `Page` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Page" ALTER COLUMN "page_public_link" SET NOT NULL;
