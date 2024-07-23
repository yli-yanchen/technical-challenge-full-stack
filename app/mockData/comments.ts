import { faker } from '@faker-js/faker';
import { User } from './users';

export interface Comment {
  id: number;
  user_id: number;
  content: string;
  created_at: Date;
}

export const generateFakeComments = (users: User[]): Comment[] => {
  const comments: Comment[] = [];
  let commentId = 1;

  users.forEach((user) => {
    for (let i = 0; i < 7; i++) {
      const commentCount = faker.number.int({ min: 1, max: 5 });
      for (let j = 0; j < commentCount; j++) {
        comments.push({
          id: commentId++,
          user_id: user.id,
          content: faker.lorem.sentence(),
          created_at: faker.date.recent({ days: 7 }),
        });
      }
    }
  });

  return comments;
};
