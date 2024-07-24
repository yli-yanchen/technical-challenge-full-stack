'use client';

import React, { useEffect, useState } from 'react';
import Table from './components/Table';
import ErrorHandler from './components/ErrorHandler';

interface User {
  id: number;
  name: string;
  country: {
    code: string;
    name: string;
  };
  createdAt: string;
  avatar: string;
  comment_activity: {
    comments_today: number;
    trend: 'higher' | 'lower' | 'neutral';
  };
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [countryFilter, setCountryFilter] = useState<string>('');
  const [activityFilter, setActivityFilter] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('member'); // Default sort by member
  const [error, setError] = useState<string | null>(null); // State for error message

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const queryParams = new URLSearchParams({
          country: countryFilter,
          activity: activityFilter,
          sortby: sortBy,
        }).toString();

        const response = await fetch(`/api/filteruser?${queryParams}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('>>> fetched data from backend: ', data);
        setUsers(data);
        setError(null);
      } catch (error) {
        console.error('Failed to fetch users:', error);
        setError('Failed to fetch users. Please try again later.');
      }
    };

    fetchUsers();
  }, [countryFilter, activityFilter, sortBy]);

  return (
    <main className='flex min-h-screen flex-row justify-start m-8 p-8'>
      <section className='min-h-screen w-1/3 m-2 p-2 justify-start shadow-lg bg-neutral-800'>
        <h1 className='text-xl font-bold m-4'>Filters</h1>
        <div className='m-4'>
          <h2 className='mt-4'>Country</h2>
          <select
            value={countryFilter}
            onChange={(e) => setCountryFilter(e.target.value)}
            className='block w-full p-2 border bg-black border-gray-300 rounded mb-4'
          >
            <option value=''>All Countries</option>
            <option value='US'>United States</option>
            <option value='MX'>Mexico</option>
            <option value='CA'>Canada</option>
          </select>
          <h2 className='mt-4'>Comment Activity Trend</h2>
          <select
            value={activityFilter}
            onChange={(e) => setActivityFilter(e.target.value)}
            className='block w-full p-2 border bg-black border-gray-300 rounded mb-4'
          >
            <option value=''>All Trends</option>
            <option value='higher'>Higher</option>
            <option value='lower'>Lower</option>
            <option value='neutral'>Neutral</option>
          </select>
        </div>
      </section>

      <section className='min-h-screen flex flex-col w-2/3 m-2 p-2 shadow-lg bg-neutral-800'>
        <div className='p-4 flex justify-end'>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className='block w-auto p-2 border bg-black border-gray-300 rounded mb-4'
          >
            <option value='member'>Member Since</option>
            <option value='activity'>Comment Activity</option>
          </select>
        </div>

        <ErrorHandler message={error} />

        <Table data={users} />
      </section>
    </main>
  );
}
