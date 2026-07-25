import { BarChart3, TrendingUp, Users, Heart, Share2, MousePointerClick } from "lucide-react";

export default function AnalyticsView() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white dark:text-slate-100">Analytics</h1>
        <p className="text-slate-500 dark:text-slate-400">Track the performance and engagement of your social content.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Total Audience", val: "14.2K", inc: "+5.2%", icon: Users, color: "text-blue-500", bg: "bg-blue-100" },
          { title: "Total Engagement", val: "84.5K", inc: "+12.1%", icon: Heart, color: "text-pink-500", bg: "bg-pink-100" },
          { title: "Content Reach", val: "2.4M", inc: "+4.3%", icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-100" },
          { title: "Link Clicks", val: "1,204", inc: "+1.2%", icon: MousePointerClick, color: "text-amber-500", bg: "bg-amber-100" }
        ].map(metric => (
          <div key={metric.title} className="bg-white dark:bg-zinc-900/50 backdrop-blur-md/50 dark:backdrop-blur-md p-5 rounded-xl border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">{metric.title}</h3>
              <div className={`h-8 w-8 rounded-lg ${metric.bg} flex items-center justify-center`}>
                <metric.icon className={`h-4 w-4 ${metric.color}`} />
              </div>
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-900 dark:text-white dark:text-slate-100">{metric.val}</p>
              <p className="text-xs text-emerald-500 font-medium mt-1">{metric.inc} from last month</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md/50 dark:backdrop-blur-md rounded-xl border border-slate-200 dark:border-zinc-800 shadow-sm p-12 flex flex-col items-center justify-center text-center">
        <div className="h-16 w-16 bg-slate-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-4 text-slate-400 dark:text-slate-500 dark:text-slate-500">
          <BarChart3 className="h-8 w-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white dark:text-slate-100">Detailed Metrics Coming Soon</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-md">The detailed breakdown charts are currently being generated based on your newly synced accounts. Check back shortly!</p>
      </div>
    </div>
  );
}
