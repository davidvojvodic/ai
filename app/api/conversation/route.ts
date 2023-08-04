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

// Define the default context message for the chat conversation
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
        let { messages } = body;

        // Check if the user is not authenticated (Unauthorized)
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Check if the OpenAI API key is not configured (Internal Server Error)
        if (!configuration.apiKey) {
            return new NextResponse("OpenAI API key not configured", { status: 500 });
        }

        // Check if 'messages' is missing in the request body (Bad Request)
        if (!messages) {
            return new NextResponse("Messages are required", { status: 400 });
        }

        // Check if the user has exceeded the free trial API limit or is not a pro subscriber (Forbidden)
        const freeTrial = await checkApiLimit();
        const isPro = await checkSubscription();
        if (!freeTrial && !isPro) {
            return new NextResponse("Free trial limit reached", { status: 403 });
        }

        // Prepend the default context message to the messages for the chat conversation
        messages = [defaultContextMessage, ...messages];

        // Call the OpenAI API to create a chat completion with the specified model and messages
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages
        });

        // If the user is not a pro subscriber, increase the API limit
        if (!isPro) {
            await increaseApiLimit();
        }

        // Return the generated response as JSON in the Next.js response
        return NextResponse.json(response.data.choices[0].message);

    } catch (error) {
        // If any error occurs during the process, log it and return an Internal Server Error
        console.log("[CONVERSATION_ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
