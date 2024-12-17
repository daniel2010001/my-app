import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Vehiculo } from "@prisma/client";

// Obtener todos los vehículos
export async function GET() {
  try {
    const vehiculos = await prisma.vehiculo.findMany({
      orderBy: { id: "asc" },
    });
    return NextResponse.json(vehiculos);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error fetching vehiculos" },
      { status: 500 }
    );
  }
}

// Crear un nuevo vehículo
export async function POST(req: NextRequest) {
  try {
    const { tipo, capacidad_kg, volumen_max, disponibilidad }: Vehiculo =
      await req.json();
    const vehiculo: Vehiculo = await prisma.vehiculo.create({
      data: {
        tipo,
        capacidad_kg,
        volumen_max,
        disponibilidad,
      },
    });
    return NextResponse.json(vehiculo, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error creating vehiculo" },
      { status: 500 }
    );
  }
}
