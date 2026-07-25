import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Test School...');

  // Create the Tenant
  const school = await prisma.tenant.upsert({
    where: { domain: "apex.edu" },
    update: {
      logoUrl: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=200&fit=crop',
    },
    create: {
      name: "Apex International Academy",
      domain: "apex.edu",
      logoUrl: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=200&fit=crop',
      status: "Active"
    }
  });

  console.log(`Created Tenant: ${school.name} (${school.id})`);

  // Ensure 'Super Admin' role exists
  let adminRole = await prisma.role.findUnique({
    where: { name: "Super Admin" }
  });

  if (!adminRole) {
    adminRole = await prisma.role.create({
      data: {
        name: "Super Admin",
        description: "Full system access"
      }
    });
    console.log('Created Super Admin Role');
  }

  // Find or Create the Super Admin user for this school
  const userEmail = "abhijiththirutheri@gmail.com";
  let user = await prisma.user.findUnique({
    where: { email: userEmail }
  });

  if (user) {
    // Update existing user to belong to this tenant
    user = await prisma.user.update({
      where: { email: userEmail },
      data: {
        tenantId: school.id,
        roleId: adminRole.id
      }
    });
    console.log(`Updated user ${user.email} to belong to tenant ${school.name}`);
  } else {
    // Create new user
    user = await prisma.user.create({
      data: {
        email: userEmail,
        password: "hashed_password_mock", // In a real app, hash this!
        name: "Abhijith Thirutheri",
        roleId: adminRole.id,
        tenantId: school.id
      }
    });
    console.log(`Created user ${user.email} for tenant ${school.name}`);
  }

  console.log('Finished seeding Test School.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
