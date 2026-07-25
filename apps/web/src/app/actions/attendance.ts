"use server";

import { prisma } from "@repo/database";
import { revalidatePath } from "next/cache";

export async function getStudentsByGrade(gradeId?: string) {
  try {
    // For this prototype, we'll fetch all students and their users if gradeId isn't required yet
    // Assuming there's a way to filter, but here we just get all students
    const students = await prisma.studentProfile.findMany({
      include: {
        user: true
      },
      take: 50 // Limit for prototype
    });
    return { success: true, students };
  } catch (error) {
    console.error("Error fetching students:", error);
    return { success: false, error: "Failed to fetch students" };
  }
}

export async function getAttendanceByDate(date: string) {
  try {
    const parsedDate = new Date(date);
    // Get start and end of the day
    const startOfDay = new Date(parsedDate.setHours(0,0,0,0));
    const endOfDay = new Date(parsedDate.setHours(23,59,59,999));

    const records = await prisma.attendance.findMany({
      where: {
        date: {
          gte: startOfDay,
          lte: endOfDay,
        }
      }
    });
    return { success: true, records };
  } catch (error) {
    console.error("Error fetching attendance:", error);
    return { success: false, error: "Failed to fetch attendance" };
  }
}

export async function markAttendance(studentId: string, date: string, status: string, remarks?: string) {
  try {
    const parsedDate = new Date(date);
    const startOfDay = new Date(new Date(parsedDate).setHours(0,0,0,0));
    const endOfDay = new Date(new Date(parsedDate).setHours(23,59,59,999));

    // Upsert equivalent: check if exists, then update or create
    const existingRecord = await prisma.attendance.findFirst({
      where: {
        studentId,
        date: {
          gte: startOfDay,
          lte: endOfDay,
        }
      }
    });

    if (existingRecord) {
      await prisma.attendance.update({
        where: { id: existingRecord.id },
        data: { status, remarks }
      });
    } else {
      await prisma.attendance.create({
        data: {
          studentId,
          date: parsedDate,
          status,
          remarks
        }
      });
    }

    revalidatePath('/attendance');
    return { success: true };
  } catch (error) {
    console.error("Error marking attendance:", error);
    return { success: false, error: "Failed to mark attendance" };
  }
}

export async function markBulkAttendance(date: string, records: {studentId: string, status: string}[]) {
  try {
    const parsedDate = new Date(date);
    
    // Simple loop for prototype (in prod use transaction + upsert or raw query)
    for (const record of records) {
      await markAttendance(record.studentId, date, record.status);
    }
    
    return { success: true };
  } catch (error) {
    console.error("Error in bulk attendance:", error);
    return { success: false, error: "Failed to mark bulk attendance" };
  }
}
