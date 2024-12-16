import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const configure = { locate: "es", optimize: true, instructions: true };
    const query = new URLSearchParams({ key: process.env.NEXT_PUBLIC_GRAPHHOPPER_KEY ?? "-" });
    const response = await axios.post(
      `https://graphhopper.com/api/1/route?${query}`,
      { ...data, ...configure, points: [...data.points, ...data.coordinates] },
      { headers: { "Content-Type": "application/json" } }
    );
    if (response.data.message) throw new Error(response.data.message);
    return NextResponse.json({ success: true, result: response.data.paths }, { status: 201 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(
        { success: false, error: { message: error.message } },
        { status: 400 }
      );
    return NextResponse.json(
      { success: false, error: { message: "Error inesperado del servidor" } },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ success: false, error: { message: "Not found" } }, { status: 404 });
}

export async function PUT() {
  return NextResponse.json({ success: false, error: { message: "Not found" } }, { status: 404 });
}

export async function DELETE() {
  return NextResponse.json({ success: false, error: { message: "Not found" } }, { status: 404 });
}
