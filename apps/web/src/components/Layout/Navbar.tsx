import React from 'react';
import { Bot, Menu, Search, User } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-midnight-abyss/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Bot className="h-8 w-8 text-neon-violet" />
          <span className="font-aeonikpro text-xl font-bold tracking-tight text-ghost-white">
            AILA
          </span>
        </div>

        <div className="hidden md:block">
          <div className="flex items-center space-x-8">
            <a href="#" className="text-sm font-medium text-comet transition-colors hover:text-ghost-white">
              Dashboard
            </a>
            <a href="#" className="text-sm font-medium text-comet transition-colors hover:text-ghost-white">
              Agents
            </a>
            <a href="#" className="text-sm font-medium text-comet transition-colors hover:text-ghost-white">
              Analytics
            </a>
            <a href="#" className="text-sm font-medium text-comet transition-colors hover:text-ghost-white">
              Settings
            </a>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="rounded-full p-2 text-comet transition-colors hover:bg-white/5 hover:text-ghost-white">
            <Search className="h-5 w-5" />
          </button>
          <button className="rounded-full p-2 text-comet transition-colors hover:bg-white/5 hover:text-ghost-white">
            <User className="h-5 w-5" />
          </button>
          <button className="md:hidden rounded-full p-2 text-comet transition-colors hover:bg-white/5 hover:text-ghost-white">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
