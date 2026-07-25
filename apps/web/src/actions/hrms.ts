"use server";

import { prisma } from "@repo/database";

// ==========================================
// Employee Management
// ==========================================

export async function getEmployees() {
  try {
    const employees = await prisma.employee.findMany({
      include: {
        user: true,
        salaryStructure: {
          include: { components: true }
        }
      }
    });
    return { success: true, employees };
  } catch (error: any) {
    console.error("Error fetching employees:", error);
    return { success: false, error: error.message };
  }
}

// ==========================================
// Leave Management
// ==========================================

export async function getLeaveRequests() {
  try {
    const leaves = await prisma.leaveRequest.findMany({
      include: {
        employee: {
          include: { user: true }
        }
      },
      orderBy: { appliedAt: "desc" }
    });
    return { success: true, leaves };
  } catch (error: any) {
    console.error("Error fetching leaves:", error);
    return { success: false, error: error.message };
  }
}

export async function getLeaveBalances(employeeId: string, year: number) {
  try {
    const emp = await prisma.employee.findUnique({ where: { employeeId } });
    if (!emp) throw new Error("Employee not found");
    const balances = await prisma.leaveBalance.findMany({
      where: { employeeId: emp.id, year }
    });
    return { success: true, balances };
  } catch (error: any) {
    console.error("Error fetching balances:", error);
    return { success: false, error: error.message };
  }
}

export async function applyLeave(data: { employeeId: string, leaveType: string, startDate: Date, endDate: Date, reason: string }) {
  try {
    const emp = await prisma.employee.findUnique({ where: { employeeId: data.employeeId }});
    if (!emp) throw new Error("Employee not found");

    const leave = await prisma.leaveRequest.create({
      data: {
        employeeId: emp.id,
        leaveType: data.leaveType,
        startDate: data.startDate,
        endDate: data.endDate,
        reason: data.reason,
        status: "PENDING"
      }
    });
    return { success: true, leave };
  } catch (error: any) {
    console.error("Error applying leave:", error);
    return { success: false, error: error.message };
  }
}

export async function approveLeave(id: string, status: "APPROVED" | "REJECTED", comments: string) {
  try {
    const leave = await prisma.leaveRequest.update({
      where: { id },
      data: {
        status,
        reviewerComments: comments
      }
    });
    
    // If approved, ideally we update the leave balance here.
    if (status === "APPROVED") {
      const year = leave.startDate.getFullYear();
      
      // Calculate days (simplified)
      const diffTime = Math.abs(leave.endDate.getTime() - leave.startDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

      // Find balance
      const balance = await prisma.leaveBalance.findUnique({
        where: {
          employeeId_year_leaveType: {
            employeeId: leave.employeeId,
            year: year,
            leaveType: leave.leaveType
          }
        }
      });

      if (balance) {
        await prisma.leaveBalance.update({
          where: { id: balance.id },
          data: { usedDays: balance.usedDays + diffDays }
        });
      }
    }
    
    return { success: true, leave };
  } catch (error: any) {
    console.error("Error approving leave:", error);
    return { success: false, error: error.message };
  }
}

// ==========================================
// Payroll Management
// ==========================================

export async function getPayrolls(month: number, year: number) {
  try {
    const payrolls = await prisma.payroll.findMany({
      where: { month, year },
      include: {
        employee: {
          include: { user: true }
        }
      }
    });
    return { success: true, payrolls };
  } catch (error: any) {
    console.error("Error fetching payrolls:", error);
    return { success: false, error: error.message };
  }
}

export async function processPayroll(month: number, year: number) {
  try {
    // 1. Get all active employees with their salary structures
    const employees = await prisma.employee.findMany({
      where: { status: "ACTIVE" },
      include: {
        salaryStructure: {
          include: { components: true }
        }
      }
    });

    const results = [];

    // 2. Calculate and generate payroll for each
    for (const emp of employees) {
      // Check if payroll already exists
      const existing = await prisma.payroll.findFirst({
        where: { employeeId: emp.id, month, year }
      });

      if (existing) {
        results.push(existing);
        continue;
      }

      const struct = emp.salaryStructure;
      const basicPay = emp.baseSalary;
      let allowances = 0;
      let deductions = 0;

      if (struct) {
        for (const comp of struct.components) {
          if (comp.type === "EARNING") allowances += comp.amount;
          if (comp.type === "DEDUCTION") deductions += comp.amount;
        }
      }

      const netPay = basicPay + allowances - deductions;

      const payroll = await prisma.payroll.create({
        data: {
          employeeId: emp.id,
          month,
          year,
          basicPay,
          allowances,
          deductions,
          netPay,
          status: "PROCESSED",
          salaryStructureId: struct?.id
        }
      });

      results.push(payroll);
    }

    return { success: true, payrolls: results };
  } catch (error: any) {
    console.error("Error processing payroll:", error);
    return { success: false, error: error.message };
  }
}
