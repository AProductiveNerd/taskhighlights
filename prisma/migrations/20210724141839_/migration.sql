-- CreateTable
CREATE TABLE "Page" (
    "page_id" TEXT NOT NULL,
    "page_datecreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "page_title" TEXT NOT NULL,
    "page_last_accessed" TIMESTAMP(3) NOT NULL,
    "page_user_id" TEXT NOT NULL,

    PRIMARY KEY ("page_id")
);

-- CreateTable
CREATE TABLE "Routine" (
    "routine_id" TEXT NOT NULL,

    PRIMARY KEY ("routine_id")
);

-- CreateTable
CREATE TABLE "Story" (
    "story_id" TEXT NOT NULL,
    "story_datecreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "story_user_id" TEXT NOT NULL,
    "story_title" TEXT NOT NULL,
    "story_page_id" TEXT NOT NULL,

    PRIMARY KEY ("story_id")
);

-- CreateTable
CREATE TABLE "Todo" (
    "todo_id" TEXT NOT NULL,
    "todo_datecreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "todo_description" TEXT NOT NULL,
    "todo_done" BOOLEAN NOT NULL DEFAULT false,
    "todo_user_id" TEXT NOT NULL,
    "todo_page_id" TEXT NOT NULL,
    "todo_archived" BOOLEAN NOT NULL DEFAULT false,
    "todo_highlight" BOOLEAN NOT NULL DEFAULT false,
    "todo_story_id" TEXT,

    PRIMARY KEY ("todo_id")
);

-- CreateTable
CREATE TABLE "User" (
    "user_id" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,
    "user_username" TEXT NOT NULL,
    "user_lastseen" TIMESTAMP(3) NOT NULL,
    "user_datecreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_avatar" TEXT NOT NULL,
    "user_fullname" TEXT NOT NULL,
    "user_bio" TEXT,
    "user_followers" TEXT[],
    "user_following" TEXT[],

    PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_title_unique" ON "Page"("page_user_id", "page_title");

-- CreateIndex
CREATE UNIQUE INDEX "Story.story_page_id_unique" ON "Story"("story_page_id");

-- CreateIndex
CREATE UNIQUE INDEX "story_user_title_unique" ON "Story"("story_user_id", "story_title");

-- CreateIndex
CREATE UNIQUE INDEX "User.user_email_unique" ON "User"("user_email");

-- CreateIndex
CREATE UNIQUE INDEX "User.user_username_unique" ON "User"("user_username");

-- AddForeignKey
ALTER TABLE "Page" ADD FOREIGN KEY ("page_user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Routine" ADD FOREIGN KEY ("routine_id") REFERENCES "Todo"("todo_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Story" ADD FOREIGN KEY ("story_page_id") REFERENCES "Page"("page_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Story" ADD FOREIGN KEY ("story_user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Todo" ADD FOREIGN KEY ("todo_page_id") REFERENCES "Page"("page_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Todo" ADD FOREIGN KEY ("todo_story_id") REFERENCES "Story"("story_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Todo" ADD FOREIGN KEY ("todo_user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
