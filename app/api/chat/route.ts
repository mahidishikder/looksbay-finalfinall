import { NextResponse } from "next/server";
import {
  getChatSession,
  addChatMessage,
  markChatRead,
  resolveChatSession,
} from "@/lib/db";
import { sendLiveChatAlert } from "@/lib/email";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("sessionId");

    if (!sessionId) {
      return NextResponse.json({ error: "sessionId is required" }, { status: 400 });
    }

    const session = await getChatSession(sessionId);
    return NextResponse.json({ session: session || null });
  } catch (error: any) {
    console.error("Chat GET error:", error);
    return NextResponse.json({ error: "Failed to fetch chat session" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      sessionId,
      text,
      sender = "client",
      senderName,
      attachmentName,
      clientName,
      clientContact,
      developerId,
      developerName,
      developerRole,
      developerAvatar,
    } = body;

    if (!sessionId || (!text && !attachmentName)) {
      return NextResponse.json(
        { error: "sessionId and message text or attachment are required" },
        { status: 400 }
      );
    }

    const session = await addChatMessage(
      sessionId,
      {
        sender,
        senderName: senderName || (sender === "developer" ? developerName || "Developer" : clientName || "Client"),
        text: text || `[Shared attachment: ${attachmentName}]`,
        attachmentName,
      },
      {
        clientName,
        clientContact,
        developerId,
        developerName,
        developerRole,
        developerAvatar,
      }
    );

    // If client sent a message, notify studio email asynchronously (don't block response)
    if (sender === "client") {
      sendLiveChatAlert({
        sessionId,
        clientName: session.clientName,
        clientContact: session.clientContact,
        developerName: session.developerName,
        messageText: text || `Shared attachment: ${attachmentName}`,
      }).catch((e) => console.error("Async live chat email failed:", e));
    }

    return NextResponse.json({ session });
  } catch (error: any) {
    console.error("Chat POST error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { sessionId, action, reader, resolved } = body;

    if (!sessionId) {
      return NextResponse.json({ error: "sessionId is required" }, { status: 400 });
    }

    if (action === "read") {
      await markChatRead(sessionId, reader || "client");
      return NextResponse.json({ success: true });
    }

    if (action === "resolve") {
      await resolveChatSession(sessionId, resolved !== false);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("Chat PATCH error:", error);
    return NextResponse.json({ error: "Failed to update chat" }, { status: 500 });
  }
}
