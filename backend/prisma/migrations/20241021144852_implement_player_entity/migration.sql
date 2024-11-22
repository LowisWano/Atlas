/*
  Warnings:

  - A unique constraint covering the columns `[playerId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `playerId` to the `User` table without a default value. This is not possible if the table is not empty.

*/

-- CreateEnum
CREATE TYPE "Rank" AS ENUM ('COPPER', 'IRON', 'SILVER', 'GOLD', 'PLATINUM', 'MYTHRIL', 'ADAMANTITE');

-- CreateTable
CREATE TABLE "Player" (
    "id" SERIAL NOT NULL,
    "level" INTEGER NOT NULL,
    "experience" INTEGER NOT NULL,
    "gold" INTEGER NOT NULL,
    "adventurerRank" "Rank" NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

DELETE FROM "User";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "playerId" INTEGER;

-- Populate playerId with valid values
UPDATE "User" SET "playerId" = (SELECT "id" FROM "Player" LIMIT 1);

-- Add NOT NULL constraint
ALTER TABLE "User" ALTER COLUMN "playerId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_playerId_key" ON "User"("playerId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
