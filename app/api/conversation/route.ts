import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const defaultContextMessage = {
    role: 'system',
    content: "You are an assistant fluent in Slovenian. Answer the following as if you were speaking to a Slovenian user:"
};

export async function POST(req: Request) {
    try {
        const {userId} = auth();
        const body = await req.json();
        let {messages} = body;

        if(!userId) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        if(!configuration.apiKey) {
            return new NextResponse("OpenAI API key not configured", {status: 500});
        }

        if(!messages) {
            return new NextResponse("Messages are required", {status: 400});
        }

        // Prepend the default context message to the messages
        messages = [defaultContextMessage, ...messages];

        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages
        });

        return NextResponse.json(response.data.choices[0].message);

    } catch (error) {
        console.log("[CONVERSATION_ERROR]", error);
        return new NextResponse("Internal error", {status: 500});
    }
}
