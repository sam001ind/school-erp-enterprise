const fs = require('fs');
const path = require('path');

const targetDirs = [
  path.join(__dirname, 'apps/web/src/app/(dashboard)'),
  path.join(__dirname, 'apps/web/src/components')
];

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach(function(file) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      if (fullPath.endsWith('.tsx') || fullPath.endsWith('.jsx')) {
        arrayOfFiles.push(fullPath);
      }
    }
  });
  return arrayOfFiles;
}

let allFiles = [];
targetDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    allFiles = getAllFiles(dir, allFiles);
  }
});

const replaceSafe = (str, regex, replacement) => {
  return str.replace(regex, (match, p1) => {
    // If it's already got dark: right after, skip it.
    // Also, if the string already contains the replacement anywhere nearby, it might be tricky, 
    // but a simple regex works fine for isolated class names.
    return replacement;
  });
};

let filesModified = 0;

allFiles.forEach(file => {
  let original = fs.readFileSync(file, 'utf8');
  let content = original;

  // Luminous Component Backgrounds
  content = content.replace(/(?<!dark:)bg-white/g, 'bg-white dark:bg-zinc-900/50 backdrop-blur-md');
  
  // Modals & Panels
  content = content.replace(/(?<!dark:)bg-zinc-50/g, 'bg-zinc-50 dark:bg-zinc-950');
  content = content.replace(/(?<!dark:)bg-slate-50/g, 'bg-slate-50 dark:bg-zinc-900/40');
  content = content.replace(/(?<!dark:)bg-slate-100/g, 'bg-slate-100 dark:bg-zinc-800');
  content = content.replace(/(?<!dark:)bg-zinc-100/g, 'bg-zinc-100 dark:bg-zinc-800');

  // Borders
  content = content.replace(/(?<!dark:)border-slate-200/g, 'border-slate-200 dark:border-zinc-800');
  content = content.replace(/(?<!dark:)border-zinc-200/g, 'border-zinc-200 dark:border-zinc-800');
  content = content.replace(/(?<!dark:)border-slate-100/g, 'border-slate-100 dark:border-zinc-800');

  // Text High Contrast
  content = content.replace(/(?<!dark:)text-slate-900/g, 'text-slate-900 dark:text-white');
  content = content.replace(/(?<!dark:)text-slate-800/g, 'text-slate-800 dark:text-slate-200');
  content = content.replace(/(?<!dark:)text-zinc-900/g, 'text-zinc-900 dark:text-white');
  content = content.replace(/(?<!dark:)text-zinc-800/g, 'text-zinc-800 dark:text-zinc-200');

  // Text Medium Contrast
  content = content.replace(/(?<!dark:)text-slate-700/g, 'text-slate-700 dark:text-slate-300');
  content = content.replace(/(?<!dark:)text-slate-600/g, 'text-slate-600 dark:text-slate-300');
  content = content.replace(/(?<!dark:)text-zinc-700/g, 'text-zinc-700 dark:text-zinc-300');
  content = content.replace(/(?<!dark:)text-zinc-600/g, 'text-zinc-600 dark:text-zinc-300');

  // Text Low Contrast
  content = content.replace(/(?<!dark:)text-slate-500/g, 'text-slate-500 dark:text-slate-400');
  content = content.replace(/(?<!dark:)text-slate-400/g, 'text-slate-400 dark:text-slate-500');
  content = content.replace(/(?<!dark:)text-zinc-500/g, 'text-zinc-500 dark:text-zinc-400');
  
  // Dividers
  content = content.replace(/(?<!dark:)divide-slate-100/g, 'divide-slate-100 dark:divide-zinc-800');
  content = content.replace(/(?<!dark:)divide-slate-200/g, 'divide-slate-200 dark:divide-zinc-800');
  content = content.replace(/(?<!dark:)divide-zinc-100/g, 'divide-zinc-100 dark:divide-zinc-800');
  content = content.replace(/(?<!dark:)divide-zinc-200/g, 'divide-zinc-200 dark:divide-zinc-800');

  // Hover states (Row hovers)
  content = content.replace(/(?<!dark:)hover:bg-slate-50/g, 'hover:bg-slate-50 dark:hover:bg-zinc-800/40');
  content = content.replace(/(?<!dark:)hover:bg-zinc-50/g, 'hover:bg-zinc-50 dark:hover:bg-zinc-800/40');

  // We might accidentally duplicate "dark:bg-zinc-900/50 backdrop-blur-md dark:bg-zinc-900/50 backdrop-blur-md" 
  // if run twice, so let's clean up any obvious duplicates.
  content = content.replace(/dark:bg-zinc-900\/50 backdrop-blur-md dark:bg-zinc-900\/50 backdrop-blur-md/g, 'dark:bg-zinc-900/50 backdrop-blur-md');
  content = content.replace(/dark:text-white dark:text-white/g, 'dark:text-white');
  content = content.replace(/dark:border-zinc-800 dark:border-zinc-800/g, 'dark:border-zinc-800');
  content = content.replace(/dark:bg-zinc-800 dark:bg-zinc-800/g, 'dark:bg-zinc-800');
  content = content.replace(/dark:text-slate-300 dark:text-slate-300/g, 'dark:text-slate-300');
  content = content.replace(/dark:text-slate-400 dark:text-slate-400/g, 'dark:text-slate-400');

  if (content !== original) {
    fs.writeFileSync(file, content);
    filesModified++;
  }
});

console.log(`Polished UI applied to ${filesModified} files.`);
