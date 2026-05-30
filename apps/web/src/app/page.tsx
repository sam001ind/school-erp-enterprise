import Link from "next/link";

export default function Home() {
  const modules = [
    { name: "Attendance", path: "/attendance", icon: "📅", color: "bg-blue-500" },
    { name: "Examinations", path: "/examinations", icon: "📝", color: "bg-indigo-500" },
    { name: "Fee Collection", path: "/fees", icon: "💰", color: "bg-green-500" },
    { name: "Hostel Management", path: "/hostel", icon: "🏨", color: "bg-orange-500" },
    { name: "Leave Management", path: "/leave", icon: "🏖️", color: "bg-teal-500" },
    { name: "Library", path: "/library", icon: "📚", color: "bg-purple-500" },
    { name: "Payroll", path: "/payroll", icon: "💵", color: "bg-emerald-500" },
    { name: "Transport", path: "/transport", icon: "🚌", color: "bg-yellow-500" },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-8 sm:p-20 font-sans">
      <header className="max-w-5xl mx-auto mb-16 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
          School ERP <span className="text-blue-600">Enterprise</span>
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400">
          Centralized management system for all campus operations.
        </p>
      </header>

      <main className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {modules.map((mod) => (
            <Link 
              key={mod.name} 
              href={mod.path}
              className="group relative overflow-hidden rounded-3xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className={`w-14 h-14 flex items-center justify-center rounded-2xl text-2xl mb-5 ${mod.color} text-white shadow-inner`}>
                {mod.icon}
              </div>
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {mod.name}
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Access and manage {mod.name.toLowerCase()} operations, records, and reports.
              </p>
              
              <div className="absolute bottom-6 right-6 w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center opacity-0 transform translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                →
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
