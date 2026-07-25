import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Website Audit Logs...');

  const logs = [
    {
      action: "Page Published",
      resource: "/home",
      resourceType: "page",
      user: "Admin (John Doe)",
      status: "success",
      details: "Homepage layout updated with new hero banner."
    },
    {
      action: "Theme Updated",
      resource: "Global Theme",
      resourceType: "theme",
      user: "Admin (Jane Smith)",
      status: "success",
      details: "Changed primary color to #0ea5e9 and heading font to Inter."
    },
    {
      action: "Page Draft Saved",
      resource: "/admissions-info",
      resourceType: "page",
      user: "Editor (Mark Lee)",
      status: "success",
      details: "Updated fee structure for 2026 academic year."
    },
    {
      action: "Component Edited",
      resource: "Testimonial Carousel",
      resourceType: "component",
      user: "Admin (John Doe)",
      status: "success",
      details: "Added new student testimonial to the slider."
    },
    {
      action: "Site Taken Offline",
      resource: "Global Configuration",
      resourceType: "config",
      user: "Super Admin",
      status: "warning",
      details: "Site put into maintenance mode for critical updates."
    },
    {
      action: "Site Brought Online",
      resource: "Global Configuration",
      resourceType: "config",
      user: "Super Admin",
      status: "success",
      details: "Maintenance window ended. Site is live."
    },
    {
      action: "Publish Failed",
      resource: "/academics-programs",
      resourceType: "page",
      user: "Editor (Mark Lee)",
      status: "error",
      details: "Validation error: Missing SEO description."
    }
  ];

  for (const log of logs) {
    await prisma.websiteAuditLog.create({
      data: log
    });
  }

  console.log('Finished seeding Website Audit Logs.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
