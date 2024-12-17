import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { CentroAcopio } from "@prisma/client";

// Obtener todos los centros de acopio
export async function GET() {
  try {
    const centros = await prisma.centroAcopio.findMany({
      orderBy: { id: "asc" },
      include: {
        recolecciones: true,
      },
    });
    return NextResponse.json(centros);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error fetching centros de acopio" },
      { status: 500 }
    );
  }
}

// Crear un nuevo centro de acopio
export async function POST(req: NextRequest) {
  try {
    const { nombre, latitud, longitud }: CentroAcopio = await req.json();
    const centro: CentroAcopio = await prisma.centroAcopio.create({
      data: {
        nombre,
        latitud,
        longitud,
      },
    });
    return NextResponse.json(centro, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error creating centro de acopio" },
      { status: 500 }
    );
  }
}
