import React, { useState } from 'react';

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

interface TableProps {
  data: User[];
}

const Table: React.FC<TableProps> = ({ data }) => {
  // Pagination settings
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total number of pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Calculate the data to display on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  // Change page
  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Generate page numbers for pagination
  const generatePageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <div className='overflow-x-auto p-4'>
      <table className='min-w-full border border-gray-200 rounded-lg shadow-md'>
        <thead>
          <tr className='bg-gray-100 text-gray-800'>
            <th className='py-3 px-4 border-b text-left'>Name</th>
            <th className='py-3 px-4 border-b text-left'>Country</th>
            <th className='py-3 px-4 border-b text-center'>Comment Activity</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((user) => {
            const { trend = 'neutral', comments_today = 0 } =
              user.comment_activity || {};

            return (
              <tr key={user.id} className='hover:bg-gray-800'>
                <td className='py-2 px-4 border-b flex items-center'>
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className='w-10 h-10 rounded-lg mr-3'
                  />
                  {user.name}
                </td>
                <td className='py-2 px-4 border-b'>{user.country.name}</td>
                <td className='py-2 px-4 border-b text-center'>
                  <span
                    style={{
                      color:
                        trend === 'higher'
                          ? 'green'
                          : trend === 'lower'
                          ? 'red'
                          : 'white',
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

      <div className='flex flex-col items-center mt-4'>
        <div className='flex items-center mb-2'>
          <button
            className='px-4 py-2 border rounded-md hover:bg-gray-300'
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {generatePageNumbers().map((number) => (
            <button
              key={number}
              className={`px-4 py-2 border rounded-md ${
                number === currentPage ? 'bg-gray-800' : 'hover:bg-gray-800'
              }`}
              onClick={() => goToPage(number)}
            >
              {number}
            </button>
          ))}
          <button
            className='px-4 py-2 border rounded-md hover:bg-gray-300'
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
        <span>
          Page {currentPage} of {totalPages}
        </span>
      </div>
    </div>
  );
};

export default Table;
