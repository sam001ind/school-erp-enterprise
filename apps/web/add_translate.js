const fs = require('fs');
const file = '/Users/abhijitht/.gemini/antigravity/scratch/enterprise-app/apps/web/src/components/builder/SiteBuilder.tsx';
let code = fs.readFileSync(file, 'utf8');

// 1. Add state variable
code = code.replace(
  'const [isPublishing, setIsPublishing] = useState(false);',
  'const [isPublishing, setIsPublishing] = useState(false);\n  const [isTranslating, setIsTranslating] = useState(false);'
);

// 2. Add handleAutoTranslate function
const publishFunc = `  const handlePublish = async () => {`;
const autoTranslateFunc = `  const handleAutoTranslate = async () => {
    setIsTranslating(true);
    try {
      const newSections = JSON.parse(JSON.stringify(sections));
      const textsToTranslate = [];

      const extractTexts = (obj) => {
        for (const key in obj) {
          if (key === "imageUrl" || key === "backgroundImage" || key === "image" || key === "id" || key === "type") continue;
          
          if (Array.isArray(obj[key])) {
            obj[key].forEach((item) => {
               if (typeof item === "object" && item !== null) extractTexts(item);
            });
          } else if (typeof obj[key] === "object" && obj[key] !== null) {
            if ("en" in obj[key]) {
               // Only translate if Malayalam is empty
               if (obj[key].en && !obj[key].ml) {
                 textsToTranslate.push({ ref: obj[key], text: obj[key].en });
               }
            } else {
               extractTexts(obj[key]);
            }
          }
        }
      };

      newSections.forEach((s) => extractTexts(s.props));

      if (textsToTranslate.length === 0) {
        alert("Everything is already translated!");
        setIsTranslating(false);
        return;
      }

      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texts: textsToTranslate.map(t => t.text) })
      });
      const data = await res.json();
      
      if (data.translated) {
        textsToTranslate.forEach((item, index) => {
          item.ref.ml = data.translated[index];
        });
        setSections(newSections);
        alert("✨ Successfully auto-translated to Malayalam!");
      } else {
        alert("Translation failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Error during translation");
    }
    setIsTranslating(false);
  };

  const handlePublish = async () => {`;

code = code.replace(publishFunc, autoTranslateFunc);

// 3. Add Auto Translate button to topbar next to Publish
const publishBtn = `<button 
             onClick={handlePublish}`;
const translateBtn = `<button 
             onClick={handleAutoTranslate}
             disabled={isTranslating}
             className="border-2 border-indigo-200 text-indigo-700 bg-indigo-50 hover:bg-indigo-100 hover:border-indigo-300 dark:bg-indigo-900/30 dark:border-indigo-800/50 dark:text-indigo-300 px-4 py-2 rounded-xl font-bold shadow-sm transition-all disabled:opacity-70 flex items-center gap-2 mr-3"
           >
             {isTranslating ? '✨ Translating...' : '✨ Auto-Translate Page'}
           </button>
           <button 
             onClick={handlePublish}`;

code = code.replace(publishBtn, translateBtn);

fs.writeFileSync(file, code);
console.log('Added Auto Translate Feature successfully!');
