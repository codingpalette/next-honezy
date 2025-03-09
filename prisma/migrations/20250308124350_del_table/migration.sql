/*
  Warnings:

  - You are about to drop the `ar_internal_metadata` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `channels` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `channels_songs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `schema_migrations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sessions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `songs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `youtube_videos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "fk_rails_758836b4f0";

-- DropTable
DROP TABLE "ar_internal_metadata";

-- DropTable
DROP TABLE "channels";

-- DropTable
DROP TABLE "channels_songs";

-- DropTable
DROP TABLE "schema_migrations";

-- DropTable
DROP TABLE "sessions";

-- DropTable
DROP TABLE "songs";

-- DropTable
DROP TABLE "users";

-- DropTable
DROP TABLE "youtube_videos";
