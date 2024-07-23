import { faker } from '@faker-js/faker';

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  country: 'US' | 'MX' | 'CA';
  created_at: Date;
  avatar: string;
}

export const generateFakeUsers = (): User[] => {
  const users: User[] = [];
  const countries: ('US' | 'MX' | 'CA')[] = ['US', 'MX', 'CA'];

  for (let i = 0; i < 30; i++) {
    users.push({
      id: i + 1,
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      country: faker.helpers.arrayElement(countries),
      created_at: faker.date.past(),
      avatar: faker.image.avatar(),
    });
  }
  return users;
};
