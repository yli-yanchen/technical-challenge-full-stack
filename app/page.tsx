'use client';

import React, { useEffect, useState } from 'react';
import Table from './components/table';
// import UserTable from './components/userTable';

interface User {
  id: number;
  name: string;
  country: {
    code: string;
    name: string;
  };
  avatar: string;
  comment_activity: {
    comments_today: number;
    trend: 'higher' | 'lower' | 'neutral';
  };
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('>>> fetched data from backend: ', data);
        setUsers(data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <main className='flex min-h-screen flex-row justify-start m-8 p-8'>
      <section className='min-h-screen w-1/3 m-2 p-2 justify-start shadow-lg bg-neutral-800'>
        <h1 className='text-xl font-bold m-4'>Filters</h1>
        <div className='m-4'>
          <h2 className='mt-4'>Country</h2>
          <select className='block w-full p-2 border bg-black border-gray-300 rounded mb-4'>
            <option value=''></option>
            <option value='usa'>United States of America</option>
            <option value='mexico'>Mexico</option>
            <option value='canada'>Canada</option>
          </select>
          <h2 className='mt-4'>Comment Activity Trend</h2>
          <select className='block w-full p-2 border bg-black border-gray-300 rounded mb-4'>
            <option value=''></option>
            <option value='higher'>Higher</option>
            <option value='lower'>Lower</option>
            <option value='neutral'>Neutral</option>
          </select>
        </div>
      </section>

      <section className='min-h-screen flex flex-col w-2/3 m-2 p-2 shadow-lg bg-neutral-800'>
        <div className='w-36 m-4 flex justify-end'>
          <select className='block w-full p-2 border bg-black border-gray-300 rounded mb-4'>
            <option value='sortby'>Sort By</option>
            <option value='member'>Member Since</option>
            <option value='activity'>Comment Activity</option>
          </select>
        </div>

        <Table data={users} />
        {/* <UserTable data={users} /> */}
      </section>
    </main>
  );
}
