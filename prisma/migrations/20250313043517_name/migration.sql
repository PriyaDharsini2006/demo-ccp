/*
  Warnings:

  - You are about to drop the column `gstin` on the `Startup` table. All the data in the column will be lost.
  - You are about to drop the `GSTInfo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_gstInfoId_fkey";

-- DropForeignKey
ALTER TABLE "Startup" DROP CONSTRAINT "Startup_gstin_fkey";

-- DropIndex
DROP INDEX "Startup_gstin_key";

-- AlterTable
ALTER TABLE "Startup" DROP COLUMN "gstin";

-- DropTable
DROP TABLE "GSTInfo";

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");
