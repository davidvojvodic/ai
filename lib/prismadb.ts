// Importing PrismaClient from "@prisma/client"
import { PrismaClient } from "@prisma/client";

// Declare global prisma variable
declare global {
    var prisma: PrismaClient | undefined;
}

// If prisma is already defined globally, use it; otherwise, create a new PrismaClient instance
const prismadb = globalThis.prisma || new PrismaClient();

// If the NODE_ENV is not "production", set the global prisma variable to prismadb
// This ensures that the same instance of PrismaClient is used across multiple requests during development
if (process.env.NODE_ENV !== "production") globalThis.prisma = prismadb;

// Export the prismadb instance
export default prismadb;
