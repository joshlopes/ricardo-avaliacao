/*
  Warnings:

  - You are about to drop the `ScholarYear` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `EvaluationTopic` DROP FOREIGN KEY `EvaluationTopic_scholarYearId_fkey`;

-- DropForeignKey
ALTER TABLE `ScholarYear` DROP FOREIGN KEY `ScholarYear_subjectId_fkey`;

-- DropTable
DROP TABLE `ScholarYear`;
