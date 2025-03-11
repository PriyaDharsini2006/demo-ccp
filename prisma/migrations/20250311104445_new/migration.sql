-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('INVESTOR', 'ENTREPRENEUR', 'INNOVATOR');

-- CreateEnum
CREATE TYPE "SoftwareType" AS ENUM ('APPLICATION', 'SYSTEM', 'PLATFORM', 'OTHER');

-- CreateEnum
CREATE TYPE "Domain" AS ENUM ('HEALTHCARE', 'FINTECH', 'EDUCATION', 'ECOMMERCE', 'OTHER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userType" "UserType" NOT NULL,
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GSTInfo" (
    "id" TEXT NOT NULL,
    "gstin" TEXT NOT NULL,

    CONSTRAINT "GSTInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "gstInfoId" TEXT NOT NULL,
    "retPeriod" TIMESTAMP(3) NOT NULL,
    "checksum" TEXT,
    "summaryType" TEXT,
    "totalRecords" INTEGER,
    "totalTax" DOUBLE PRECISION,
    "actualTax" DOUBLE PRECISION,
    "totalValue" DOUBLE PRECISION,
    "profit" DOUBLE PRECISION,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Startup" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mantra" TEXT NOT NULL,
    "description" TEXT,
    "type" "SoftwareType",
    "domain" "Domain",
    "vision" TEXT,
    "mission" TEXT,
    "imageURL" TEXT,
    "userId" TEXT NOT NULL,
    "gstin" TEXT,

    CONSTRAINT "Startup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Innovation" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "detailedDesc" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "innovatorId" TEXT NOT NULL,

    CONSTRAINT "Innovation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Overview" (
    "id" TEXT NOT NULL,
    "noOfEmployees" INTEGER NOT NULL,
    "currentProjects" INTEGER NOT NULL,
    "prevProjects" INTEGER NOT NULL,
    "fundsRaised" INTEGER NOT NULL,
    "startupId" TEXT NOT NULL,

    CONSTRAINT "Overview_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "GSTInfo_gstin_key" ON "GSTInfo"("gstin");

-- CreateIndex
CREATE UNIQUE INDEX "Startup_gstin_key" ON "Startup"("gstin");

-- CreateIndex
CREATE UNIQUE INDEX "Session_userId_key" ON "Session"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "Overview_startupId_key" ON "Overview"("startupId");

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_gstInfoId_fkey" FOREIGN KEY ("gstInfoId") REFERENCES "GSTInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Startup" ADD CONSTRAINT "Startup_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Startup" ADD CONSTRAINT "Startup_gstin_fkey" FOREIGN KEY ("gstin") REFERENCES "GSTInfo"("gstin") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Innovation" ADD CONSTRAINT "Innovation_innovatorId_fkey" FOREIGN KEY ("innovatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Overview" ADD CONSTRAINT "Overview_startupId_fkey" FOREIGN KEY ("startupId") REFERENCES "Startup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
