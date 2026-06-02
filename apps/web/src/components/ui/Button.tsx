import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'solid';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
      primary: 'bg-[rgba(186,214,247,0.06)] text-white shadow-subtle-3 hover:bg-[rgba(186,214,247,0.1)] transition-colors',
      outline: 'bg-transparent border border-[rgba(186,215,247,0.12)] text-arctic-mist hover:bg-[rgba(186,215,247,0.04)] transition-colors shadow-subtle',
      solid: 'bg-neon-violet text-white hover:bg-neon-violet/90 transition-colors shadow-md',
    };

    const sizes = {
      sm: 'px-3 py-1 text-caption',
      md: 'px-4 py-2 text-body',
      lg: 'px-6 py-3 text-body-lg',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium rounded-full outline-none focus-visible:ring-2 focus-visible:ring-celestial-light disabled:opacity-50 disabled:pointer-events-none',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
