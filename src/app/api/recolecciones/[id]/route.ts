import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type Context = { params: Promise<{ id: string }> };

// Obtener una recolección específica
export async function GET(req: NextRequest, { params }: Context) {
  const { id } = await params;

  try {
    const recoleccion = await prisma.recoleccion.findUnique({
      where: { id: Number(id) },
    });
    if (!recoleccion) {
      return NextResponse.json(
        { error: "Recoleccion not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(recoleccion);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error fetching recoleccion" },
      { status: 500 }
    );
  }
}

// Actualizar una recolección específica
export async function PUT(req: NextRequest, { params }: Context) {
  const { id } = await params;
  try {
    const { id_parcela, fecha, estado, id_vehiculo, id_centro } =
      await req.json();
    const recoleccion = await prisma.recoleccion.update({
      where: { id: Number(id) },
      data: {
        id_parcela,
        fecha,
        estado,
        id_vehiculo,
        id_centro,
      },
    });
    return NextResponse.json(recoleccion);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error updating recoleccion" },
      { status: 500 }
    );
  }
}

// Eliminar una recolección específica
export async function DELETE(req: NextRequest, { params }: Context) {
  const { id } = await params;
  try {
    await prisma.recoleccion.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json(null, { status: 204 }); // No Content
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error deleting recoleccion" },
      { status: 500 }
    );
  }
}
