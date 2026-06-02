const fs = require('fs');
const path = require('path');

const viewsDir = path.join(__dirname, 'apps/web/src/components/social/views');
const files = fs.readdirSync(viewsDir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(viewsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Skip DashboardView if already processed, but these replacements are safe to run again
  // if they don't already have dark: variants right next to them
  
  // We'll use a regex that matches the class ONLY IF it's not already followed by dark:
  const replaceSafe = (str, regex, replacement) => {
     return str.replace(regex, (match, p1) => {
        if (p1.includes('dark:')) return match; // already handled
        return replacement;
     });
  };

  // Simple string replace is risky if run multiple times, so we'll just do it carefully.
  // Actually, since I only ran it on DashboardView, let's just skip DashboardView.
  if (file === 'DashboardView.tsx') continue;

  content = content.replace(/bg-white/g, 'bg-white dark:bg-zinc-900/50 dark:backdrop-blur-md');
  content = content.replace(/text-slate-900/g, 'text-slate-900 dark:text-slate-100');
  content = content.replace(/text-slate-800/g, 'text-slate-800 dark:text-slate-200');
  content = content.replace(/text-slate-700/g, 'text-slate-700 dark:text-slate-300');
  content = content.replace(/text-slate-600/g, 'text-slate-600 dark:text-slate-300');
  content = content.replace(/text-slate-500/g, 'text-slate-500 dark:text-slate-400');
  content = content.replace(/border-slate-200/g, 'border-slate-200 dark:border-zinc-800');
  content = content.replace(/bg-slate-50/g, 'bg-slate-50 dark:bg-zinc-800/50');
  content = content.replace(/border-slate-100/g, 'border-slate-100 dark:border-zinc-800');
  content = content.replace(/bg-slate-100/g, 'bg-slate-100 dark:bg-zinc-800');
  content = content.replace(/bg-slate-200/g, 'bg-slate-200 dark:bg-zinc-700');

  fs.writeFileSync(filePath, content);
  console.log(`Fixed ${file} dark mode classes!`);
}
