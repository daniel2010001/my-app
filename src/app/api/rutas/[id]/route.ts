import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Ruta } from "@prisma/client";

type Context = { params: Promise<{ id: string }> };

// Obtener una ruta específica
export async function GET(req: NextRequest, { params }: Context) {
  const { id } = await params;

  try {
    const ruta = await prisma.ruta.findUnique({
      where: { id: Number(id) },
      include: {
        origen: true,
        destino: true,
      },
    });
    if (!ruta) {
      return NextResponse.json({ error: "Ruta not found" }, { status: 404 });
    }
    return NextResponse.json(ruta);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error fetching ruta" }, { status: 500 });
  }
}

// Actualizar una ruta específica
export async function PUT(req: NextRequest, { params }: Context) {
  const { id } = await params;
  try {
    const {
      id_origen,
      id_destino,
      texto,
      distancia_km,
      tiempo_estimado,
      costo,
    }: Ruta = await req.json();
    const ruta: Ruta = await prisma.ruta.update({
      where: { id: Number(id) },
      data: {
        id_origen,
        id_destino,
        texto,
        distancia_km,
        tiempo_estimado,
        costo,
      },
    });
    return NextResponse.json(ruta);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error updating ruta" }, { status: 500 });
  }
}

// Eliminar una ruta específica
export async function DELETE(req: NextRequest, { params }: Context) {
  const { id } = await params;
  try {
    await prisma.ruta.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json(null, { status: 204 }); // No Content
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error deleting ruta" }, { status: 500 });
  }
}
