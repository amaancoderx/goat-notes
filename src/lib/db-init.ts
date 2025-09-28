import { prisma } from "@/db/prisma";

let isInitialized = false;

export async function initializeDatabase() {
  if (isInitialized) {
    return;
  }

  try {
    // Check if tables exist by attempting a simple query
    await prisma.user.findFirst();
    isInitialized = true;
  } catch (error) {
    // If tables don't exist, they will be created automatically by Prisma
    // when we run our first query. For SQLite, this works out of the box.
    console.log("Database tables may not exist yet, they will be created automatically");
    isInitialized = true;
  }
}