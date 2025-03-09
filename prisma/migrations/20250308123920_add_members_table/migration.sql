-- CreateTable
CREATE TABLE "members" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "youtube_id" VARCHAR NOT NULL,
    "chzzk_id" VARCHAR NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ar_internal_metadata" (
    "key" VARCHAR NOT NULL,
    "value" VARCHAR,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "ar_internal_metadata_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "channels" (
    "id" BIGSERIAL NOT NULL,
    "channel_identifier" VARCHAR,
    "musician" VARCHAR,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "channels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "channels_songs" (
    "song_id" BIGINT NOT NULL,
    "channel_id" BIGINT NOT NULL
);

-- CreateTable
CREATE TABLE "schema_migrations" (
    "version" VARCHAR NOT NULL,

    CONSTRAINT "schema_migrations_pkey" PRIMARY KEY ("version")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "ip_address" VARCHAR,
    "user_agent" VARCHAR,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "songs" (
    "id" BIGSERIAL NOT NULL,
    "music_title" VARCHAR,
    "music_link" VARCHAR,
    "music_time" VARCHAR,
    "music_thumbnail" VARCHAR,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "songs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" BIGSERIAL NOT NULL,
    "email_address" VARCHAR NOT NULL,
    "password_digest" VARCHAR NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "youtube_videos" (
    "id" BIGSERIAL NOT NULL,
    "video_id" VARCHAR,
    "kind" VARCHAR,
    "etag" VARCHAR,
    "published_at" TIMESTAMP(6),
    "channel_id" VARCHAR,
    "title" VARCHAR,
    "description" TEXT,
    "thumbnails" JSON,
    "channel_title" VARCHAR,
    "live_broadcast_content" VARCHAR,
    "publish_time" TIMESTAMP(6),
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "youtube_videos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "index_channels_songs_on_channel_id_and_song_id" ON "channels_songs"("channel_id", "song_id");

-- CreateIndex
CREATE INDEX "index_sessions_on_user_id" ON "sessions"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "index_users_on_email_address" ON "users"("email_address");

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "fk_rails_758836b4f0" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
