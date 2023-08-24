/* eslint-disable react/prop-types */
import React from 'react';
import { cva } from 'class-variance-authority';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { cn } from '../../common/utils';

const buttonVariants = cva(
  'active:scale-95 inline-flex items-center justify-center rounded-md text-[1.6rem] font-medium transition-color focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-amber-500 text-white hover:bg-amber-400',
        ghost: 'bg-transparent hover:text-slate-900 hover:bg-amber-100',
      },
      size: {
        default: 'h-10 py-8 px-6',
        sm: 'h-9 px-2',
        lg: 'h-11 px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const Button = ({
  className,
  children,
  variant,
  isLoading,
  size,
  ...props
}) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={isLoading}
      {...props}>
      {isLoading ? (
        <FontAwesomeIcon icon={faSpinner} spin className="mr-2 h-8 w-8" />
      ) : null}
      {children}
    </button>
  );
};

export default Button;
