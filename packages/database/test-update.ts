import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const tenant = await prisma.tenant.findFirst();
  console.log("Found tenant:", tenant);
  if (!tenant) return;
  
  try {
    const updated = await prisma.tenant.update({
      where: { id: tenant.id },
      data: {
        logoUrl: "https://www.behance.net/gallery/29632909/Random-Logo-1"
      }
    });
    console.log("Success:", updated);
  } catch (error) {
    console.error("Error:", error);
  }
}
main().catch(console.error).finally(() => prisma.$disconnect());
