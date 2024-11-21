/*
  Warnings:

  - You are about to drop the column `priority` on the `Quest` table. All the data in the column will be lost.
  - You are about to drop the column `frequency` on the `RecurringQuest` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `playerId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Player` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_playerId_fkey";

-- DropIndex
DROP INDEX "User_playerId_key";

-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "bio" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "profilePic" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "rankPoints" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "streak" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "userId" INTEGER NOT NULL,
ALTER COLUMN "level" SET DEFAULT 0,
ALTER COLUMN "experience" SET DEFAULT 0,
ALTER COLUMN "gold" SET DEFAULT 0,
ALTER COLUMN "adventurerRank" SET DEFAULT 'COPPER';

-- AlterTable
ALTER TABLE "Quest" DROP COLUMN "priority";

-- AlterTable
ALTER TABLE "RecurringQuest" DROP COLUMN "frequency";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email",
DROP COLUMN "playerId",
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Player_userId_key" ON "Player"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
