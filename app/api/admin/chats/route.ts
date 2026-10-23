import { NextResponse } from "next/server";
import { getChatSessions, deleteChatSession } from "@/lib/db";

export async function GET() {
  try {
    const sessions = await getChatSessions();
    return NextResponse.json({ sessions });
  } catch (error: any) {
    console.error("Admin chats GET error:", error);
    return NextResponse.json({ error: "Failed to fetch chat sessions" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("sessionId");

    if (!sessionId) {
      return NextResponse.json({ error: "sessionId is required" }, { status: 400 });
    }

    await deleteChatSession(sessionId);
    return NextResponse.json({ success: true, message: "Chat session deleted" });
  } catch (error: any) {
    console.error("Admin chat DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete chat session" }, { status: 500 });
  }
}
