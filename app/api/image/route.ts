// Import necessary modules and functions
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

// Import functions to check and increase API limits and subscription status
import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

// Create a new instance of the OpenAI Configuration with the API key provided in the environment variables
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

// Create a new instance of the OpenAI API using the configuration
const openai = new OpenAIApi(configuration);

// Define the default context message for the image generation prompt
const defaultContextMessage = {
    role: 'system',
    content: "Generate an image that represents the following scene: [describe the scene you want to be generated in Slovenian language]."
};

// Define the POST function to handle incoming HTTP POST requests
export async function POST(req: Request) {
    try {
        // Authenticate the user using the Clerk authentication library
        const { userId } = auth();

        // Parse the request body as JSON
        const body = await req.json();
        let { prompt, amount = 1, resolution = "512x512" } = body;

        // Check if the user is not authenticated (Unauthorized)
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Check if the OpenAI API key is not configured (Internal Server Error)
        if (!configuration.apiKey) {
            return new NextResponse("OpenAI API key not configured", { status: 500 });
        }

        // Check if 'prompt' is missing in the request body (Bad Request)
        if (!prompt) {
            return new NextResponse("Prompt is required", { status: 400 });
        }

        // Check if 'amount' is missing in the request body and convert it to a number
        if (!amount) {
            return new NextResponse("Amount is required", { status: 400 });
        }

        // Check if 'resolution' is missing in the request body (Bad Request)
        if (!resolution) {
            return new NextResponse("Resolution is required", { status: 400 });
        }

        // Check if the user has exceeded the free trial API limit or is not a pro subscriber (Forbidden)
        const freeTrial = await checkApiLimit();
        const isPro = await checkSubscription();
        if (!freeTrial && !isPro) {
            return new NextResponse("Free trial limit reached", { status: 403 });
        }

        // Generate the image using the OpenAI API with the specified prompt, amount, and resolution
        const response = await openai.createImage({
            prompt: prompt,
            n: parseInt(amount, 10), // Convert the 'amount' to a number
            size: resolution,
        });

        // If the user is not a pro subscriber, increase the API limit
        if (!isPro) {
            await increaseApiLimit();
        }

        // Return the generated image data as JSON in the Next.js response
        return NextResponse.json(response.data.data);

    } catch (error) {
        // If any error occurs during the process, log it and return an Internal Server Error
        console.log("[IMAGE_ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
