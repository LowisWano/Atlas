/*
  Warnings:

  - The values [PENDING,IN_PROGRESS,FAILED] on the enum `StatusType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StatusType_new" AS ENUM ('ACTIVE', 'COMPLETED');
ALTER TABLE "Quest" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Quest" ALTER COLUMN "status" TYPE "StatusType_new" USING ("status"::text::"StatusType_new");
ALTER TYPE "StatusType" RENAME TO "StatusType_old";
ALTER TYPE "StatusType_new" RENAME TO "StatusType";
DROP TYPE "StatusType_old";
ALTER TABLE "Quest" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';
COMMIT;

-- AlterTable
ALTER TABLE "Quest" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';
