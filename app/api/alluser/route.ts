import { NextResponse } from 'next/server';
import prisma from '../../../prisma/prisma';

// for data fetching test, get all data from database
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: {
        comments: true,
      },
    });
    // console.log('>>> First 10 users:', users.slice(0, 5));
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
