import { NextResponse } from 'next/server';
import prisma from '../../../prisma/prisma';

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: {
        comments: true,
      },
    });
    console.log('>>> users from dataset: ', users);

    // Transform the data to match the expected UserData format
    const transformedUsers = users.map((user) => {
      const today = new Date();
      const todayStart = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      ).getTime();
      const yesterdayStart = todayStart - 24 * 60 * 60 * 1000;

      const todayComments = user.comments.filter(
        (comment) => new Date(comment.created_at).getTime() >= todayStart
      ).length;

      const yesterdayComments = user.comments.filter(
        (comment) =>
          new Date(comment.created_at).getTime() >= yesterdayStart &&
          new Date(comment.created_at).getTime() < todayStart
      ).length;

      const trend =
        todayComments > yesterdayComments
          ? 'higher'
          : todayComments < yesterdayComments
          ? 'lower'
          : 'neutral';

      return {
        id: user.id,
        name: `${user.first_name} ${user.last_name}`,
        country: {
          code: user.country,
          // name: getCountryName(user.country),
          name:
            user.country == 'CA'
              ? 'Canada'
              : user.country === 'MX'
              ? 'Mexico'
              : 'United State',
        },
        avatar: user.avatar,
        comments: user.comments,
        comment_activity: {
          comments_today: todayComments,
          trend: trend,
        },
      };
    });

    return NextResponse.json(transformedUsers);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.error();
  }
}

// Example helper function to get country name from code
const getCountryName = (code: 'US' | 'CA' | 'MX') => {
  const countryMap: Record<'US' | 'CA' | 'MX', string> = {
    US: 'United States',
    CA: 'Canada',
    MX: 'Mexico',
  };
  return countryMap[code];
};
