import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Parcela } from "@prisma/client";

type Context = { params: Promise<{ id: string }> };

// Obtener una parcela específica
export async function GET(req: NextRequest, { params }: Context) {
  const { id } = await params;

  try {
    const parcela = await prisma.parcela.findUnique({
      where: { id: Number(id) },
      include: {
        incidencias: true,
        recolecciones: true,
      },
    });
    if (!parcela) {
      return NextResponse.json({ error: "Parcela not found" }, { status: 404 });
    }
    return NextResponse.json(parcela);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error fetching parcela" },
      { status: 500 }
    );
  }
}

// Actualizar una parcela específica
export async function PUT(req: NextRequest, { params }: Context) {
  const { id } = await params;
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
    }: Parcela = await req.json();
    const parcela = await prisma.parcela.update({
      where: { id: Number(id) },
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
      },
    });
    return NextResponse.json(parcela);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error updating parcela" },
      { status: 500 }
    );
  }
}

// Eliminar una parcela específica
export async function DELETE(req: NextRequest, { params }: Context) {
  const { id } = await params;
  try {
    await prisma.parcela.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json(null, { status: 204 }); // No Content
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error deleting parcela" },
      { status: 500 }
    );
  }
}
