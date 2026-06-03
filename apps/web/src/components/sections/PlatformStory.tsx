import React from 'react';
import { GlassyCard } from '../cards/GlassyCard';
import { Database, Network, Bot } from 'lucide-react';

export const PlatformStory: React.FC = () => {
  return (
    <section id="story" className="relative z-20 px-6 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-display font-aeonikpro text-ghost-white mb-6">
              More than a Robot. <br />
              <span className="text-neon-violet">An Agentic Platform.</span>
            </h2>
            <p className="text-subheading text-comet mb-8">
              AILA isn't just hardware. It's the physical manifestation of your enterprise intelligence, 
              powered by a sophisticated Agentic RAG backend that learns and adapts to your specific business needs.
            </p>
            
            <div className="space-y-6">
              {[
                {
                  title: 'Secure Enterprise Data',
                  desc: 'Connect your internal knowledge base securely via RAG.',
                  icon: Database
                },
                {
                  title: 'Low-latency Inference',
                  desc: 'Hybrid edge-cloud processing for instant reactions.',
                  icon: Network
                },
                {
                  title: 'Autonomous Evolution',
                  desc: 'AILA improves its interaction patterns based on real-world feedback.',
                  icon: Bot
                }
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-neon-violet/10 flex items-center justify-center text-neon-violet">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <h4 className="text-body font-aeonikpro text-ghost-white font-bold">{item.title}</h4>
                    <p className="text-small text-comet">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <GlassyCard className="aspect-square flex items-center justify-center border-dashed border-2">
              <div className="text-center text-comet/20">
                <p className="uppercase tracking-[0.2em] text-sm mb-2">Technical Schematic</p>
                <div className="w-48 h-1 bg-gradient-to-r from-transparent via-neon-violet/20 to-transparent"></div>
              </div>
            </GlassyCard>
            {/* Background Glow */}
            <div className="absolute -inset-4 bg-neon-violet/5 blur-3xl rounded-full -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
