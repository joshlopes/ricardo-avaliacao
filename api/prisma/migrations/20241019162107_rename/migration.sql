/*
  Warnings:

  - You are about to drop the column `scholarYearId` on the `EvaluationTopic` table. All the data in the column will be lost.
  - Added the required column `year` to the `EvaluationTopic` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `EvaluationTopic_scholarYearId_fkey` ON `EvaluationTopic`;

-- AlterTable
ALTER TABLE `EvaluationTopic` DROP COLUMN `scholarYearId`,
    ADD COLUMN `year` VARCHAR(191) NOT NULL;
