-- CreateTable
CREATE TABLE "youtube_music" (
    "id" BIGSERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "youtube_music_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_membersToyoutube_music" (
    "A" BIGINT NOT NULL,
    "B" BIGINT NOT NULL,

    CONSTRAINT "_membersToyoutube_music_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_membersToyoutube_music_B_index" ON "_membersToyoutube_music"("B");

-- AddForeignKey
ALTER TABLE "_membersToyoutube_music" ADD CONSTRAINT "_membersToyoutube_music_A_fkey" FOREIGN KEY ("A") REFERENCES "members"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_membersToyoutube_music" ADD CONSTRAINT "_membersToyoutube_music_B_fkey" FOREIGN KEY ("B") REFERENCES "youtube_music"("id") ON DELETE CASCADE ON UPDATE CASCADE;
