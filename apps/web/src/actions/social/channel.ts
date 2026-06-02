"use server";

import { prisma } from "database";
import { revalidatePath } from "next/cache";

export async function getChannels() {
  return prisma.channel.findMany({
    orderBy: { createdAt: "asc" }
  });
}

export async function connectMockChannel(data: {
  platform: string;
  name: string;
  handle: string;
  color: string;
  bg: string;
}) {
  const channel = await prisma.channel.create({
    data: {
      ...data,
      status: 'connected'
    }
  });
  
  revalidatePath("/channels");
  revalidatePath("/");
  return channel;
}

export async function disconnectChannel(id: string) {
  await prisma.channel.delete({
    where: { id }
  });
  revalidatePath("/channels");
  revalidatePath("/");
}

export async function updateChannel(id: string, data: { name: string; handle: string; status?: string }) {
  const channel = await prisma.channel.update({
    where: { id },
    data
  });
  revalidatePath("/channels");
  revalidatePath("/");
  return channel;
}
