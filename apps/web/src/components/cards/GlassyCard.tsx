import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface GlassyCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const GlassyCard: React.FC<GlassyCardProps> = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        'bg-[rgba(186,214,247,0.03)] backdrop-blur-xl border border-white/10 rounded-cards shadow-glass p-6',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
