/*
  Warnings:

  - You are about to drop the column `idAuthor` on the `Books` table. All the data in the column will be lost.
  - You are about to drop the column `idPublisher` on the `Books` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Books" DROP CONSTRAINT "Books_idAuthor_fkey";

-- DropForeignKey
ALTER TABLE "Books" DROP CONSTRAINT "Books_idPublisher_fkey";

-- AlterTable
ALTER TABLE "Books" DROP COLUMN "idAuthor",
DROP COLUMN "idPublisher";
