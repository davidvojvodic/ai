// Import necessary modules and functions
import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

// Import the Prismadb and Stripe instances
import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";

// Define the POST function to handle incoming Stripe webhook events
export async function POST(req: Request) {
    const body = await req.text();
    const signature = headers().get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
        // Construct the Stripe event from the request body and signature using the Stripe webhook secret
        event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
    } catch (error: any) {
        // If there's an error in the webhook signature, return a Bad Request response
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
    }

    // Get the Checkout Session object from the Stripe event data
    const session = event.data.object as Stripe.Checkout.Session;

    // If the event type is "checkout.session.completed", handle the successful checkout event
    if (event.type === "checkout.session.completed") {
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string);

        // Check if the user ID is present in the Checkout Session metadata
        if (!session?.metadata?.userId) {
            return new NextResponse("User id is required", { status: 400 });
        }

        // Create a new entry in the Prismadb userSubscription table to store the subscription details
        await prismadb.userSubscription.create({
            data: {
                userId: session?.metadata?.userId,
                stripeSubscriptionId: subscription.id,
                stripeCustomerId: subscription.customer as string,
                stripePriceId: subscription.items.data[0].price.id,
                stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
            },
        });
    }

    // If the event type is "invoice.payment_succeeded", handle the successful invoice payment event
    if (event.type === "invoice.payment_succeeded") {
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string);

        // Update the corresponding userSubscription entry in the Prismadb table with the new subscription details
        await prismadb.userSubscription.update({
            where: {
                stripeSubscriptionId: subscription.id,
            },
            data: {
                stripePriceId: subscription.items.data[0].price.id,
                stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
            },
        });
    }

    // Return a successful response with status code 200 to acknowledge the webhook event
    return new NextResponse(null, { status: 200 });
}
