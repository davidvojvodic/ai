// Import necessary modules and functions
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";

// Define the URL to redirect to settings after Stripe actions
const settingsUrl = absoluteUrl("/settings");

// Define the GET function to handle incoming HTTP GET requests
export async function GET() {
    try {
        // Authenticate the user using the Clerk authentication library
        const { userId } = auth();

        // Get the current user using the Clerk currentUser() function
        const user = await currentUser();

        // Check if the user is not authenticated or user information is missing (Unauthorized)
        if (!userId || !user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Query the database to check if the user has an existing subscription with a Stripe customer ID
        const userSubscription = await prismadb.userSubscription.findUnique({
            where: {
                userId
            }
        });

        // If the user has an existing subscription with a Stripe customer ID, create a billing portal session for managing subscriptions
        if (userSubscription && userSubscription.stripeCustomerId) {
            const stripeSession = await stripe.billingPortal.sessions.create({
                customer: userSubscription.stripeCustomerId,
                return_url: settingsUrl
            });

            // Return the Stripe billing portal session URL as JSON in the Next.js response
            return new NextResponse(JSON.stringify({ url: stripeSession.url }));
        }

        // If the user does not have an existing subscription, create a new Stripe checkout session to subscribe the user
        const stripeSession = await stripe.checkout.sessions.create({
            success_url: settingsUrl,
            cancel_url: settingsUrl,
            payment_method_types: ["card"],
            mode: "subscription",
            billing_address_collection: "auto",
            customer_email: user.emailAddresses[0].emailAddress,
            line_items: [
                {
                    price_data: {
                        currency: "EUR",
                        product_data: {
                            name: "AI Platform Pro",
                            description: "Neomejeno ...." // Add appropriate product description
                        },
                        unit_amount: 500, // Price amount in cents (EUR)
                        recurring: {
                            interval: "month" // Billing interval (monthly subscription)
                        }
                    },
                    quantity: 1, // Quantity of products to be subscribed (in this case, 1)
                }
            ],
            metadata: {
                userId, // Attach the user ID as metadata for the Stripe session
            }
        });

        // Return the new Stripe checkout session URL as JSON in the Next.js response
        return new NextResponse(JSON.stringify({ url: stripeSession.url }));

    } catch (error) {
        // If any error occurs during the process, log it and return an Internal Server Error
        console.log("[STRIPE_ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
