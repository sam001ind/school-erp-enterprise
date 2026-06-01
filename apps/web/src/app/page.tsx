import Link from "next/link";

export default function Home() {
  const modules = [
    { name: "Website Builder", path: "/website", icon: "🌐", color: "from-cyan-400 to-blue-600", stats: "3 Pages Live" },
    { name: "Communications", path: "/communications", icon: "💬", color: "from-sky-400 to-blue-600", stats: "API Active" },
    { name: "Admissions", path: "/admissions", icon: "🎓", color: "from-red-500 to-rose-600", stats: "15 Pending" },
    { name: "Attendance", path: "/attendance", icon: "📅", color: "from-blue-500 to-indigo-600", stats: "92% Avg" },
    { name: "Examinations", path: "/examinations", icon: "📝", color: "from-indigo-500 to-purple-600", stats: "Mid-Terms Active" },
    { name: "Fee Collection", path: "/fees", icon: "💰", color: "from-emerald-400 to-green-600", stats: "2 Due Invoices" },
    { name: "Hostel", path: "/hostel", icon: "🏨", color: "from-orange-400 to-amber-600", stats: "Room 204" },
    { name: "Leave", path: "/leave", icon: "🏖️", color: "from-teal-400 to-cyan-600", stats: "0 Pending" },
    { name: "Library", path: "/library", icon: "📚", color: "from-fuchsia-500 to-pink-600", stats: "0 Borrowed" },
    { name: "Payroll", path: "/payroll", icon: "💵", color: "from-lime-500 to-green-600", stats: "Next: Oct 30" },
    { name: "Transport", path: "/transport", icon: "🚌", color: "from-yellow-400 to-orange-500", stats: "Unallocated" },
    { name: "SocialHub Enterprise", path: "http://localhost:3001", icon: "📱", color: "from-indigo-400 to-purple-600", stats: "SMMP Active" },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-8 sm:p-20 font-sans relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500/10 blur-[120px] pointer-events-none" />

      <header className="max-w-6xl mx-auto mb-16 text-center relative z-10">
        <div className="inline-block px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold text-sm mb-6 border border-blue-100 dark:border-blue-800">
          Enterprise Edition 2.0
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-6">
          My Institution
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
          Your centralized hub for academic, administrative, and campus operations.
        </p>
      </header>

      <main className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {modules.map((mod) => (
            <Link 
              key={mod.name} 
              href={mod.path}
              className="group relative overflow-hidden rounded-3xl bg-white/70 dark:bg-zinc-900/50 backdrop-blur-md p-6 shadow-sm border border-white dark:border-zinc-800 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 flex flex-col justify-between min-h-[220px]"
            >
              {/* Animated Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${mod.color} opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-14 h-14 flex items-center justify-center rounded-2xl text-2xl bg-gradient-to-br ${mod.color} text-white shadow-lg shadow-${mod.color.split('-')[1]}/30 transform group-hover:scale-110 transition-transform duration-500`}>
                    {mod.icon}
                  </div>
                  <div className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full text-xs font-semibold text-zinc-600 dark:text-zinc-300">
                    {mod.stats}
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-zinc-900 group-hover:to-zinc-500 dark:group-hover:from-white dark:group-hover:to-zinc-400 transition-all duration-300">
                  {mod.name}
                </h2>
              </div>
              
              <div className="relative z-10 flex items-center text-sm font-medium text-zinc-500 dark:text-zinc-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Explore Module
                <span className="ml-2 transform translate-x-0 group-hover:translate-x-2 transition-transform duration-300">→</span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
