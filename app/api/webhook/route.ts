import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function GET() {
  try {
    const { userId } = auth();
    const user = await currentUser();

    if (!userId || !user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    return new NextResponse(JSON.stringify({ message: "Subscription feature removed" }), { status: 200 });
  } catch (error) {
    console.log("[ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  return new NextResponse("Subscription webhooks removed", { status: 200 });
}