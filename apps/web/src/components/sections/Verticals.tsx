import React from 'react';
import { GlassyCard } from '../cards/GlassyCard';
import { ShoppingBag, Shield, Search } from 'lucide-react';

export const Verticals: React.FC = () => {
  const industries = [
    {
      title: 'Retail & Service',
      description: 'Engage customers in restaurants, hospitals, and event venues with autonomous guidance.',
      icon: ShoppingBag,
    },
    {
      title: 'Search & Rescue',
      description: 'Deploy AILA in challenging environments for modular assistance and visual reconnaissance.',
      icon: Search,
    },
    {
      title: 'Defense',
      description: 'Advanced physical-digital interaction for mission-critical operations and logistics.',
      icon: Shield,
    },
  ];

  return (
    <section id="verticals" className="relative z-20 px-6 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-display font-aeonikpro text-ghost-white mb-4">
            Adaptive Intelligence for Every Industry
          </h2>
          <p className="text-subheading text-comet max-w-2xl mx-auto">
            AILA's modular architecture allows it to adapt to diverse physical environments and business objectives.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {industries.map((industry) => (
            <GlassyCard key={industry.title} className="flex flex-col items-start gap-4 hover:border-neon-violet/50 transition-colors">
              <div className="w-12 h-12 rounded-full bg-neon-violet/10 flex items-center justify-center text-neon-violet">
                <industry.icon size={24} />
              </div>
              <h3 className="text-heading font-aeonikpro text-ghost-white">{industry.title}</h3>
              <p className="text-body text-comet">{industry.description}</p>
            </GlassyCard>
          ))}
        </div>
      </div>
    </section>
  );
};
