import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const Container: React.FC<ContainerProps> = ({ 
  children, 
  className = '',
  size = 'lg' 
}) => {
  const baseStyles = 'px-4 mx-auto';
  
  const sizeStyles = {
    sm: 'max-w-3xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'w-full',
  };
  
  return (
    <div className={`${baseStyles} ${sizeStyles[size]} ${className}`}>
      {children}
    </div>
  );
};

export default Container;