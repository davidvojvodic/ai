// Import necessary modules and functions
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";

// Import functions to check and increase API limits and subscription status
import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

// Create a new instance of Replicate with the provided API token
const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN!,
})

// Define the default context message for the video generation prompt
const defaultContextMessage = {
    role: 'system',
    content: "You are an assistant fluent in Slovenian. Answer the following as if you were speaking to a Slovenian user:"
};

// Define the POST function to handle incoming HTTP POST requests
export async function POST(req: Request) {
    try {
        // Authenticate the user using the Clerk authentication library
        const { userId } = auth();

        // Parse the request body as JSON
        const body = await req.json();
        let { prompt } = body;

        // Check if the user is not authenticated (Unauthorized)
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Check if 'prompt' is missing in the request body (Bad Request)
        if (!prompt) {
            return new NextResponse("Prompt is required", { status: 400 });
        }

        // Check if the user has exceeded the free trial API limit or is not a pro subscriber (Forbidden)
        const freeTrial = await checkApiLimit();
        const isPro = await checkSubscription();
        if (!freeTrial && !isPro) {
            return new NextResponse("Free trial limit reached", { status: 403 });
        }

        // Run the Replicate job to generate video based on the provided prompt
        const response = await replicate.run(
            "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
            {
                input: {
                    prompt: prompt
                }
            }
        );

        // If the user is not a pro subscriber, increase the API limit
        if (!isPro) {
            await increaseApiLimit();
        }

        // Return the generated video response as JSON in the Next.js response
        return NextResponse.json(response);

    } catch (error) {
        // If any error occurs during the process, log it and return an Internal Server Error
        console.log("[VIDEO_ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
