import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Obtener todas las incidencias
export async function GET() {
  try {
    const incidencias = await prisma.incidencia.findMany({
      orderBy: { id: "asc" },
      include: {
        parcela: true,
      },
    });
    return NextResponse.json(incidencias);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error fetching incidencias" },
      { status: 500 }
    );
  }
}

// Crear una nueva incidencia
export async function POST(req: NextRequest) {
  try {
    const {
      id_parcela,
      tipo_incidencia,
      descripcion,
      impacto_kg,
      nueva_fecha,
      estado_actual,
      observaciones,
    } = await req.json();
    const incidencia = await prisma.incidencia.create({
      data: {
        // TODO: Cuidado con esto xd
        fecha_incidencia: new Date(),
        id_parcela,
        tipo_incidencia,
        descripcion,
        impacto_kg,
        nueva_fecha,
        estado_actual,
        observaciones,
      },
    });
    return NextResponse.json(incidencia, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error creating incidencia" },
      { status: 500 }
    );
  }
}
