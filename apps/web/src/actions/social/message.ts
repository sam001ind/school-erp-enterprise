"use server";

import { prisma } from "database";
import { revalidatePath } from "next/cache";

export async function getMessages() {
  const msgs = await prisma.message.findMany({
    orderBy: { createdAt: "desc" }
  });
  
  return msgs.map(msg => ({
    ...msg,
    replies: JSON.parse(msg.replies) as any[]
  }));
}

export async function updateMessageStatus(id: string, status: string) {
  await prisma.message.update({
    where: { id },
    data: { status }
  });
  revalidatePath("/inbox");
  revalidatePath("/");
}

export async function replyToMessage(id: string, replyText: string) {
  const msg = await prisma.message.findUnique({ where: { id } });
  if (!msg) return;
  
  const currentReplies = JSON.parse(msg.replies) as any[];
  const newReply = {
    id: Date.now().toString(),
    author: "My Institution",
    text: replyText,
    time: "Just now"
  };
  
  await prisma.message.update({
    where: { id },
    data: { 
      replies: JSON.stringify([...currentReplies, newReply]),
      status: "read"
    }
  });
  
  revalidatePath("/inbox");
}
