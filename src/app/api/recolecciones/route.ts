import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Obtener todas las recolecciones
export async function GET() {
  try {
    const recolecciones = await prisma.recoleccion.findMany({
      orderBy: { id: "asc" },
    });
    return NextResponse.json(recolecciones);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error fetching recolecciones" }, { status: 500 });
  }
}

// Crear una nueva recolección
export async function POST(req: NextRequest) {
  try {
    const { id_parcela, fecha, estado, id_vehiculo, id_centro } = await req.json();
    const recoleccion = await prisma.recoleccion.create({
      data: {
        id_parcela,
        fecha,
        estado,
        id_vehiculo,
        id_centro,
      },
    });
    return NextResponse.json(recoleccion, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error creating recoleccion" }, { status: 500 });
  }
}