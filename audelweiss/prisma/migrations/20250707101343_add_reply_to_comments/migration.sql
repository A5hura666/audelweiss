-- AlterTable
ALTER TABLE `Comment` ADD COLUMN `replyTo` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_replyTo_fkey` FOREIGN KEY (`replyTo`) REFERENCES `Comment`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
