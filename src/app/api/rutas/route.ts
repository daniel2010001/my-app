import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Obtener todas las rutas
export async function GET() {
  try {
    const rutas = await prisma.ruta.findMany({
      orderBy: { id: "asc" },
    });
    return NextResponse.json(rutas);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error fetching rutas" }, { status: 500 });
  }
}

// Crear una nueva ruta
export async function POST(req: NextRequest) {
  try {
    const { id_origen, id_destino, texto, distancia_km, tiempo_estimado, costo } = await req.json();
    const ruta = await prisma.ruta.create({
      data: {
        id_origen,
        id_destino,
        texto,
        distancia_km,
        tiempo_estimado,
        costo,
      },
    });
    return NextResponse.json(ruta, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error creating ruta" }, { status: 500 });
  }
}
