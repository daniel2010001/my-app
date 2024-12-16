import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json("Ivan gay");
}

export async function POST(req: NextRequest) {
  const { name } = await req.json();
  return NextResponse.json(`Hello ${name} gay!`);
}
