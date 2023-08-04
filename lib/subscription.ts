// Importing the "auth" module from "@clerk/nextjs"
import { auth } from "@clerk/nextjs";
// Importing the "prismadb" instance
import prismadb from "./prismadb";

// Constant representing one day in milliseconds
const DAY_IN_MS = 86_400_000;

// Function to check if the user has an active subscription
export const checkSubscription = async () => {
    // Get the current user's information, including their user ID
    const { userId } = auth();

    // If the user ID is not available (not authenticated), return false
    if (!userId) {
        return false;
    }

    // Query the database to get the user's subscription details
    const userSubscription = await prismadb.userSubscription.findUnique({
        where: {
            userId: userId
        },
        // Select specific fields to optimize the query and reduce data transfer
        select: {
            stripeSubscriptionId: true,
            stripeCurrentPeriodEnd: true,
            stripeCustomerId: true,
            stripePrideId: true,
        }
    });

    // If the user does not have a subscription, return false
    if (!userSubscription) {
        return false;
    }

    // Calculate if the subscription is still valid based on the "stripeCurrentPeriodEnd" timestamp
    const isValid = userSubscription.stripePrideId &&
        userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();

    // Return the result (true if valid, false otherwise)
    return !!isValid;
}
