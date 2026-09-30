import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Limpiando datos existentes...');
  await prisma.user.deleteMany();
  await prisma.tenant.deleteMany();

  console.log('Creando tenants y usuarios...');
  const hashedPassword = await bcrypt.hash('password123', 10);

  const tenant = await prisma.tenant.create({
    data: { name: 'Tech Solutions' },
  });

  await prisma.user.create({
    data: {
      email: 'admin@techsolutions.com',
      name: 'Admin Tech Solutions',
      password: hashedPassword,
      role: 'ADMIN',
      tenantId: tenant.id,
    },
  });

  console.log('¡Seed completado con éxito!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });