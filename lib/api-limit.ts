// Importing required libraries and modules
import { auth } from "@clerk/nextjs";
import prismadb from "./prismadb";
import { MAX_FREE_COUNTS } from "@/constants";

// Function to increase the API limit count for the current user
export async function increaseApiLimit() {
  // Get the authenticated user's ID
  const { userId } = auth();

  // If the user is not authenticated, return
  if (!userId) {
    return;
  }

  // Try to find the user's API limit in the database
  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: {
      userId: userId,
    },
  });

  // If the user's API limit exists, update the count by 1
  if (userApiLimit) {
    await prismadb.userApiLimit.update({
      where: { userId: userId },
      data: { count: userApiLimit.count + 1 },
    });
  } else {
    // If the user's API limit does not exist, create a new record with count 1
    await prismadb.userApiLimit.create({
      data: {
        userId: userId,
        count: 1,
      },
    });
  }
}

// Function to check if the user has reached the maximum API limit
export const checkApiLimit = async () => {
  // Get the authenticated user's ID
  const { userId } = auth();

  // If the user is not authenticated, return false
  if (!userId) {
    return false;
  }

  // Try to find the user's API limit in the database
  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: {
      userId: userId,
    },
  });

  // If the user's API limit does not exist or is below the maximum limit, return true
  if (!userApiLimit || userApiLimit.count < MAX_FREE_COUNTS) {
    return true;
  } else {
    // Otherwise, return false
    return false;
  }
};

// Function to get the current API limit count for the authenticated user
export const getApiLimit = async () => {
  // Get the authenticated user's ID
  const { userId } = auth();

  // If the user is not authenticated, return 0
  if (!userId) {
    return 0;
  }

  // Try to find the user's API limit in the database
  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: {
      userId,
    },
  });

  // If the user's API limit exists, return the count, otherwise, return 0
  if (userApiLimit) {
    return userApiLimit.count;
  } else {
    return 0;
  }
};
