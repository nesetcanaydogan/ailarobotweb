import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface ShellProps {
  children: React.ReactNode;
}

const Shell: React.FC<ShellProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col bg-midnight-abyss font-untitled-sans text-comet">
      <Navbar />
      <main className="flex-grow">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Shell;
