-- CreateEnum
CREATE TYPE "User_Level" AS ENUM ('None', 'Bronze', 'Silver', 'Gold', 'Sapphire', 'Ruby', 'Emerald', 'Amethyst', 'Pearl', 'Obsidian', 'Diamond');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "user_level" "User_Level" NOT NULL DEFAULT E'None';
