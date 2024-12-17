import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ParcelsAdapter } from "@/adapters";

// Obtener todas las parcelas
export async function GET() {
  try {
    const parcelas = await prisma.parcela.findMany({
      orderBy: { id: "asc" },
    });
    return NextResponse.json({ success: true, result: parcelas }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: { message: "Error fetching parcelas" } },
      { status: 500 }
    );
  }
}

// Crear una nueva parcela
export async function POST(req: NextRequest) {
  try {
    // ejemplo de cómo parsear datos de la petición
    const data = await req.json();
    if (ParcelsAdapter.isParcelRequest(data)) {
      const parcela = await prisma.parcela.create({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: data as any,
      });
      return NextResponse.json({ success: true, result: parcela }, { status: 201 });
    }
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
    return NextResponse.json({ success: true, result: parcela }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: { message: "Error creating parcela" } },
      { status: 500 }
    );
  }
}
