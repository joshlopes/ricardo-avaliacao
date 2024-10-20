/*
  Warnings:

  - Added the required column `subjectId` to the `EvaluationTopic` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `EvaluationTopic` ADD COLUMN `subjectId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `EvaluationTopic` ADD CONSTRAINT `EvaluationTopic_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `Subject`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
