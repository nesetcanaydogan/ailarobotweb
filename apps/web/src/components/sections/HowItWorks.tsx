import React from 'react';
import { GlassyCard } from '../cards/GlassyCard';
import { Eye, Cpu, Zap } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      title: 'Perceive',
      description: 'AILA uses multi-modal sensors to map its surroundings and recognize human intent in real-time.',
      icon: Eye,
    },
    {
      title: 'Process',
      description: 'Edge-AI and GPT-4o integration analyze physical context and business data via Agentic RAG.',
      icon: Cpu,
    },
    {
      title: 'Act',
      description: 'Precision actuators and natural speech allow AILA to guide, assist, and interact with the physical world.',
      icon: Zap,
    },
  ];

  return (
    <section id="about" className="relative z-20 px-6 py-24 bg-midnight-abyss/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-display font-aeonikpro text-ghost-white mb-4">
            How AILA Works
          </h2>
          <p className="text-subheading text-comet max-w-2xl mx-auto">
            A seamless bridge between digital intelligence and physical presence.
          </p>
        </div>
        
        <div className="space-y-12">
          {steps.map((step, index) => (
            <div key={step.title} className="flex flex-col md:flex-row items-center gap-12">
              <div className={`flex-1 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                <GlassyCard className="p-8 border-l-4 border-l-neon-violet">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-neon-violet">
                      <step.icon size={32} />
                    </div>
                    <h3 className="text-heading font-aeonikpro text-ghost-white">{step.title}</h3>
                  </div>
                  <p className="text-subheading text-comet">{step.description}</p>
                </GlassyCard>
              </div>
              <div className="flex-1">
                {/* This space is intentionally left for AILA 3D model positioning in later plans */}
                <div className="h-64 flex items-center justify-center border border-white/5 rounded-cards border-dashed text-comet/20 uppercase tracking-widest text-sm">
                  3D Interaction Zone
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
