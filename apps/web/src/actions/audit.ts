"use server";

import { prisma } from "@repo/database";

export async function getWebsiteAuditLogs(searchTerm: string = "") {
  try {
    const logs = await prisma.websiteAuditLog.findMany({
      where: searchTerm ? {
        OR: [
          { action: { contains: searchTerm, mode: "insensitive" } },
          { resource: { contains: searchTerm, mode: "insensitive" } },
          { user: { contains: searchTerm, mode: "insensitive" } },
        ],
      } : undefined,
      orderBy: {
        timestamp: "desc",
      },
      take: 100, // Limit to 100 logs
    });
    
    return { success: true, logs };
  } catch (error) {
    console.error("Error fetching audit logs:", error);
    return { success: false, error: "Failed to fetch audit logs" };
  }
}

export async function createWebsiteAuditLog(data: {
  action: string;
  resource: string;
  resourceType: string;
  user: string;
  status: string;
  details?: string;
}) {
  try {
    const log = await prisma.websiteAuditLog.create({
      data: {
        ...data,
      },
    });
    return { success: true, log };
  } catch (error) {
    console.error("Error creating audit log:", error);
    return { success: false, error: "Failed to create audit log" };
  }
}
