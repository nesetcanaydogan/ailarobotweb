import Shell from './components/Layout/Shell';

function App() {
  return (
    <Shell>
      <div className="flex flex-col items-center justify-center py-20">
        <h1 className="text-display-xl font-aeonikpro text-ghost-white mb-4">
          Welcome to AILA
        </h1>
        <p className="text-subheading text-comet max-w-2xl text-center">
          Experience the future of autonomous intelligence. Your dashboard is ready for deployment.
        </p>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {[
            { title: 'System Status', value: 'Operational', color: 'text-green-400' },
            { title: 'Active Agents', value: '12', color: 'text-neon-violet' },
            { title: 'Uptime', value: '99.9%', color: 'text-azure-glow' },
          ].map((stat) => (
            <div key={stat.title} className="bg-white/5 border border-white/10 rounded-cards p-6 backdrop-blur-sm">
              <p className="text-caption uppercase tracking-widest text-comet/40 mb-2">{stat.title}</p>
              <p className={`text-heading-lg font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </Shell>
  );
}

export default App;
