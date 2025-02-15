import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { HfInference } from "@huggingface/inference";

const client = new HfInference(process.env.HF_API_KEY);

export async function POST(req: any) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, amount = 1, resolution = "512x512" } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!process.env.HF_API_KEY) {
      return new NextResponse("Hugging Face API Key not configured", { status: 500 });
    }

    if (!prompt) {
      return new NextResponse("Missing prompt", { status: 400 });
    }

    if (!amount) {
      return new NextResponse("Missing amount", { status: 400 });
    }

    if (!resolution) {
      return new NextResponse("Missing resolution", { status: 400 });
    }

    const isAllowed = await checkApiLimit();

    if (!isAllowed) {
      return new NextResponse("API Limit Exceeded", { status: 403 });
    }

    const images = [];
    for (let i = 0; i < parseInt(amount, 10); i++) {
      const image = await client.textToImage({
        model: "stabilityai/stable-diffusion-3.5-large",
        inputs: prompt,
        parameters: { num_inference_steps: 5 },
        provider: "hf-inference",
      });
      images.push(image);
    }

    await increaseApiLimit();

    return NextResponse.json(images, { status: 200 });
  } catch (error) {
    console.log("[IMAGE_GENERATION_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}