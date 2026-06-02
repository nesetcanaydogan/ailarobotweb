import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'w-full bg-[rgba(199,211,234,0.06)] border border-white/20 text-white rounded-inputs px-4 py-2 outline-none focus:border-celestial-light transition-colors placeholder:text-whisper-blue text-body',
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
