"use server";

import { prisma } from "@repo/database";
import { revalidatePath } from "next/cache";

export async function updateTenantLogo(tenantId: string, logoBase64: string) {
  try {
    const updatedTenant = await prisma.tenant.update({
      where: { id: tenantId },
      data: { logoUrl: logoBase64 },
    });
    
    // Revalidate paths to reflect the new logo
    revalidatePath('/', 'layout');
    
    return { success: true, tenant: updatedTenant };
  } catch (error) {
    console.error("Error updating tenant logo:", error);
    return { success: false, error: "Failed to update logo" };
  }
}

export async function getTenant(tenantId?: string) {
  try {
    const tenant = await prisma.tenant.findFirst(tenantId ? { where: { id: tenantId } } : undefined);
    return { success: true, tenant };
  } catch (error) {
    console.error("Error getting tenant:", error);
    return { success: false, error: "Failed to get tenant" };
  }
}

export async function updateTenant(tenantId: string, data: any) {
  try {
    const updatedTenant = await prisma.tenant.update({
      where: { id: tenantId },
      data,
    });
    revalidatePath('/', 'layout');
    return { success: true, tenant: updatedTenant };
  } catch (error) {
    console.error("Error updating tenant:", error);
    return { success: false, error: "Failed to update tenant" };
  }
}
