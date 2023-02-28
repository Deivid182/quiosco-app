/*
  Warnings:

  - You are about to drop the column `Estado` on the `Orden` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Orden` DROP COLUMN `Estado`,
    ADD COLUMN `estado` BOOLEAN NOT NULL DEFAULT false;
