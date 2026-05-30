const fs = require('fs');
const file = '/Users/abhijitht/.gemini/antigravity/scratch/enterprise-app/apps/web/src/components/builder/SiteBuilder.tsx';
let code = fs.readFileSync(file, 'utf8');

const labelReplacementMap = {
  '<label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-1">Title</label>': 
  '<label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">Title <span className="text-xs font-normal text-zinc-400 ml-1">{builderLanguage === "en" ? "(English)" : "(Malayalam)"}</span></label>',
  
  '<label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-1">Subtitle</label>': 
  '<label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">Subtitle <span className="text-xs font-normal text-zinc-400 ml-1">{builderLanguage === "en" ? "(English)" : "(Malayalam)"}</span></label>',
  
  '<label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-1">Button Text</label>': 
  '<label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">Button Text <span className="text-xs font-normal text-zinc-400 ml-1">{builderLanguage === "en" ? "(English)" : "(Malayalam)"}</span></label>',

  '<label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-1">Text Content</label>': 
  '<label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">Text Content <span className="text-xs font-normal text-zinc-400 ml-1">{builderLanguage === "en" ? "(English)" : "(Malayalam)"}</span></label>',
};

Object.entries(labelReplacementMap).forEach(([oldStr, newStr]) => {
  code = code.split(oldStr).join(newStr);
});

code = code.split('className="w-full bg-white dark:bg-zinc-800 border border-zinc-300').join('className="w-full p-3 text-base bg-white dark:bg-zinc-800 border border-zinc-300');

fs.writeFileSync(file, code);
console.log('Labels updated successfully!');
