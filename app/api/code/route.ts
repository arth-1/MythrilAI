import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { HfInference } from "@huggingface/inference";

const client = new HfInference(process.env.HF_API_KEY!);

const instructionMessage = {
  role: "user",
  content: "You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations.",
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
      return new NextResponse("Missing messages", { status: 400 });
    }

    const isAllowed = await checkApiLimit();

    if (!isAllowed) {
      return new NextResponse("API Limit Exceeded", { status: 403 });
    }

    const response = await client.chatCompletion({
      model: "deepseek-ai/DeepSeek-R1-Distill-Qwen-32B",
      messages: [instructionMessage, ...messages],
      provider: "hf-inference",
      max_tokens: 500,
    });

    await increaseApiLimit();

    return NextResponse.json(
      { text: response.choices?.[0]?.message?.content || "No response generated." },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[CODE_ERROR]", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error", details: error.message || error }),
      { status: 500 }
    );
  }
}