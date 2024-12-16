import { NextRequest, NextResponse } from "next/server";

import { PointsAdapter } from "@/adapters";

export async function GET(req: NextRequest) {
  const db = JSON.parse(req.headers.get("DataBase") || '{"points":[]}');
  return NextResponse.json(
    { success: true, result: db.points.map(PointsAdapter.toResponse) },
    { status: 200 }
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
  const db = JSON.parse(req.headers.get("DataBase") || '{"points":[]}');
  return NextResponse.json(
    { success: true, result: { ...PointsAdapter.toResponse(point) } },
    { status: 201, headers: { DataBase: JSON.stringify({ ...db, points: [...db.points, point] }) } }
  );
}
