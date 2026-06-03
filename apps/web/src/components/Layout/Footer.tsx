import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-midnight-abyss py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2">
              <span className="font-aeonikpro text-xl font-bold tracking-tight text-ghost-white">
                AILA
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-comet/60">
              The next generation of autonomous robotic intelligence. Building the future of human-AI collaboration.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-ghost-white">Platform</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#verticals" className="text-sm text-comet/60 hover:text-ghost-white transition-colors">Verticals</a></li>
              <li><a href="#about" className="text-sm text-comet/60 hover:text-ghost-white transition-colors">How it Works</a></li>
              <li><a href="#story" className="text-sm text-comet/60 hover:text-ghost-white transition-colors">Platform Story</a></li>
              <li><a href="#demo" className="text-sm text-comet/60 hover:text-ghost-white transition-colors">Get Started</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-ghost-white">Company</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-sm text-comet/60 hover:text-ghost-white transition-colors">About</a></li>
              <li><a href="#" className="text-sm text-comet/60 hover:text-ghost-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-sm text-comet/60 hover:text-ghost-white transition-colors">Careers</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-ghost-white">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-sm text-comet/60 hover:text-ghost-white transition-colors">Privacy</a></li>
              <li><a href="#" className="text-sm text-comet/60 hover:text-ghost-white transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-white/5 pt-8">
          <p className="text-xs text-comet/40">
            © {currentYear} AILA Robotics. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
