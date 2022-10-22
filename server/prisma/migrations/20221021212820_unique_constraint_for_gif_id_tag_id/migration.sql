/*
  Warnings:

  - A unique constraint covering the columns `[gif_id,tag_id]` on the table `GifTag` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "GifTag_gif_id_tag_id_key" ON "GifTag"("gif_id", "tag_id");
