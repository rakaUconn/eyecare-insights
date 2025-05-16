import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
  bordered?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  onClick, 
  hoverable = false,
  bordered = true 
}) => {
  const baseStyles = 'bg-white rounded-lg overflow-hidden';
  const borderStyles = bordered ? 'border border-gray-200' : '';
  const shadowStyles = 'shadow-sm';
  const hoverStyles = hoverable 
    ? 'transition-all duration-200 hover:shadow-md hover:-translate-y-1' 
    : '';
  const clickStyles = onClick ? 'cursor-pointer' : '';

  return (
    <div 
      className={`
        ${baseStyles}
        ${borderStyles}
        ${shadowStyles}
        ${hoverStyles}
        ${clickStyles}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;