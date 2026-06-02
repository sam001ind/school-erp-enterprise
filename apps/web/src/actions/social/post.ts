"use server";

import { prisma } from "database";
import { revalidatePath } from "next/cache";

export async function getPosts() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" }
  });
  
  return posts.map(post => ({
    ...post,
    platforms: JSON.parse(post.platforms) as string[]
  }));
}

export async function createPost(data: {
  content: string;
  platforms: string[];
  time: string;
  date: Date;
  author: string;
  status: string;
  color: string;
}) {
  const post = await prisma.post.create({
    data: {
      content: data.content,
      platforms: JSON.stringify(data.platforms),
      time: data.time,
      date: data.date,
      author: data.author,
      status: data.status,
      color: data.color
    }
  });
  
  revalidatePath("/");
  revalidatePath("/publishing");
  revalidatePath("/calendar");
  return {
    ...post,
    platforms: JSON.parse(post.platforms) as string[]
  };
}

export async function deletePost(id: string) {
  await prisma.post.delete({
    where: { id }
  });
  revalidatePath("/");
  revalidatePath("/publishing");
  revalidatePath("/calendar");
}

export async function editPost(id: string, data: any) {
  const updateData: any = {};
  if (data.content !== undefined) updateData.content = data.content;
  if (data.platforms !== undefined) updateData.platforms = JSON.stringify(data.platforms);
  if (data.status !== undefined) updateData.status = data.status;
  if (data.time !== undefined) updateData.time = data.time;
  if (data.date !== undefined) updateData.date = data.date;

  const post = await prisma.post.update({
    where: { id },
    data: updateData
  });

  revalidatePath("/");
  revalidatePath("/publishing");
  revalidatePath("/calendar");

  return {
    ...post,
    platforms: JSON.parse(post.platforms) as string[]
  };
}
