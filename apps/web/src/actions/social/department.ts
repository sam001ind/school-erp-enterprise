"use server";

import { prisma } from "database";
import { revalidatePath } from "next/cache";

export async function getDepartments() {
  return prisma.department.findMany({
    orderBy: { createdAt: "asc" }
  });
}

export async function createDepartment(data: {
  name: string;
  industry: string;
  logo: string;
}) {
  const dept = await prisma.department.create({
    data: {
      name: data.name,
      industry: data.industry,
      logo: data.logo,
      members: 1,
      connected: 0
    }
  });
  
  revalidatePath("/");
  revalidatePath("/brands");
  return dept;
}

export async function deleteDepartment(id: string) {
  await prisma.department.delete({
    where: { id }
  });
  revalidatePath("/");
  revalidatePath("/brands");
}
