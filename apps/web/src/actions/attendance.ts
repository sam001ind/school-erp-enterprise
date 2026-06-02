"use server";

import { prisma } from "@repo/database";
import { revalidatePath } from "next/cache";

export async function getStudentAttendance(studentId: string) {
  return await prisma.attendance.findMany({
    where: { studentId },
    orderBy: { date: 'desc' },
    take: 30,
  });
}

export async function getEmployeeAttendance(employeeId: string) {
  return await prisma.employeeAttendance.findMany({
    where: { employeeId },
    orderBy: { date: 'desc' },
    take: 30,
  });
}

export async function markStudentAttendance(data: {
  studentId: string;
  date: Date;
  status: string;
  checkInMethod: string;
  remarks?: string;
}) {
  const result = await prisma.attendance.create({
    data: {
      studentId: data.studentId,
      date: data.date,
      status: data.status,
      checkInMethod: data.checkInMethod,
      remarks: data.remarks,
    }
  });
  revalidatePath('/attendance');
  return result;
}

export async function markEmployeeAttendance(data: {
  employeeId: string;
  date: Date;
  status: string;
  checkInMethod: string;
  checkInTime?: Date;
  remarks?: string;
}) {
  const result = await prisma.employeeAttendance.create({
    data: {
      employeeId: data.employeeId,
      date: data.date,
      status: data.status,
      checkInMethod: data.checkInMethod,
      checkInTime: data.checkInTime,
      remarks: data.remarks,
    }
  });
  revalidatePath('/attendance');
  return result;
}

export async function checkoutEmployeeAttendance(id: string, checkOutTime: Date) {
  const result = await prisma.employeeAttendance.update({
    where: { id },
    data: { checkOutTime }
  });
  revalidatePath('/attendance');
  return result;
}
