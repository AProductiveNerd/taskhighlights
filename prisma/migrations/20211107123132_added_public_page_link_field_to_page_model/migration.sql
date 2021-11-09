/*
  Warnings:

  - A unique constraint covering the columns `[page_public_link]` on the table `Page` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Page" ADD COLUMN     "page_public_link" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Page_page_public_link_key" ON "Page"("page_public_link");
