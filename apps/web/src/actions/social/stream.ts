"use server";

import { prisma } from "database";
import { revalidatePath } from "next/cache";

export async function getStreams() {
  try {
    const streams = await prisma.stream.findMany({
      orderBy: { createdAt: "asc" }
    });
    
    // Parse the JSON string into an array
    return streams.map(s => ({
      ...s,
      posts: JSON.parse(s.posts)
    }));
  } catch (error) {
    console.error("Failed to fetch streams:", error);
    return [];
  }
}

export async function createStream(data: {
  title: string;
  keyword: string;
  platform: string;
  color: string;
}) {
  try {
    // Generate some mock posts based on the keyword
    const mockPosts = [
      {
        id: Math.floor(Math.random() * 10000),
        user: "TechEnthusiast",
        handle: "@techenthusiast",
        time: "Just now",
        text: `Really interesting developments regarding ${data.keyword} today. Keeping an eye on this space!`
      },
      {
        id: Math.floor(Math.random() * 10000) + 1,
        user: "IndustryExpert",
        handle: "@expert_123",
        time: "15m",
        text: `Can anyone recommend a good tool for tracking ${data.keyword}?`
      },
      {
        id: Math.floor(Math.random() * 10000) + 2,
        user: "NewsBot",
        handle: "@news_alert",
        time: "1h",
        text: `Top trending topic right now: ${data.keyword}. Read more about it in our latest article.`
      }
    ];

    const stream = await prisma.stream.create({
      data: {
        title: data.title,
        keyword: data.keyword,
        platform: data.platform,
        color: data.color,
        posts: JSON.stringify(mockPosts)
      }
    });

    revalidatePath("/(dashboard)/social");
    return {
      ...stream,
      posts: mockPosts
    };
  } catch (error) {
    console.error("Failed to create stream:", error);
    throw new Error("Failed to create stream");
  }
}

export async function deleteStream(id: string) {
  try {
    await prisma.stream.delete({
      where: { id }
    });
    revalidatePath("/(dashboard)/social");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete stream:", error);
    throw new Error("Failed to delete stream");
  }
}
