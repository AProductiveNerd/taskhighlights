-- AlterTable
ALTER TABLE "Page" ALTER COLUMN "page_last_accessed" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "user_lastseen" DROP DEFAULT;
