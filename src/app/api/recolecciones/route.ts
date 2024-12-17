import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Recoleccion } from "@prisma/client";

// Obtener todas las recolecciones
export async function GET() {
  try {
    const recolecciones = await prisma.recoleccion.findMany({
      orderBy: { id: "asc" },
      include: {
        parcela: true,
        vehiculo: true,
        centroAcopio: true,
      },
    });
    return NextResponse.json(recolecciones);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error fetching recolecciones" },
      { status: 500 }
    );
  }
}

// Crear una nueva recolección
export async function POST(req: NextRequest) {
  try {
    const { id_parcela, id_vehiculo, id_centro, fecha, estado }: Recoleccion =
      await req.json();
    const recoleccion: Recoleccion = await prisma.recoleccion.create({
      data: {
        id_parcela,
        id_vehiculo,
        id_centro,
        fecha,
        estado,
      },
    });
    return NextResponse.json(recoleccion, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error creating recoleccion" },
      { status: 500 }
    );
  }
}
