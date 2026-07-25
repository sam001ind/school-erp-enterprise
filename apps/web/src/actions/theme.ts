"use server";

import { prisma } from "@repo/database";

export async function getTheme(tenantId: string = "default") {
  try {
    const theme = await prisma.websiteTheme.findFirst({
      where: { tenantId },
    });
    return { success: true, theme };
  } catch (error) {
    console.error("Error fetching theme:", error);
    return { success: false, error: "Failed to fetch theme" };
  }
}

export async function saveTheme(data: any, tenantId: string = "default") {
  try {
    const existing = await prisma.websiteTheme.findFirst({
      where: { tenantId },
    });

    if (existing) {
      const updated = await prisma.websiteTheme.update({
        where: { id: existing.id },
        data: {
          ...data,
        },
      });
      return { success: true, theme: updated };
    } else {
      const created = await prisma.websiteTheme.create({
        data: {
          ...data,
          tenantId,
        },
      });
      return { success: true, theme: created };
    }
  } catch (error) {
    console.error("Error saving theme:", error);
    return { success: false, error: "Failed to save theme" };
  }
}
