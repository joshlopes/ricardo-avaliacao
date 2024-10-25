-- DropForeignKey
ALTER TABLE `Grade` DROP FOREIGN KEY `Grade_classId_fkey`;

-- AlterTable
ALTER TABLE `Grade` MODIFY `classId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Grade` ADD CONSTRAINT `Grade_classId_fkey` FOREIGN KEY (`classId`) REFERENCES `Class`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
