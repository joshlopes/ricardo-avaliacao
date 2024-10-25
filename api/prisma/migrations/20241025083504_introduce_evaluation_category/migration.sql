/*
  Warnings:

  - You are about to drop the column `subjectId` on the `EvaluationTopic` table. All the data in the column will be lost.
  - You are about to drop the column `subTopicId` on the `Grade` table. All the data in the column will be lost.
  - You are about to drop the `EvaluationSubTopic` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `evaluationTopicCategoryId` to the `EvaluationTopic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `evaluationSubTopicId` to the `Grade` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `EvaluationTopic` DROP FOREIGN KEY `EvaluationTopic_subjectId_fkey`;

-- DropForeignKey
ALTER TABLE `Grade` DROP FOREIGN KEY `Grade_subTopicId_fkey`;

-- DropForeignKey
ALTER TABLE `SubTopic` DROP FOREIGN KEY `SubTopic_evaluationTopicId_fkey`;

-- AlterTable
ALTER TABLE `EvaluationTopic` DROP COLUMN `subjectId`,
    ADD COLUMN `evaluationTopicCategoryId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Grade` DROP COLUMN `subTopicId`,
    ADD COLUMN `evaluationSubTopicId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `SubTopic`;

-- CreateTable
CREATE TABLE `EvaluationTopicCategory` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `subjectId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EvaluationSubTopic` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `evaluationTopicId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `EvaluationTopicCategory` ADD CONSTRAINT `EvaluationTopicCategory_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `Subject`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EvaluationTopic` ADD CONSTRAINT `EvaluationTopic_evaluationTopicCategoryId_fkey` FOREIGN KEY (`evaluationTopicCategoryId`) REFERENCES `EvaluationTopicCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EvaluationSubTopic` ADD CONSTRAINT `EvaluationSubTopic_evaluationTopicId_fkey` FOREIGN KEY (`evaluationTopicId`) REFERENCES `EvaluationTopic`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Grade` ADD CONSTRAINT `Grade_evaluationSubTopicId_fkey` FOREIGN KEY (`evaluationSubTopicId`) REFERENCES `EvaluationSubTopic`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
