import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const settings = await req.json();

    // Here you would typically save to your database
    // For now, we'll just return success
    return NextResponse.json({ success: true, settings });
  } catch (error) {
    console.error("Settings update failed:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
