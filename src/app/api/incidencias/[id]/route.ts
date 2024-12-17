import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Incidencia } from "@prisma/client";

type Context = { params: Promise<{ id: string }> };

// Obtener una incidencia específica
export async function GET(req: NextRequest, { params }: Context) {
  const { id } = await params;

  try {
    const incidencia = await prisma.incidencia.findUnique({
      where: { id: Number(id) },
      include: {
        parcela: true,
      },
    });
    if (!incidencia) {
      return NextResponse.json(
        { error: "Incidencia not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(incidencia);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error fetching incidencia" },
      { status: 500 }
    );
  }
}

// Actualizar una incidencia específica
export async function PUT(req: NextRequest, { params }: Context) {
  const { id } = await params;
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
    const incidencia: Incidencia = await prisma.incidencia.update({
      where: { id: Number(id) },
      data: {
        id_parcela,
        tipo_incidencia,
        descripcion,
        impacto_kg,
        nueva_fecha,
        estado_actual,
        observaciones,
      },
    });
    return NextResponse.json(incidencia);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error updating incidencia" },
      { status: 500 }
    );
  }
}

// Eliminar una incidencia específica
export async function DELETE(req: NextRequest, { params }: Context) {
  const { id } = await params;
  try {
    await prisma.incidencia.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json(null, { status: 204 }); // No Content
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error deleting incidencia" },
      { status: 500 }
    );
  }
}
