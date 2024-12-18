/*
  Warnings:

  - Added the required column `id_centro` to the `Parcela` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Incidencia" ALTER COLUMN "fecha_incidencia" DROP NOT NULL,
ALTER COLUMN "fecha_incidencia" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Parcela" ADD COLUMN     "id_centro" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Recoleccion" ALTER COLUMN "fecha" SET DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "Parcela" ADD CONSTRAINT "Parcela_id_centro_fkey" FOREIGN KEY ("id_centro") REFERENCES "CentroAcopio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
