import React from 'react';

interface ErrorHandlerProps {
  message: string | null;
}

const ErrorHandler: React.FC<ErrorHandlerProps> = ({ message }) => {
  if (!message) return null;

  return <div className='p-4 mb-4 text-red-500'>{message}</div>;
};

export default ErrorHandler;
