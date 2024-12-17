import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Vehiculo } from "@prisma/client";

type Context = { params: Promise<{ id: string }> };

// Obtener un vehículo específico
export async function GET(req: NextRequest, { params }: Context) {
  const { id } = await params;

  try {
    const vehiculo = await prisma.vehiculo.findUnique({
      where: { id: Number(id) },
    });
    if (!vehiculo) {
      return NextResponse.json(
        { error: "Vehiculo not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(vehiculo);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error fetching vehiculo" },
      { status: 500 }
    );
  }
}

// Actualizar un vehículo específico
export async function PUT(req: NextRequest, { params }: Context) {
  const { id } = await params;
  try {
    const { tipo, capacidad_kg, volumen_max, disponibilidad }: Vehiculo =
      await req.json();
    const vehiculo = await prisma.vehiculo.update({
      where: { id: Number(id) },
      data: {
        tipo,
        capacidad_kg,
        volumen_max,
        disponibilidad,
      },
    });
    return NextResponse.json(vehiculo);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error updating vehiculo" },
      { status: 500 }
    );
  }
}

// Eliminar un vehículo específico
export async function DELETE(req: NextRequest, { params }: Context) {
  const { id } = await params;
  try {
    await prisma.vehiculo.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json(null, { status: 204 }); // No Content
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error deleting vehiculo" },
      { status: 500 }
    );
  }
}
