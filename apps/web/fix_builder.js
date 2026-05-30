const fs = require('fs');
const file = '/Users/abhijitht/.gemini/antigravity/scratch/enterprise-app/apps/web/src/components/builder/SiteBuilder.tsx';
let code = fs.readFileSync(file, 'utf8');

// 1. Remove the language switcher from the Inspector
const inspectorHeaderOld = `<div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex flex-col gap-6 bg-white dark:bg-black sticky top-0 z-10 shadow-sm">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">Block Settings</h2>
              <button onClick={() => setActiveSectionId(null)} className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">✕</button>
            </div>
            
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">Editing Language</span>
              <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1.5 rounded-xl">
                <button 
                  onClick={() => setBuilderLanguage("en")} 
                  className={\`flex-1 text-sm font-bold py-2 rounded-lg transition-all \${builderLanguage === "en" ? "bg-white dark:bg-zinc-700 shadow-sm text-blue-600 dark:text-blue-400" : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"}\`}
                >🇬🇧 English</button>
                <button 
                  onClick={() => setBuilderLanguage("ml")} 
                  className={\`flex-1 text-sm font-bold py-2 rounded-lg transition-all \${builderLanguage === "ml" ? "bg-blue-600 shadow-sm text-white" : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"}\`}
                >🇮🇳 Malayalam</button>
              </div>
            </div>
            
            {builderLanguage === 'ml' && (
              <div className="px-4 py-3 bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-lg text-sm font-medium border border-blue-100 dark:border-blue-800/50">
                <span className="block font-bold mb-1">Translation Mode Active</span>
                Type your Malayalam text in the boxes below. Images and layout will automatically sync with English.
              </div>
            )}
          </div>`;

const inspectorHeaderNew = `<div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex flex-col gap-6 bg-white dark:bg-black sticky top-0 z-10 shadow-sm">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">Block Settings</h2>
              <button onClick={() => setActiveSectionId(null)} className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">✕</button>
            </div>
            
            {builderLanguage === 'ml' && (
              <div className="px-4 py-3 bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-lg text-sm font-medium border border-blue-100 dark:border-blue-800/50">
                <span className="block font-bold mb-1">🇮🇳 Malayalam Translation Active</span>
                Type your Malayalam text below. Fields missing a translation will fall back to English automatically.
              </div>
            )}
          </div>`;

code = code.replace(inspectorHeaderOld, inspectorHeaderNew);

// 2. Add Language Switcher to the topbar
const topbarOld = `<div className="h-16 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-6 z-10 shadow-sm">
           <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1 rounded-lg">
             <button onClick={() => setViewport('desktop')} className={\`px-4 py-1.5 rounded-md text-sm font-medium \${viewport === 'desktop' ? 'bg-white dark:bg-zinc-700 shadow-sm' : 'text-zinc-500'}\`}>Desktop</button>
             <button onClick={() => setViewport('tablet')} className={\`px-4 py-1.5 rounded-md text-sm font-medium \${viewport === 'tablet' ? 'bg-white dark:bg-zinc-700 shadow-sm' : 'text-zinc-500'}\`}>Tablet</button>
             <button onClick={() => setViewport('mobile')} className={\`px-4 py-1.5 rounded-md text-sm font-medium \${viewport === 'mobile' ? 'bg-white dark:bg-zinc-700 shadow-sm' : 'text-zinc-500'}\`}>Mobile</button>
           </div>
           <button 
             onClick={handlePublish}
             disabled={isPublishing}`;

const topbarNew = `<div className="h-16 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-6 z-10 shadow-sm">
           <div className="flex items-center gap-6">
             <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1 rounded-lg">
               <button onClick={() => setViewport('desktop')} className={\`px-4 py-1.5 rounded-md text-sm font-medium \${viewport === 'desktop' ? 'bg-white dark:bg-zinc-700 shadow-sm text-zinc-900 dark:text-white' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'}\`}>Desktop</button>
               <button onClick={() => setViewport('tablet')} className={\`px-4 py-1.5 rounded-md text-sm font-medium \${viewport === 'tablet' ? 'bg-white dark:bg-zinc-700 shadow-sm text-zinc-900 dark:text-white' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'}\`}>Tablet</button>
               <button onClick={() => setViewport('mobile')} className={\`px-4 py-1.5 rounded-md text-sm font-medium \${viewport === 'mobile' ? 'bg-white dark:bg-zinc-700 shadow-sm text-zinc-900 dark:text-white' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'}\`}>Mobile</button>
             </div>
             
             <div className="h-8 w-px bg-zinc-200 dark:bg-zinc-700 hidden md:block"></div>
             
             <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1 rounded-lg">
                <button 
                  onClick={() => setBuilderLanguage("en")} 
                  className={\`px-4 py-1.5 rounded-md text-sm font-bold transition-all \${builderLanguage === "en" ? "bg-white dark:bg-zinc-700 shadow-sm text-blue-600 dark:text-blue-400" : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"}\`}
                >🇬🇧 English</button>
                <button 
                  onClick={() => setBuilderLanguage("ml")} 
                  className={\`px-4 py-1.5 rounded-md text-sm font-bold transition-all \${builderLanguage === "ml" ? "bg-blue-600 shadow-sm text-white" : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"}\`}
                >🇮🇳 Malayalam Mode</button>
              </div>
           </div>
           
           <button 
             onClick={handlePublish}
             disabled={isPublishing}`;

code = code.replace(topbarOld, topbarNew);
fs.writeFileSync(file, code);
console.log('Fixed Builder Header successfully!');
