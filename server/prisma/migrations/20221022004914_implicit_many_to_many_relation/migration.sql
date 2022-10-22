/*
  Warnings:

  - You are about to drop the `GifTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "GifTag";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_GifToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_GifToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Gif" ("gif_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_GifToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag" ("tag_id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_GifToTag_AB_unique" ON "_GifToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_GifToTag_B_index" ON "_GifToTag"("B");
