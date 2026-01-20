import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  shadow?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  shadow = true,
}) => {
  const shadowClass = shadow ? 'shadow-md' : '';
  
  return (
    <div
      className={`bg-white rounded-xl p-6 ${shadowClass} ${className}`}
    >
      {children}
    </div>
  );
};
