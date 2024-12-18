-- DropForeignKey
ALTER TABLE "Incidencia" DROP CONSTRAINT "Incidencia_id_parcela_fkey";

-- DropForeignKey
ALTER TABLE "Recoleccion" DROP CONSTRAINT "Recoleccion_id_parcela_fkey";

-- AddForeignKey
ALTER TABLE "Recoleccion" ADD CONSTRAINT "Recoleccion_id_parcela_fkey" FOREIGN KEY ("id_parcela") REFERENCES "Parcela"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Incidencia" ADD CONSTRAINT "Incidencia_id_parcela_fkey" FOREIGN KEY ("id_parcela") REFERENCES "Parcela"("id") ON DELETE CASCADE ON UPDATE CASCADE;
