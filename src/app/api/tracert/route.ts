import { NextRequest, NextResponse } from "next/server";

import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const query = new URLSearchParams({ key: process.env.NEXT_PUBLIC_GRAPHHOPPER_KEY ?? "-" });
    const response = await axios.post(`https://graphhopper.com/api/1/route?${query}`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return NextResponse.json({ success: true, result: response.data }, { status: 201 });
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
