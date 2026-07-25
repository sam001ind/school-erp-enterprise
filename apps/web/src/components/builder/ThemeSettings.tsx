"use client";

import React, { useState, useEffect } from "react";
import { saveTheme, getTheme } from "@/actions/theme";

export default function ThemeSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [theme, setTheme] = useState({
    siteName: "Acme School",
    tagline: "Empowering the future",
    logoUrl: "",
    primaryColor: "#3b82f6",
    secondaryColor: "#1e40af",
    headingFont: "Inter",
    bodyFont: "Inter",
    roundedCorners: true,
    darkModeDefault: false,
    navLayout: "centered"
  });

  useEffect(() => {
    async function loadTheme() {
      // 1. Try to load from database first
      const dbResult = await getTheme();
      if (dbResult.success && dbResult.theme) {
        setTheme({
          siteName: dbResult.theme.siteName,
          tagline: dbResult.theme.tagline || "",
          logoUrl: dbResult.theme.logoUrl || "",
          primaryColor: dbResult.theme.primaryColor,
          secondaryColor: dbResult.theme.secondaryColor,
          headingFont: dbResult.theme.headingFont,
          bodyFont: dbResult.theme.bodyFont,
          roundedCorners: dbResult.theme.roundedCorners,
          darkModeDefault: dbResult.theme.darkModeDefault,
          navLayout: dbResult.theme.navLayout
        });
      } else {
        // 2. Fallback to local storage if DB is empty
        const saved = localStorage.getItem("website_theme");
        if (saved) {
          try {
            setTheme(JSON.parse(saved));
          } catch (e) {
            console.error(e);
          }
        }
      }
      setLoading(false);
    }
    loadTheme();
  }, []);

  const handleChange = (key: string, value: any) => {
    const newTheme = { ...theme, [key]: value };
    setTheme(newTheme);
    // Instant save to local storage for quick reload preview
    localStorage.setItem("website_theme", JSON.stringify(newTheme));
  };

  const handleSaveToDB = async () => {
    setSaving(true);
    // Save to DB
    await saveTheme(theme);
    setSaving(false);
    alert("Theme saved to database successfully!");
  };

  const predefinedPalettes = [
    { name: "Ocean", primary: "#0ea5e9", secondary: "#0369a1" },
    { name: "Forest", primary: "#10b981", secondary: "#047857" },
    { name: "Sunset", primary: "#f97316", secondary: "#c2410c" },
    { name: "Corporate", primary: "#3b82f6", secondary: "#1e3a8a" },
    { name: "Elegant", primary: "#18181b", secondary: "#52525b" }
  ];

  if (loading) {
    return <div className="p-8 flex justify-center"><div className="animate-spin text-3xl">🌀</div></div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in duration-500">
      
      {/* LEFT COLUMN: Controls */}
      <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm p-6 overflow-y-auto max-h-[80vh] custom-scrollbar">
        <div className="flex justify-between items-center mb-6 border-b border-zinc-100 dark:border-zinc-800 pb-4">
          <h2 className="text-xl font-bold dark:text-white text-zinc-900">Theme Settings</h2>
          <button 
            onClick={handleSaveToDB}
            disabled={saving}
            className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-4 py-2 rounded-xl text-sm font-bold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save to Database"}
          </button>
        </div>

        <div className="space-y-8">
          {/* Brand Identity */}
          <section className="space-y-4">
            <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
              <span>🏷️</span> Brand Identity
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Site Name</label>
                <input 
                  type="text" 
                  value={theme.siteName}
                  onChange={(e) => handleChange('siteName', e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-2 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Tagline</label>
                <input 
                  type="text" 
                  value={theme.tagline}
                  onChange={(e) => handleChange('tagline', e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-2 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
            </div>
          </section>

          {/* Color Palette */}
          <section className="space-y-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
              <span>🎨</span> Colors
            </h3>
            
            <div className="flex gap-2 flex-wrap mb-4">
              {predefinedPalettes.map(p => (
                <button
                  key={p.name}
                  onClick={() => {
                    handleChange('primaryColor', p.primary);
                    handleChange('secondaryColor', p.secondary);
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold border flex items-center gap-1 transition-transform hover:scale-105 ${theme.primaryColor === p.primary ? 'border-zinc-900 dark:border-white shadow-sm' : 'border-zinc-200 dark:border-zinc-700'}`}
                >
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: p.primary }}></div>
                  <span className="text-zinc-700 dark:text-zinc-300">{p.name}</span>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Primary Color</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="color" 
                    value={theme.primaryColor}
                    onChange={(e) => handleChange('primaryColor', e.target.value)}
                    className="w-10 h-10 rounded cursor-pointer border-0 p-0"
                  />
                  <input 
                    type="text" 
                    value={theme.primaryColor}
                    onChange={(e) => handleChange('primaryColor', e.target.value)}
                    className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-2 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none uppercase font-mono text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Secondary Color</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="color" 
                    value={theme.secondaryColor}
                    onChange={(e) => handleChange('secondaryColor', e.target.value)}
                    className="w-10 h-10 rounded cursor-pointer border-0 p-0"
                  />
                  <input 
                    type="text" 
                    value={theme.secondaryColor}
                    onChange={(e) => handleChange('secondaryColor', e.target.value)}
                    className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-2 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none uppercase font-mono text-sm"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Typography */}
          <section className="space-y-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
              <span>Aa</span> Typography
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Heading Font</label>
                <select 
                  value={theme.headingFont}
                  onChange={(e) => handleChange('headingFont', e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-2 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="Inter">Inter</option>
                  <option value="Playfair Display">Playfair Display</option>
                  <option value="Roboto">Roboto</option>
                  <option value="Poppins">Poppins</option>
                  <option value="Merriweather">Merriweather</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Body Font</label>
                <select 
                  value={theme.bodyFont}
                  onChange={(e) => handleChange('bodyFont', e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-2 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="Inter">Inter</option>
                  <option value="Roboto">Roboto</option>
                  <option value="Open Sans">Open Sans</option>
                  <option value="Lato">Lato</option>
                </select>
              </div>
            </div>
          </section>

          {/* Layout Elements */}
          <section className="space-y-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
              <span>📐</span> Layout
            </h3>
            
            <div className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-100 dark:border-zinc-800">
              <div>
                <p className="font-semibold text-zinc-800 dark:text-zinc-200 text-sm">Rounded Corners</p>
                <p className="text-xs text-zinc-500">Apply soft border radiuses globally</p>
              </div>
              <button 
                onClick={() => handleChange('roundedCorners', !theme.roundedCorners)}
                className={`w-12 h-6 rounded-full transition-colors relative ${theme.roundedCorners ? 'bg-green-500' : 'bg-zinc-300 dark:bg-zinc-700'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${theme.roundedCorners ? 'left-7' : 'left-1'}`}></div>
              </button>
            </div>

            <div className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-100 dark:border-zinc-800">
              <div>
                <p className="font-semibold text-zinc-800 dark:text-zinc-200 text-sm">Dark Mode Default</p>
                <p className="text-xs text-zinc-500">Set the default color scheme</p>
              </div>
              <button 
                onClick={() => handleChange('darkModeDefault', !theme.darkModeDefault)}
                className={`w-12 h-6 rounded-full transition-colors relative ${theme.darkModeDefault ? 'bg-green-500' : 'bg-zinc-300 dark:bg-zinc-700'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${theme.darkModeDefault ? 'left-7' : 'left-1'}`}></div>
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Navigation Layout</label>
              <select 
                value={theme.navLayout}
                onChange={(e) => handleChange('navLayout', e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-2 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="centered">Logo Centered</option>
                <option value="left">Logo Left</option>
                <option value="split">Logo Left, CTA Right</option>
              </select>
            </div>
          </section>
        </div>
      </div>

      {/* RIGHT COLUMN: Live Preview */}
      <div className="bg-zinc-100 dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-2 relative flex flex-col h-[80vh]">
        {/* Browser Chrome */}
        <div className="flex items-center gap-2 p-3 bg-zinc-200/50 dark:bg-zinc-900/50 rounded-t-xl">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <div className="w-3 h-3 rounded-full bg-amber-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
          <div className="mx-auto bg-white dark:bg-zinc-800 rounded-md px-24 py-1 text-xs text-zinc-500 font-medium font-mono text-center shadow-inner">
            https://your-school.edu
          </div>
        </div>

        {/* Live Website Canvas */}
        <div 
          className={`flex-1 overflow-hidden transition-all duration-300 flex flex-col relative ${theme.darkModeDefault ? 'bg-zinc-950 text-white' : 'bg-white text-zinc-900'} ${theme.roundedCorners ? 'rounded-b-xl' : 'rounded-none'}`}
          style={{ fontFamily: theme.bodyFont }}
        >
          {/* Mock Nav */}
          <nav className={`p-6 border-b transition-colors flex ${theme.navLayout === 'centered' ? 'flex-col items-center gap-4' : 'justify-between items-center'} ${theme.darkModeDefault ? 'border-zinc-800 bg-zinc-950/80 backdrop-blur' : 'border-zinc-100 bg-white/80 backdrop-blur'}`}>
            <div className={`font-bold text-2xl tracking-tight`} style={{ fontFamily: theme.headingFont }}>
              <span style={{ color: theme.primaryColor }}>{theme.siteName.split(' ')[0]}</span>
              {theme.siteName.split(' ').slice(1).join(' ')}
            </div>
            
            <div className={`flex gap-6 text-sm font-medium ${theme.darkModeDefault ? 'text-zinc-300' : 'text-zinc-600'}`}>
              <span className="hover:opacity-70 cursor-pointer">Academics</span>
              <span className="hover:opacity-70 cursor-pointer">Admissions</span>
              <span className="hover:opacity-70 cursor-pointer">Campus Life</span>
            </div>

            {theme.navLayout === 'split' && (
              <button 
                className="px-4 py-2 text-sm font-bold text-white transition-transform hover:scale-105 shadow-md"
                style={{ backgroundColor: theme.primaryColor, borderRadius: theme.roundedCorners ? '999px' : '4px' }}
              >
                Apply Now
              </button>
            )}
          </nav>

          {/* Mock Hero */}
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ background: `linear-gradient(45deg, ${theme.primaryColor}, ${theme.secondaryColor})` }}></div>
            
            <div className="relative z-10 space-y-6 max-w-lg">
              <div 
                className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider mb-2"
                style={{ 
                  color: theme.primaryColor, 
                  backgroundColor: `${theme.primaryColor}20`,
                  borderRadius: theme.roundedCorners ? '999px' : '4px'
                }}
              >
                Welcome to {theme.siteName}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight" style={{ fontFamily: theme.headingFont }}>
                {theme.tagline}
              </h1>
              
              <p className={`text-sm leading-relaxed ${theme.darkModeDefault ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Experience a world-class education with state-of-the-art facilities, dedicated faculty, and a vibrant community designed to help you succeed.
              </p>
              
              <div className="flex gap-4 justify-center pt-4">
                <button 
                  className="px-6 py-3 text-sm font-bold text-white transition-transform hover:scale-105 shadow-lg"
                  style={{ backgroundColor: theme.primaryColor, borderRadius: theme.roundedCorners ? '12px' : '4px' }}
                >
                  Discover More
                </button>
                <button 
                  className="px-6 py-3 text-sm font-bold transition-transform hover:scale-105 border-2"
                  style={{ 
                    color: theme.darkModeDefault ? 'white' : 'black', 
                    borderColor: theme.darkModeDefault ? '#3f3f46' : '#e4e4e7',
                    borderRadius: theme.roundedCorners ? '12px' : '4px' 
                  }}
                >
                  Take a Tour
                </button>
              </div>
            </div>
          </div>

          {/* Mock Feature row */}
          <div className={`p-8 border-t flex justify-between items-center ${theme.darkModeDefault ? 'border-zinc-800 bg-zinc-900/50' : 'border-zinc-100 bg-zinc-50'}`}>
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 flex items-center justify-center text-white shadow-md" style={{ backgroundColor: theme.secondaryColor, borderRadius: theme.roundedCorners ? '10px' : '4px' }}>🎓</div>
               <div className="text-left">
                 <p className="font-bold text-sm" style={{ fontFamily: theme.headingFont }}>Top Ranked</p>
                 <p className="text-xs opacity-60">Nationwide</p>
               </div>
             </div>
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 flex items-center justify-center text-white shadow-md" style={{ backgroundColor: theme.secondaryColor, borderRadius: theme.roundedCorners ? '10px' : '4px' }}>🌍</div>
               <div className="text-left">
                 <p className="font-bold text-sm" style={{ fontFamily: theme.headingFont }}>Global</p>
                 <p className="text-xs opacity-60">Alumni Network</p>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
