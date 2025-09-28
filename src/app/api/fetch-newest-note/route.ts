import { prisma } from "@/db/prisma";
import { NextRequest, NextResponse } from "next/server";
import { initializeDatabase } from "@/lib/db-init";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId") || "";

  try {
    // Try to initialize database if tables don't exist
    await initializeDatabase();

    const newestNoteId = await prisma.note.findFirst({
      where: {
        authorId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
      },
    });

    return NextResponse.json({
      newestNoteId: newestNoteId?.id,
    });
  } catch (error) {
    console.error("Error fetching newest note:", error);
    return NextResponse.json(
      { error: "Failed to fetch newest note", newestNoteId: null },
      { status: 500 }
    );
  }
}
