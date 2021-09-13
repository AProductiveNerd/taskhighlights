/*
  Warnings:

  - You are about to drop the `Routine_Templates` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Routine_Templates" DROP CONSTRAINT "Routine_Templates_template_user_id_fkey";

-- DropTable
DROP TABLE "Routine_Templates";

-- CreateTable
CREATE TABLE "Template" (
    "template_id" TEXT NOT NULL,
    "template_title" TEXT NOT NULL,
    "template_habits" TEXT[],
    "template_user_id" TEXT NOT NULL,

    CONSTRAINT "Template_pkey" PRIMARY KEY ("template_id")
);

-- AddForeignKey
ALTER TABLE "Template" ADD CONSTRAINT "Template_template_user_id_fkey" FOREIGN KEY ("template_user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
