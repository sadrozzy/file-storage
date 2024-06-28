/*
  Warnings:

  - You are about to drop the column `mimetype` on the `files` table. All the data in the column will be lost.
  - You are about to drop the column `originalname` on the `files` table. All the data in the column will be lost.
  - Added the required column `mimeType` to the `files` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originalName` to the `files` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "files" DROP COLUMN "mimetype",
DROP COLUMN "originalname",
ADD COLUMN     "mimeType" TEXT NOT NULL,
ADD COLUMN     "originalName" TEXT NOT NULL;
