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

let filesModified = 0;

allFiles.forEach(file => {
  let original = fs.readFileSync(file, 'utf8');
  let content = original;

  // Cleanup duplicates
  content = content.replace(/dark:bg-zinc-900\/50 backdrop-blur-md dark:bg-zinc-900/g, 'dark:bg-zinc-900/50 backdrop-blur-md');
  content = content.replace(/dark:border-zinc-800 dark:border-zinc-800/g, 'dark:border-zinc-800');
  content = content.replace(/dark:text-white dark:text-white/g, 'dark:text-white');
  content = content.replace(/bg-white dark:bg-zinc-900\/50 backdrop-blur-md dark:bg-zinc-900\/50 backdrop-blur-md/g, 'bg-white dark:bg-zinc-900/50 backdrop-blur-md');

  // Convert gray to slate for consistency
  content = content.replace(/text-gray-900/g, 'text-slate-900');
  content = content.replace(/text-gray-800/g, 'text-slate-800');
  content = content.replace(/text-gray-700/g, 'text-slate-700');
  content = content.replace(/text-gray-600/g, 'text-slate-600');
  content = content.replace(/text-gray-500/g, 'text-slate-500');
  content = content.replace(/text-gray-400/g, 'text-slate-400');
  content = content.replace(/text-gray-300/g, 'text-slate-300');
  content = content.replace(/text-gray-200/g, 'text-slate-200');
  content = content.replace(/text-gray-100/g, 'text-slate-100');
  content = content.replace(/text-gray-50/g, 'text-slate-50');

  content = content.replace(/bg-gray-900/g, 'bg-slate-900');
  content = content.replace(/bg-gray-800/g, 'bg-slate-800');
  content = content.replace(/bg-gray-700/g, 'bg-slate-700');
  content = content.replace(/bg-gray-600/g, 'bg-slate-600');
  content = content.replace(/bg-gray-500/g, 'bg-slate-500');
  content = content.replace(/bg-gray-400/g, 'bg-slate-400');
  content = content.replace(/bg-gray-300/g, 'bg-slate-300');
  content = content.replace(/bg-gray-200/g, 'bg-slate-200');
  content = content.replace(/bg-gray-100/g, 'bg-slate-100');
  content = content.replace(/bg-gray-50/g, 'bg-slate-50');
  
  content = content.replace(/border-gray-100/g, 'border-slate-100');
  content = content.replace(/border-gray-200/g, 'border-slate-200');

  if (content !== original) {
    fs.writeFileSync(file, content);
    filesModified++;
  }
});

console.log(`Cleaned up ${filesModified} files.`);
