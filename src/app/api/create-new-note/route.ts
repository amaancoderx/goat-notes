import { prisma } from "@/db/prisma";
import { NextRequest, NextResponse } from "next/server";
import { initializeDatabase } from "@/lib/db-init";

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId") || "";

  try {
    // Try to initialize database if tables don't exist
    await initializeDatabase();

    const { id } = await prisma.note.create({
      data: {
        authorId: userId,
        text: "",
      },
    });

    return NextResponse.json({
      noteId: id,
    });
  } catch (error) {
    console.error("Error creating new note:", error);
    return NextResponse.json(
      { error: "Failed to create new note", noteId: null },
      { status: 500 }
    );
  }
}
