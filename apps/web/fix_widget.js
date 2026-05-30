const fs = require('fs');
const file = '/Users/abhijitht/.gemini/antigravity/scratch/enterprise-app/apps/web/src/app/site/[pageId]/page.tsx';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(
  'className="fixed top-4 right-4 z-[100] bg-white dark:bg-zinc-900 shadow-xl rounded-full border border-zinc-200 dark:border-zinc-800 p-1 flex items-center"',
  'className="fixed bottom-6 left-6 z-[100] bg-white dark:bg-zinc-900 shadow-xl rounded-full border border-zinc-200 dark:border-zinc-800 p-1 flex items-center"'
);

fs.writeFileSync(file, code);
console.log('Fixed widget location!');
