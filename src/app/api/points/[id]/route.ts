import { NextRequest, NextResponse } from "next/server";

import { PointsAdapter } from "@/adapters";
import { Point } from "@/models";

type Context = { params: Promise<{ id: string }> };

export async function GET(req: NextRequest, { params }: Context) {
  const { id } = await params;
  const db = JSON.parse(req.headers.get("DataBase") || '{"points":[]}') as { points: Point[] };
  if (!id)
    return NextResponse.json(
      { success: true, result: db.points.map(PointsAdapter.toResponse) },
      { status: 200 }
    );
  const point = db.points.find((p) => p.id === id);
  if (!point)
    return NextResponse.json(
      { success: false, error: { id: ["Punto no encontrado"] } },
      { status: 405 }
    );
  return NextResponse.json(
    { success: true, result: PointsAdapter.toResponse(point) },
    { status: 200, headers: { DataBase: JSON.stringify(db) } }
  );
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  if (!PointsAdapter.isPointRequest(data))
    return NextResponse.json(
      { success: false, error: { message: "Datos inválidos" } },
      { status: 400 }
    );
  const point = PointsAdapter.toPoint(data);
  const db = JSON.parse(req.headers.get("DataBase") || '{"points":[]}') as { points: Point[] };
  return NextResponse.json(
    { success: true, result: { ...PointsAdapter.toResponse(point) } },
    { status: 201, headers: { DataBase: JSON.stringify({ ...db, points: [...db.points, point] }) } }
  );
}

export async function PUT(req: NextRequest, { params }: Context) {
  const { id } = await params;
  if (!id)
    return NextResponse.json(
      { success: false, error: { id: ["No se ha proporcionado el id del punto"] } },
      { status: 400 }
    );
  const data = await req.json();
  if (!PointsAdapter.isPointRequest(data))
    return NextResponse.json(
      { success: false, error: { point: ["Datos inválidos"] } },
      { status: 409 }
    );
  const db = JSON.parse(req.headers.get("DataBase") || '{"points":[]}') as { points: Point[] };
  const point = db.points.find((p) => p.id == id);
  if (!point)
    return NextResponse.json(
      { success: false, error: { id: ["Punto no encontrado"] } },
      { status: 405 }
    );
  return NextResponse.json(
    { success: true, result: { ...PointsAdapter.toResponse(point) } },
    { status: 201, headers: { DataBase: JSON.stringify({ ...db, points: [...db.points, point] }) } }
  );
}

export async function DELETE(req: NextRequest, { params }: Context) {
  const { id } = await params;
  if (!id)
    return NextResponse.json(
      { success: false, error: { id: ["No se ha proporcionado el id del punto"] } },
      { status: 400 }
    );
  const db = JSON.parse(req.headers.get("DataBase") || '{"points":[]}') as { points: Point[] };
  if (id === "all") {
    return NextResponse.json(
      { success: true, result: { ...db.points.map((p) => PointsAdapter.toResponse(p)) } },
      { status: 200, headers: { DataBase: JSON.stringify({ ...db, points: [] }) } }
    );
  }
  const point = db.points.find((p) => p.id == id);
  if (!point)
    return NextResponse.json(
      { success: false, error: { id: ["Punto no encontrado"] } },
      { status: 405 }
    );
  return NextResponse.json(
    { success: true, result: { ...PointsAdapter.toResponse(point) } },
    {
      status: 200,
      headers: {
        DataBase: JSON.stringify({ ...db, points: db.points.filter((p) => p.id !== id) }),
      },
    }
  );
}


