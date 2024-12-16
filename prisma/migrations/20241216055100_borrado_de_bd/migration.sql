/*
  Warnings:

  - Added the required column `texto` to the `Ruta` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ruta" ADD COLUMN     "texto" TEXT NOT NULL;
