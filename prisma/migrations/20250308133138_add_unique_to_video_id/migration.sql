/*
  Warnings:

  - A unique constraint covering the columns `[video_id]` on the table `youtube_videos` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "youtube_videos_video_id_key" ON "youtube_videos"("video_id");
