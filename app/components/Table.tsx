import React from 'react';

interface Comment {
  id: number;
  user_id: number;
  content: string;
  created_at: string;
}

interface User {
  id: number;
  first_name: string;
  last_name: string;
  country: string;
  avatar: string;
  comments: Comment[];
}

interface TableProps {
  data: User[];
}

const Table: React.FC<TableProps> = ({ data }) => {
  // Calculate comment activity trend
  const calculateCommentActivity = (user: User): [string, number] => {
    const today = new Date();
    const todayStart = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    ).getTime();
    const yesterdayStart = todayStart - 24 * 60 * 60 * 1000;

    // Count today's comments
    const todayComments = user.comments.filter(
      (comment) => new Date(comment.created_at).getTime() >= todayStart
    ).length;

    // Count yesterday's comments
    const yesterdayComments = user.comments.filter(
      (comment) =>
        new Date(comment.created_at).getTime() >= yesterdayStart &&
        new Date(comment.created_at).getTime() < todayStart
    ).length;

    // Determine the trend
    const trend =
      todayComments > yesterdayComments
        ? 'higher'
        : todayComments < yesterdayComments
        ? 'lower'
        : 'neutral';

    return [trend, todayComments];
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Country</th>
          <th>Comment Activity</th>
        </tr>
      </thead>
      <tbody>
        {data.map((user) => {
          const [trend, todayComments] = calculateCommentActivity(user);
          return (
            <tr key={user.id}>
              <td className='flex flex-row'>
                <img
                  src={user.avatar}
                  alt={`${user.first_name} ${user.last_name}`}
                  style={{ width: 40, height: 40 }}
                />
                {user.first_name} {user.last_name}
              </td>
              <td>{user.country}</td>
              <td>
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
                  {todayComments}
                </span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
