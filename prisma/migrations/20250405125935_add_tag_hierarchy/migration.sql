-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "description" TEXT,
ADD COLUMN     "parent_id" BIGINT;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "Tag"("id") ON DELETE SET NULL ON UPDATE CASCADE;
