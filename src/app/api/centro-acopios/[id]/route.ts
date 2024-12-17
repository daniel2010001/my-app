import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { CentroAcopioUpdateInput } from "@/types/types";
import { CentroAcopio } from "@prisma/client";

type Context = { params: Promise<{ id: string }> };

// Obtener un centro de acopio específico
export async function GET(req: NextRequest, { params }: Context) {
  const { id } = await params;

  try {
    const centro = await prisma.centroAcopio.findUnique({
      where: { id: Number(id) },
    });
    if (!centro) {
      return NextResponse.json(
        { error: "Centro de acopio not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(centro);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error fetching centro de acopio" },
      { status: 500 }
    );
  }
}

// Actualizar un centro de acopio específico
export async function PUT(req: NextRequest, { params }: Context) {
  const { id } = await params;
  try {
    const { nombre, latitud, longitud }: CentroAcopioUpdateInput =
      await req.json();
    const centro: CentroAcopio = await prisma.centroAcopio.update({
      where: { id: Number(id) },
      data: {
        nombre,
        latitud,
        longitud,
      },
    });
    return NextResponse.json(centro);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error updating centro de acopio" },
      { status: 500 }
    );
  }
}

// Eliminar un centro de acopio específico
export async function DELETE(req: NextRequest, { params }: Context) {
  const { id } = await params;
  try {
    await prisma.centroAcopio.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json(null, { status: 204 }); // No Content
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error deleting centro de acopio" },
      { status: 500 }
    );
  }
}
