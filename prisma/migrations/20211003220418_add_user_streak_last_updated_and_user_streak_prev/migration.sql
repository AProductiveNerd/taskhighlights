-- AlterTable
ALTER TABLE "User" ADD COLUMN     "user_streak_last_updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "user_streak_prev" INTEGER NOT NULL DEFAULT 0;
