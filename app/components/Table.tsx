import React from 'react';

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

interface TableProps {
  data: User[];
}

const Table: React.FC<TableProps> = ({ data }) => {
  console.log('Data:', data); // Log data for debugging

  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full border border-gray-200 rounded-lg shadow-md'>
        <thead>
          <tr className='bg-gray-100 text-gray-600'>
            <th className='py-3 px-4 border-b'>Name</th>
            <th className='py-3 px-4 border-b'>Country</th>
            <th className='py-3 px-4 border-b'>Comment Activity</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => {
            // Provide default values in case comment_activity is undefined
            const { trend = 'neutral', comments_today = 0 } =
              user.comment_activity || {};

            return (
              <tr key={user.id} className='hover:bg-gray-800'>
                <td className='py-2 px-4 border-b flex items-center'>
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className='w-10 h-10 rounded-full mr-3'
                  />
                  {user.name}
                </td>
                <td className='py-2 px-4 border-b'>{user.country.name}</td>
                <td className='py-2 px-4 border-b'>
                  <span
                    style={{
                      color:
                        trend === 'higher'
                          ? 'green'
                          : trend === 'lower'
                          ? 'red'
                          : 'gray',
                    }}
                  >
                    {comments_today}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
