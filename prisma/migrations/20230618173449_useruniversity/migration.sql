/*
  Warnings:

  - You are about to alter the column `token` on the `session` table. The data in that column could be lost. The data in that column will be cast from `VarChar(500)` to `VarChar(255)`.
  - A unique constraint covering the columns `[user_id]` on the table `session` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `user_university` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "session" DROP CONSTRAINT "session_user_id_fkey";

-- AlterTable
ALTER TABLE "expertise" ALTER COLUMN "name" SET DATA TYPE VARCHAR(80);

-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "description" TEXT,
ADD COLUMN     "end_date" DATE,
ADD COLUMN     "expertise_id" INTEGER,
ADD COLUMN     "name" VARCHAR(255),
ADD COLUMN     "posted_time" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "start_date" DATE;

-- AlterTable
ALTER TABLE "session" ALTER COLUMN "token" DROP NOT NULL,
ALTER COLUMN "token" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "created_at" DROP NOT NULL,
ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "university" ALTER COLUMN "name" SET DATA TYPE VARCHAR(80);

-- CreateIndex
CREATE UNIQUE INDEX "session_user_id_key" ON "session"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "unique_user_id" ON "user_university"("user_id");

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_expertise_id_fkey" FOREIGN KEY ("expertise_id") REFERENCES "expertise"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
