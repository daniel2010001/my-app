-- CreateEnum
CREATE TYPE "VariedadMaiz" AS ENUM ('Blanco', 'Amarillo', 'Morado');

-- CreateEnum
CREATE TYPE "EstadoVia" AS ENUM ('Muy_Buena', 'Buena', 'Regular', 'Mala');

-- CreateEnum
CREATE TYPE "Disponibilidad" AS ENUM ('Disponible', 'Mantenimiento', 'En_Ruta');

-- CreateEnum
CREATE TYPE "EstadoRecoleccion" AS ENUM ('Pendiente', 'En_Curso', 'Completada');

-- CreateTable
CREATE TABLE "Parcela" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "variedad_maiz" "VariedadMaiz" NOT NULL,
    "latitud" DECIMAL(10,8) NOT NULL,
    "longitud" DECIMAL(11,8) NOT NULL,
    "cantidad_kg" INTEGER NOT NULL,
    "distancia_km" DECIMAL(5,2) NOT NULL,
    "estado_via" "EstadoVia" NOT NULL,
    "ventana_inicio" DATE NOT NULL,
    "ventana_fin" DATE NOT NULL,

    CONSTRAINT "Parcela_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehiculo" (
    "id" SERIAL NOT NULL,
    "tipo" TEXT NOT NULL,
    "capacidad_kg" INTEGER NOT NULL,
    "volumen_max" DECIMAL(10,2) NOT NULL,
    "disponibilidad" "Disponibilidad" NOT NULL,

    CONSTRAINT "Vehiculo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CentroAcopio" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "latitud" DECIMAL(10,8) NOT NULL,
    "longitud" DECIMAL(11,8) NOT NULL,

    CONSTRAINT "CentroAcopio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ruta" (
    "id" SERIAL NOT NULL,
    "id_origen" INTEGER NOT NULL,
    "id_destino" INTEGER NOT NULL,
    "distancia_km" DECIMAL(5,2) NOT NULL,
    "tiempo_estimado" DECIMAL(5,2) NOT NULL,
    "costo" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "Ruta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recoleccion" (
    "id" SERIAL NOT NULL,
    "id_parcela" INTEGER NOT NULL,
    "id_vehiculo" INTEGER NOT NULL,
    "id_centro" INTEGER NOT NULL,
    "fecha" DATE NOT NULL,
    "estado" "EstadoRecoleccion" NOT NULL,

    CONSTRAINT "Recoleccion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Incidencia" (
    "id" SERIAL NOT NULL,
    "id_parcela" INTEGER NOT NULL,
    "fecha_incidencia" DATE NOT NULL,
    "tipo_incidencia" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "impacto_kg" INTEGER,
    "nueva_fecha" DATE,
    "estado_actual" TEXT,
    "observaciones" TEXT,

    CONSTRAINT "Incidencia_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ruta" ADD CONSTRAINT "Ruta_id_origen_fkey" FOREIGN KEY ("id_origen") REFERENCES "CentroAcopio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ruta" ADD CONSTRAINT "Ruta_id_destino_fkey" FOREIGN KEY ("id_destino") REFERENCES "CentroAcopio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recoleccion" ADD CONSTRAINT "Recoleccion_id_parcela_fkey" FOREIGN KEY ("id_parcela") REFERENCES "Parcela"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recoleccion" ADD CONSTRAINT "Recoleccion_id_vehiculo_fkey" FOREIGN KEY ("id_vehiculo") REFERENCES "Vehiculo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recoleccion" ADD CONSTRAINT "Recoleccion_id_centro_fkey" FOREIGN KEY ("id_centro") REFERENCES "CentroAcopio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Incidencia" ADD CONSTRAINT "Incidencia_id_parcela_fkey" FOREIGN KEY ("id_parcela") REFERENCES "Parcela"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
