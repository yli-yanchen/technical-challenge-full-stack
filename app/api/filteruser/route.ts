import { NextResponse } from 'next/server';
import prisma from '../../../prisma/prisma';

export async function GET(request: Request) {
  try {
    // url: /api/filteruser?country=canada&activity=high&sortby=member

    const url = new URL(request.url);
    const countryFilter = url.searchParams.get('country') || '';
    const activityFilter = url.searchParams.get('activity') || '';
    const sortBy = url.searchParams.get('sortby') || 'member'; // Default sort by member

    // Base query for fetching users
    const baseQuery = {
      include: {
        comments: true,
      },
    };

    // Fetch users based on base query
    let users = await prisma.user.findMany(baseQuery);

    // const commentStats = await prisma.comment.aggregate({
    //   _min: { comments_today: true },
    //   _max: { comments_today: true },
    // });

    // Transform the data to match the expected format
    const today = new Date();
    const todayStart = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    ).getTime();
    const yesterdayStart = todayStart - 24 * 60 * 60 * 1000;

    const transformedUsers = users.map((user) => {
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
          name:
            user.country === 'CA'
              ? 'Canada'
              : user.country === 'MX'
              ? 'Mexico'
              : 'United States',
        },
        created_at: user.created_at,
        avatar: user.avatar,
        comments: user.comments,
        comment_activity: {
          comments_today: todayComments,
          trend: trend,
        },
      };
    });

    // Apply filters to transformed data
    const filteredUsers = transformedUsers.filter((user) => {
      const countryMatch = countryFilter
        ? user.country.code === countryFilter
        : true;

      // console.log('>>> countryFilter: ', countryFilter);
      // console.log('>>> user.country.name: ', user.country.name);
      // console.log('>>> user.country.code: ', user.country.code);

      const activityMatch = activityFilter
        ? user.comment_activity.trend === activityFilter
        : true;
      return countryMatch && activityMatch;
    });

    // Sort data based on sortBy parameter
    const sortedUsers = filteredUsers.sort((a, b) => {
      switch (sortBy) {
        case 'activity':
          return (
            b.comment_activity.comments_today -
            a.comment_activity.comments_today
          );
        case 'member':
        default:
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
      }
    });

    return NextResponse.json(sortedUsers);
  } catch (error) {
    console.error('Error fetching users:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
