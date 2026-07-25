"use server";

import { prisma } from "@repo/database";
import { revalidatePath } from "next/cache";

export async function getLeads() {
  try {
    const leads = await prisma.admissionLead.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return { success: true, leads };
  } catch (error) {
    console.error("Error fetching leads:", error);
    return { success: false, error: "Failed to fetch leads" };
  }
}

export async function createLead(data: {
  studentName: string;
  parentName: string;
  email: string;
  phone: string;
  gradeApplied: string;
  source?: string;
  notes?: string;
}) {
  try {
    const lead = await prisma.admissionLead.create({
      data: {
        ...data,
        status: "New"
      }
    });
    revalidatePath('/admissions');
    return { success: true, lead };
  } catch (error) {
    console.error("Error creating lead:", error);
    return { success: false, error: "Failed to create lead" };
  }
}

export async function updateLeadStatus(id: string, newStatus: string) {
  try {
    const lead = await prisma.admissionLead.update({
      where: { id },
      data: { status: newStatus }
    });
    revalidatePath('/admissions');
    return { success: true, lead };
  } catch (error) {
    console.error("Error updating lead status:", error);
    return { success: false, error: "Failed to update lead status" };
  }
}
