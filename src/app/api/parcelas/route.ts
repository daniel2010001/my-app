import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Obtener todas las parcelas
export async function GET() {
  try {
    const parcelas = await prisma.parcela.findMany({
      orderBy: { id: "asc" },
    });
    return NextResponse.json(parcelas);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error fetching parcelas" },
      { status: 500 }
    );
  }
}

// Crear una nueva parcela
export async function POST(req: NextRequest) {
  try {
    const {
      nombre,
      variedad_maiz,
      latitud,
      longitud,
      cantidad_kg,
      distancia_km,
      estado_via,
      ventana_fin,
      ventana_inicio,
      incidencias,
      recolecciones,
    } = await req.json();
    const parcela = await prisma.parcela.create({
      data: {
        nombre,
        variedad_maiz,
        latitud,
        longitud,
        cantidad_kg,
        distancia_km,
        estado_via,
        ventana_fin,
        ventana_inicio,
        incidencias,
        recolecciones,
      },
    });
    return NextResponse.json(parcela, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error creating parcela" },
      { status: 500 }
    );
  }
}
