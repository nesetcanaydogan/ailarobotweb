import Shell from './components/Layout/Shell';
import { Hero } from './components/sections/Hero';
import { LeadForm } from './components/forms/LeadForm';
import { Scene } from './components/3d/Scene';
import { useScrollTimeline } from './hooks/useScrollTimeline';
import React from 'react';

function App() {
  // Initialize the master scroll timeline
  useScrollTimeline();

  return (
    <>
      <Scene />
      <div id="main-container">
        <Shell>
          <div className="flex flex-col gap-24 pb-24">
            <Hero />
            
            <section id="demo" className="flex flex-col items-center gap-12">
              <div className="text-center max-w-2xl">
                <h2 className="text-display font-aeonikpro text-ghost-white mb-4">
                  Ready to meet AILA?
                </h2>
                <p className="text-subheading text-comet">
                  Join the waitlist for exclusive access to the first production batch and early developer kits.
                </p>
              </div>
              <LeadForm />
            </section>
          </div>
        </Shell>
      </div>
    </>
  );
}

export default App;
