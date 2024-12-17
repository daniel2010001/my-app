import { NextRequest, NextResponse } from "next/server";

import { PointsAdapter } from "@/adapters";

export async function GET() {
  return NextResponse.json({ success: false, error: { message: "Not found" } }, { status: 404 });
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  if (!PointsAdapter.isPointRequest(data))
    return NextResponse.json(
      { success: false, error: { message: "Datos inválidos" } },
      { status: 400 }
    );
  const point = PointsAdapter.toPoint(data);
  return NextResponse.json(
    { success: true, result: { ...PointsAdapter.toResponse(point) } },
    { status: 201 }
  );
}

export async function PUT() {
  return NextResponse.json({ success: false, error: { message: "Not found" } }, { status: 404 });
}

export async function DELETE() {
  return NextResponse.json({ success: false, error: { message: "Not found" } }, { status: 404 });
}
