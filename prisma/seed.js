const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

async function main() {
  const users = [];
  const countries = ['US', 'MX', 'CA'];

  for (let i = 0; i < 30; i++) {
    users.push({
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      country: countries[Math.floor(Math.random() * countries.length)],
      created_at: faker.date.recent({ days: 7 }),
      avatar: faker.image.avatar(),
    });
  }

  const createdUsers = await prisma.user.createMany({ data: users });
  console.log(`Inserted ${createdUsers.count} users`);

  // Retrieve users with IDs
  const insertedUsers = await prisma.user.findMany();

  const comments = [];
  for (const user of insertedUsers) {
    for (let i = 0; i < 5; i++) {
      comments.push({
        user_id: user.id,
        content: faker.lorem.sentence(),
        created_at: faker.date.recent({ days: 7 }),
      });
    }
  }

  const createdComments = await prisma.comment.createMany({ data: comments });
  console.log(`Inserted ${createdComments.count} comments`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
