import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ping data base
export async function GET() {
  try {
    await prisma.$connect();
    await prisma.$disconnect();
    return NextResponse.json(
      { success: true, result: "pong" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: { message: "Error fetching parcelas" } },
      { status: 500 }
    );
  }
}
