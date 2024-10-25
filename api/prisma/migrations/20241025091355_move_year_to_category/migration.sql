/*
  Warnings:

  - You are about to drop the column `year` on the `EvaluationTopic` table. All the data in the column will be lost.
  - Added the required column `year` to the `EvaluationTopicCategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `EvaluationTopic` DROP COLUMN `year`;

-- AlterTable
ALTER TABLE `EvaluationTopicCategory` ADD COLUMN `year` VARCHAR(191) NOT NULL;
