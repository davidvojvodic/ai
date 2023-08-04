import {auth} from "@clerk/nextjs"
import { NextResponse } from "next/server"
import Replicate from "replicate"

import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit"
import { checkSubscription } from "@/lib/subscription"

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN!,
})

export async function POST(req: Request) {
    try {
        const {userId} = auth()

        const body = await req.json()
        let { prompt } = body;

        if(!userId) {
            return new NextResponse("Unauthorized", {status: 401})
        }

        if(!prompt) {
            return new NextResponse("Prompt is required", {status: 400})
        }

        const freeTrial = await checkApiLimit()
        const isPro = await checkSubscription()
        if(!freeTrial && !isPro) {
            return new NextResponse("Free trial limit reached", {status: 403})
        }

        const response = await replicate.run(
            "jingyunliang/swinir:660d922d33153019e8c263a3bba265de882e7f4f70396546b6c9c8f9d47a021a",
            {
              input: {
                image: "..."
              }
            }
          );

          if(!isPro) {
            await increaseApiLimit()
          }

          return NextResponse.json(response)

    } catch (error) {
        console.log("[RESTORATION_ERROR]", error);
        return new NextResponse("Internal error", {status: 500})
    }
}