const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'apps/web/src/components/social/views/DashboardView.tsx');
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/bg-white/g, 'bg-white dark:bg-zinc-900/50 dark:backdrop-blur-md');
content = content.replace(/text-slate-900/g, 'text-slate-900 dark:text-slate-100');
content = content.replace(/text-slate-500/g, 'text-slate-500 dark:text-slate-400');
content = content.replace(/text-slate-600/g, 'text-slate-600 dark:text-slate-300');
content = content.replace(/border-slate-200/g, 'border-slate-200 dark:border-zinc-800');
content = content.replace(/bg-slate-50/g, 'bg-slate-50 dark:bg-zinc-800/50');
content = content.replace(/border-slate-100/g, 'border-slate-100 dark:border-zinc-800');
content = content.replace(/bg-slate-200/g, 'bg-slate-200 dark:bg-zinc-800');

fs.writeFileSync(file, content);
console.log('Fixed DashboardView dark mode classes!');
