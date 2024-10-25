/*
  Warnings:

  - You are about to drop the column `classId` on the `Grade` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Grade` DROP FOREIGN KEY `Grade_classId_fkey`;

-- AlterTable
ALTER TABLE `Grade` DROP COLUMN `classId`;
