import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { HfInference } from "@huggingface/inference";
import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";

const client = new HfInference(process.env.HF_API_KEY!);

const instructionMessage = {
  role: "user",
  content: "You are now a Startup advisor you must advice on buisness related info for the following under 1000 words:",
};

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!process.env.HF_API_KEY) {
      return new NextResponse("Hugging Face API Key not configured", { status: 500 });
    }

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    const isAllowed = await checkApiLimit();

    if (!isAllowed) {
      return new NextResponse("API Limit Exceeded", { status: 403 });
    }

    const chatCompletion = await client.chatCompletion({
      model: "deepseek-ai/DeepSeek-R1-Distill-Qwen-32B",
      messages: [instructionMessage, ...messages],
      provider: "hf-inference",
      max_tokens: 500,
    });

    await increaseApiLimit();

    return NextResponse.json(
      { text: chatCompletion.choices?.[0]?.message?.content || "No response generated." },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[CONVERSATION_ERROR]", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error", details: error.message || error }),
      { status: 500 }
    );
  }
}