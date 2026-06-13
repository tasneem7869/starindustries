import React, { forwardRef } from 'react';
import { cn } from './utils';

const buttonVariants = {
  default:
    'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-[#1e3a5f] text-white hover:bg-[#2d5a8f] focus-visible:ring-[#1e3a5f]',
  outline:
    'inline-flex items-center justify-center rounded-md border border-[#1e3a5f] text-sm font-medium text-[#1e3a5f] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1e3a5f] hover:bg-[#1e3a5f]/10 disabled:opacity-50 disabled:pointer-events-none',
  ghost:
    'inline-flex items-center justify-center rounded-md text-sm font-medium text-[#1e3a5f] hover:bg-[#1e3a5f]/10 disabled:opacity-50 disabled:pointer-events-none',
};

export const Button = forwardRef(({ className, variant = 'default', type = 'button', ...props }, ref) => {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(buttonVariants[variant] ?? buttonVariants.default, className)}
      {...props}
    />
  );
});

Button.displayName = 'Button';
