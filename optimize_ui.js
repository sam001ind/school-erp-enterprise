const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('./apps/web/src');
let changedFiles = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Replace heavy blurs
  content = content.replace(/blur-\[120px\]/g, 'blur-3xl opacity-30');
  
  // Replace heavy backdrop blurs with lighter versions
  content = content.replace(/backdrop-blur-2xl/g, 'backdrop-blur-md');
  content = content.replace(/backdrop-blur-xl/g, 'backdrop-blur-md');
  
  // Replace dark:backdrop-blur-md with dark:backdrop-blur-sm if needed, 
  // actually just backdrop-blur-md is fine, let's remove dark:backdrop-blur-md redundancy
  // content = content.replace(/dark:backdrop-blur-md/g, 'dark:backdrop-blur-sm');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    changedFiles++;
    console.log('Optimized: ' + file);
  }
});

console.log(`Optimization complete. Changed ${changedFiles} files.`);
