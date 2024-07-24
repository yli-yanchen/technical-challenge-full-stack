import React, { useState, useCallback } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  User as NextUIUser,
} from '@nextui-org/react';

interface Country {
  code: string;
  name: string;
}

interface CommentActivity {
  comments_today: number;
  trend: 'higher' | 'lower' | 'neutral';
}

interface User {
  id: number;
  name: string;
  country: Country;
  avatar: string;
  comment_activity: CommentActivity;
}

interface UserTableProps {
  data: User[];
}

const getChipColor = (
  trend: 'higher' | 'lower' | 'neutral'
): 'default' | 'success' | 'danger' | 'warning' => {
  switch (trend) {
    case 'higher':
      return 'success';
    case 'lower':
      return 'danger';
    case 'neutral':
      return 'default';
    default:
      return 'default';
  }
};

const UserTable: React.FC<UserTableProps> = ({ data }) => {
  const [page, setPage] = useState(1);
  const headerColnums = ['name', 'country', 'comment activity'];

  const renderCell = useCallback((user: User, columnKey: React.Key) => {
    switch (columnKey) {
      case 'name':
        return (
          <NextUIUser
            avatarProps={{ radius: 'lg', src: user.avatar }}
            description={user.name}
            name={user.name}
          >
            {user.name}
          </NextUIUser>
        );
      case 'country':
        return (
          <div className='flex flex-col'>
            <p className='text-bold text-small capitalize'>
              {user.country.code}
            </p>
            <p className='text-bold text-tiny capitalize text-default-400'>
              {user.country.name}
            </p>
          </div>
        );
      case 'comment activity':
        return (
          <Chip
            className='capitalize'
            color={getChipColor(user.comment_activity.trend)}
            size='sm'
            variant='flat'
          >
            {user.comment_activity.comments_today} (
            {user.comment_activity.trend})
          </Chip>
        );
      default:
        return null; // No default cell rendering
    }
  }, []);

  return (
    <Table>
      <TableHeader>
        {headerColnums.map((column, index) => (
          <TableColumn key={index}>{column}</TableColumn>
        ))}
      </TableHeader>
      <TableBody emptyContent={'No users found'}>
        {data.map((user) => (
          <TableRow key={user.id}>
            {headerColnums.map((columnKey) => (
              <TableCell key={columnKey}>
                {renderCell(user, columnKey)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserTable;
