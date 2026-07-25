"use server";

import { prisma } from "@repo/database";

export async function getTenants() {
  try {
    const tenants = await prisma.tenant.findMany({
      orderBy: { createdAt: 'desc' }
    });
    
    // Map them to the format expected by the frontend SaaSContext
    return {
      success: true, 
      tenants: tenants.map(t => ({
        id: t.id,
        name: t.name,
        domain: t.domain || "",
        logoUrl: t.logoUrl || undefined,
        databaseStatus: "Active" as const, // Mocking some SaaS-specific fields not in DB yet
        dbUrlMasked: `postgres://saas_***:***@aws-pooler.supabase.com:5432/${t.id.split('-')[0]}`,
        securityLevel: "Standard" as const,
        createdAt: t.createdAt,
        storageUsedGB: 1.5,
        planType: "Pro" as const,
        status: t.status as "Active" | "Suspended" | "Maintenance"
      }))
    };
  } catch (error) {
    console.error("Error fetching tenants:", error);
    return { success: false, error: "Failed to fetch tenants" };
  }
}

export async function updateTenant(id: string, data: { name?: string, domain?: string, logoUrl?: string }) {
  try {
    const updated = await prisma.tenant.update({
      where: { id },
      data: {
        name: data.name,
        domain: data.domain === "" ? null : data.domain,
        logoUrl: data.logoUrl === "" ? null : data.logoUrl
      }
    });
    return { success: true, tenant: updated };
  } catch (error: any) {
    console.error("Error updating tenant:", error);
    return { success: false, error: error?.message || "Failed to update tenant" };
  }
}
