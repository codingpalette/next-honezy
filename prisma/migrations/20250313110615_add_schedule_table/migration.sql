-- AlterTable
ALTER TABLE "members" ADD COLUMN     "color" VARCHAR;

-- CreateTable
CREATE TABLE "schedule" (
    "id" BIGSERIAL NOT NULL,
    "title" VARCHAR NOT NULL,
    "time" VARCHAR NOT NULL,
    "date" DATE NOT NULL,
    "member_id" BIGINT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "schedule_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "members"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
