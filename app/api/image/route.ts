import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";
import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const defaultContextMessage = {
    role: 'system',
    content: "Generate an image that represents the following scene: [describe the scene you want to be generated in Slovenian language]."
};



export async function POST(req: Request) {
    try {
        const {userId} = auth();
        const body = await req.json();
        let {prompt, amount = 1, resolution = "512x512"} = body;

        if(!userId) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        if(!configuration.apiKey) {
            return new NextResponse("OpenAI API key not configured", {status: 500});
        }

        if(!prompt) {
            return new NextResponse("Prompt is required", {status: 400});
        }
        if(!amount) {
            return new NextResponse("Amount is required", {status: 400});
        }
        if(!resolution) {
            return new NextResponse("Resolution is required", {status: 400});
        }

        const freeTrial = await checkApiLimit()

        if(!freeTrial) {
            return new NextResponse("Free trial limit reached", {status: 403});
        }

        // Prepend the default context message to the messages
        // prompt = [defaultContextMessage, ...prompt];

        const response = await openai.createImage({
            prompt: prompt,
            n: parseInt(amount, 10),
            size: resolution,
            
        });

        await increaseApiLimit()

        return NextResponse.json(response.data.data);

    } catch (error) {
        console.log("[IMAGE_ERROR]", error);
        return new NextResponse("Internal error", {status: 500});
    }
}
