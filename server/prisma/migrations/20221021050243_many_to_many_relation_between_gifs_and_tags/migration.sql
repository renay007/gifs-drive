/*
  Warnings:

  - You are about to drop the column `gif_id` on the `Tag` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "GifTag" (
    "gif_tag_id" TEXT NOT NULL PRIMARY KEY,
    "gif_id" TEXT NOT NULL,
    "tag_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "GifTag_gif_id_fkey" FOREIGN KEY ("gif_id") REFERENCES "Gif" ("gif_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "GifTag_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "Tag" ("tag_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Gif" (
    "gif_id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "public_url" TEXT,
    "user_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Gif_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Gif" ("created_at", "gif_id", "name", "public_url", "updated_at", "user_id") SELECT "created_at", "gif_id", "name", "public_url", "updated_at", "user_id" FROM "Gif";
DROP TABLE "Gif";
ALTER TABLE "new_Gif" RENAME TO "Gif";
CREATE TABLE "new_Tag" (
    "tag_id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Tag" ("created_at", "name", "tag_id", "updated_at") SELECT "created_at", "name", "tag_id", "updated_at" FROM "Tag";
DROP TABLE "Tag";
ALTER TABLE "new_Tag" RENAME TO "Tag";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
