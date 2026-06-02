"use server";

import { prisma } from "@repo/database";
import { revalidatePath } from "next/cache";

export async function getClasses() {
  return await prisma.academicClass.findMany({
    include: {
      subjects: true,
    }
  });
}

export async function getSubjects(classId: string) {
  return await prisma.subject.findMany({
    where: { classId },
    include: {
      lessonPlans: true,
      studyMaterials: true,
      assignments: true
    }
  });
}

export async function createSubject(data: { name: string; code: string; classId: string }) {
  const subject = await prisma.subject.create({ data });
  revalidatePath('/academic');
  return subject;
}

export async function createLessonPlan(data: { subjectId: string; topic: string; description: string; targetDate: Date }) {
  const plan = await prisma.lessonPlan.create({ data });
  revalidatePath('/academic');
  return plan;
}

export async function toggleLessonPlanStatus(id: string, completed: boolean) {
  const plan = await prisma.lessonPlan.update({
    where: { id },
    data: { completed }
  });
  revalidatePath('/academic');
  return plan;
}

export async function createAssignment(data: { title: string; description: string; subjectId: string; classId: string; dueDate: Date; totalMarks: number }) {
  const assignment = await prisma.assignment.create({ data });
  revalidatePath('/academic');
  return assignment;
}

export async function createStudyMaterial(data: { title: string; description: string; fileUrl: string; type: string; subjectId: string }) {
  const material = await prisma.studyMaterial.create({ data });
  revalidatePath('/academic');
  return material;
}
