/*
  Warnings:

  - A unique constraint covering the columns `[youtube_id]` on the table `members` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[chzzk_id]` on the table `members` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "youtube_videos" (
    "id" BIGSERIAL NOT NULL,
    "video_id" TEXT NOT NULL,
    "kind" TEXT,
    "etag" TEXT,
    "published_at" TIMESTAMP(3),
    "channel_id" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "thumbnails" JSONB,
    "channel_title" TEXT,
    "live_broadcast_content" TEXT,
    "publish_time" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "youtube_videos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "members_youtube_id_key" ON "members"("youtube_id");

-- CreateIndex
CREATE UNIQUE INDEX "members_chzzk_id_key" ON "members"("chzzk_id");

-- AddForeignKey
ALTER TABLE "youtube_videos" ADD CONSTRAINT "youtube_videos_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "members"("youtube_id") ON DELETE RESTRICT ON UPDATE CASCADE;
