import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const tenant = await prisma.tenant.findFirst({ where: { domain: 'apex.edu' } });
  if (!tenant) {
    console.log("No tenant found");
    return;
  }

  const role = await prisma.role.findFirst();

  let user = await prisma.user.findUnique({ where: { email: 'hr@apex.edu' } });
  if (!user) {
    user = await prisma.user.create({
      data: {
        email: 'hr@apex.edu',
        password: 'password',
        name: 'Jane Smith',
        roleId: role!.id,
        tenantId: tenant.id
      }
    });
  }

  let emp = await prisma.employee.findUnique({ where: { employeeId: 'test-emp-1' } });
  if (!emp) {
    emp = await prisma.employee.create({
      data: {
        userId: user.id,
        employeeId: 'test-emp-1',
        department: 'Human Resources',
        designation: 'HR Manager',
        joiningDate: new Date('2023-01-15'),
        baseSalary: 5000,
        bankName: 'Global Bank',
        accountNo: '123456789',
        taxId: 'PAN123456',
        status: 'ACTIVE'
      }
    });

    const struct = await prisma.salaryStructure.create({
      data: {
        employeeId: emp.id,
      }
    });

    await prisma.salaryComponent.createMany({
      data: [
        { salaryStructureId: struct.id, name: 'HRA', type: 'EARNING', amount: 1500 },
        { salaryStructureId: struct.id, name: 'Special Allowance', type: 'EARNING', amount: 500 },
        { salaryStructureId: struct.id, name: 'Tax', type: 'DEDUCTION', amount: 450 },
        { salaryStructureId: struct.id, name: 'PF', type: 'DEDUCTION', amount: 250 },
      ]
    });

    await prisma.leaveBalance.createMany({
      data: [
        { employeeId: emp.id, year: new Date().getFullYear(), leaveType: 'SICK', totalDays: 12 },
        { employeeId: emp.id, year: new Date().getFullYear(), leaveType: 'CASUAL', totalDays: 10 },
        { employeeId: emp.id, year: new Date().getFullYear(), leaveType: 'ANNUAL', totalDays: 15 },
      ]
    });

    console.log("Seeded HRMS test data!");
  } else {
    console.log("HRMS data already exists");
  }
}
main().catch(console.error).finally(() => prisma.$disconnect());
