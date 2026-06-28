/*
  Warnings:

  - Added the required column `imagen` to the `evento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `evento` ADD COLUMN `imagen` VARCHAR(255) NOT NULL;
