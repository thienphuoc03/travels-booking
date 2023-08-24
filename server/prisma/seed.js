import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const salt = await bcrypt.genSalt(10);
const adminPassword = await bcrypt.hash('admin', salt);
const testPassword = await bcrypt.hash('test', salt);

async function main() {
  const adminRole = await prisma.role.create({
    data: {
      name: 'ADMIN',
    },
  });

  const userRole = await prisma.role.create({
    data: {
      name: 'USER',
    },
  });

  const createManyUserRoot = await prisma.user.createMany({
    data: [
      {
        firstName: 'Admin',
        lastName: 'Admin',
        username: 'admin',
        password: adminPassword,
        email: 'admin@gmail.com',
        phoneNumber: '0987654321',
        roleIds: [adminRole.id],
      },
      {
        firstName: 'Test',
        lastName: 'Test',
        username: 'test',
        password: testPassword,
        email: 'test@gmail.com',
        phoneNumber: '0987654312',
        roleIds: [userRole.id],
      },
    ],
  });

  console.log({ createManyUserRoot });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
