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
// // app/api/image/route.ts
// import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
// import { auth } from "@clerk/nextjs";
// import { NextResponse } from "next/server";
// import fs from 'fs';
// import path from 'path';
// import { ComfyUIOutputImage, ComfyUIResponse, GeneratedImage } from "./types";

// // Helper function to queue prompt in ComfyUI
// async function queuePrompt(prompt: any): Promise<{ prompt_id: string }> {
//   const res = await fetch('http://localhost:8188/prompt', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ prompt }),
//   });
//   if (!res.ok) throw new Error(`ComfyUI API error: ${res.statusText}`);
//   return res.json();
// }

// export async function POST(req: Request) {
//   try {
//     const { userId } = auth();
//     const body = await req.json();
//     const { prompt, amount = 1, resolution = "512x512" } = body;
//     const [width, height] = resolution.split('x').map(Number);

//     // Validation
//     if (!userId) return new NextResponse("Unauthorized", { status: 401 });
//     if (!prompt) return new NextResponse("Missing prompt", { status: 400 });

//     const isAllowed = await checkApiLimit();
//     if (!isAllowed) return new NextResponse("API Limit Exceeded", { status: 403 });

//     // Load ComfyUI workflow template
//     const workflowPath = path.join(process.cwd(), 'comfy_workflow.json');
//     if (!fs.existsSync(workflowPath)) {
//       return new NextResponse("Workflow template not found", { status: 500 });
//     }
//     const workflow = JSON.parse(fs.readFileSync(workflowPath, 'utf-8'));

//     // Modify workflow with user inputs
//     workflow["6"]["inputs"]["text"] = prompt; // Adjust node IDs as per your workflow
//     workflow["3"]["inputs"]["width"] = width;
//     workflow["3"]["inputs"]["height"] = height;
//     workflow["3"]["inputs"]["batch_size"] = amount;

//     // Execute the workflow
//     const { prompt_id } = await queuePrompt(workflow);

//     // Poll for completion
//     let result: ComfyUIResponse | null = null;
//     let attempts = 0;
//     const maxAttempts = 30;
//     const pollInterval = 1000; // 1 second

//     while (!result?.[prompt_id] && attempts < maxAttempts) {
//       await new Promise((resolve) => setTimeout(resolve, pollInterval));
//       const historyRes = await fetch(`http://localhost:8188/history/${prompt_id}`);
//       if (historyRes.ok) {
//         const history = await historyRes.json();
//         result = history;
//       }
//       attempts++;
//     }

//     if (!result?.[prompt_id]) {
//       throw new Error("Generation timeout: ComfyUI did not return results in time");
//     }

//     // Process generated images
//     const images: GeneratedImage[] = result[prompt_id].outputs["9"].images.map((img: ComfyUIOutputImage) => {
//       const imagePath = path.join(process.cwd(), 'ComfyUI/output', img.filename);
//       const imageBuffer = fs.readFileSync(imagePath);
//       return {
//         base64: imageBuffer.toString('base64'),
//         mimeType: 'image/png', // Adjust if using other formats
//       };
//     });

//     await increaseApiLimit();
//     return NextResponse.json(images);

//   } catch (error) {
//     console.error("[COMFYUI_ERROR]", error);
//     return new NextResponse("Internal Server Error", { status: 500 });
//   }
// }