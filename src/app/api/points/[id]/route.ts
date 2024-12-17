import { NextRequest, NextResponse } from "next/server";

import { PointsAdapter } from "@/adapters";
import { Point } from "@/models";

type Context = { params: Promise<{ id: string }> };

export async function GET(_: NextRequest, { params }: Context) {
  const { id } = await params;
  if (!id)
    return NextResponse.json(
      { success: false, error: { id: ["No se ha proporcionado el id del punto"] } },
      { status: 400 }
    );
  const point: Point = { id, name: "", lat: 0, lng: 0 };
  return NextResponse.json(
    { success: true, result: PointsAdapter.toResponse(point) },
    { status: 200 }
  );
}

export async function POST(req: NextRequest, { params }: Context) {
  const { id } = await params;
  if (!id)
    return NextResponse.json(
      { success: false, error: { id: ["No se ha proporcionado el id del punto"] } },
      { status: 400 }
    );
  console.log(id);
  const data = await req.json();
  if (!PointsAdapter.isPointRequest(data))
    return NextResponse.json(
      { success: false, error: { message: "Datos inválidos" } },
      { status: 400 }
    );
  const point = PointsAdapter.toPoint(data);
  console.log(point);
  return NextResponse.json(
    { success: true, result: { ...PointsAdapter.toResponse(point) } },
    { status: 201 }
  );
}

export async function PUT(_: NextRequest, { params }: Context) {
  const { id } = await params;
  if (!id)
    return NextResponse.json(
      { success: false, error: { id: ["No se ha proporcionado el id del punto"] } },
      { status: 400 }
    );
  console.log(id);
  return NextResponse.json({ success: false, error: { message: "Not found" } }, { status: 404 });
}

export async function DELETE(_: NextRequest, { params }: Context) {
  const { id } = await params;
  if (!id)
    return NextResponse.json(
      { success: false, error: { id: ["No se ha proporcionado el id del punto"] } },
      { status: 400 }
    );
  console.log(id);
  if (id === "all") return NextResponse.json({ success: true, result: [] }, { status: 200 });
  return NextResponse.json({ success: false, error: { message: "Not found" } }, { status: 404 });
}


