import React from 'react';
import { Button } from '../ui/Button';
import { ArrowRight, Play } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative flex flex-col items-center text-center py-24 px-4 gap-12 overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-celestial-light/5 blur-[120px] rounded-full -z-10" />
      
      <div className="flex flex-col gap-6 max-w-4xl">
        <h1 className="font-aeonikpro text-display-xl text-ghost-white leading-tight tracking-tight">
          The First Truly <span className="text-celestial-light">Autonomous</span> Robotic Companion
        </h1>
        <p className="font-untitled-sans text-subheading text-comet max-w-2xl mx-auto">
          AILA combines advanced RAG, physical interaction, and modular intelligence to redefine how we live and work.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button variant="solid" size="lg" className="gap-2">
          Get Started <ArrowRight className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="lg" className="gap-2">
          Watch Demo <Play className="w-4 h-4 fill-current" />
        </Button>
      </div>
    </section>
  );
}
