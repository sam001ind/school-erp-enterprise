"use client";

import { X, Send, Calendar, Bot, Image as ImageIcon, Sparkles, Hash, MapPin, Smile } from "lucide-react";
import { useState } from "react";
import { useSocialHub } from "@/lib/SocialHubContext";

export default function UniversalComposer({ onClose }: { onClose: () => void }) {
  const { addPost } = useSocialHub();
  const [content, setContent] = useState("");
  
  const platforms = [
    { id: 'fb', name: 'Facebook', icon: 'FB', color: 'bg-blue-600' },
    { id: 'ig', name: 'Instagram', icon: 'IG', color: 'bg-pink-600' },
    { id: 'li', name: 'LinkedIn', icon: 'IN', color: 'bg-blue-700' },
    { id: 'x', name: 'X', icon: '𝕏', color: 'bg-black' },
  ];

  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['fb', 'ig']);

  const togglePlatform = (id: string) => {
    if (selectedPlatforms.includes(id)) {
      setSelectedPlatforms(selectedPlatforms.filter(p => p !== id));
    } else {
      setSelectedPlatforms([...selectedPlatforms, id]);
    }
  };

  const handlePublish = (status: 'published' | 'scheduled') => {
    if (!content) return;
    addPost({
      content,
      platforms: selectedPlatforms.map(id => platforms.find(p => p.id === id)?.name || id),
      time: status === 'published' ? 'Just now' : 'Tomorrow, 10:00 AM',
      date: new Date(),
      author: 'Current User',
      status,
      color: status === 'published' ? 'bg-indigo-100 text-indigo-700 border-indigo-200' : 'bg-blue-100 text-blue-700 border-blue-200'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="flex w-full max-w-5xl h-[85vh] bg-white rounded-xl shadow-2xl overflow-hidden flex-col md:flex-row">
        
        {/* Editor Side */}
        <div className="flex-1 flex flex-col border-r border-slate-200 bg-white">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-indigo-500" />
              Universal Composer
            </h2>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 md:hidden">
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="p-6 flex-1 flex flex-col overflow-y-auto">
            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Publish To</label>
              <div className="flex flex-wrap gap-3">
                {platforms.map(p => {
                  const isSelected = selectedPlatforms.includes(p.id);
                  return (
                    <button
                      key={p.id}
                      onClick={() => togglePlatform(p.id)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium transition-all ${
                        isSelected 
                          ? `border-transparent text-white shadow-sm ${p.color}` 
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span className={isSelected ? 'text-white' : 'text-slate-400'}>{p.icon}</span>
                      {p.name}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-slate-700">Content</label>
                <button className="text-xs flex items-center gap-1 text-indigo-600 hover:text-indigo-700 font-medium bg-indigo-50 px-2 py-1 rounded">
                  <Bot className="h-3 w-3" />
                  AI Magic Write
                </button>
              </div>
              
              <div className="flex-1 rounded-xl border border-slate-200 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 transition-all overflow-hidden flex flex-col">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="What do you want to share with your audience?"
                  className="flex-1 w-full p-4 outline-none resize-none text-slate-700"
                />
                <div className="bg-slate-50 px-4 py-2 border-t border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-md transition-colors tooltip-trigger"><ImageIcon className="h-4 w-4" /></button>
                    <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-md transition-colors"><Smile className="h-4 w-4" /></button>
                    <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-md transition-colors"><Hash className="h-4 w-4" /></button>
                    <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-md transition-colors"><MapPin className="h-4 w-4" /></button>
                  </div>
                  <div className="text-xs text-slate-400 font-medium">
                    {content.length} characters
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-4 border border-dashed border-slate-300 rounded-xl bg-slate-50 flex flex-col items-center justify-center text-slate-500 cursor-pointer hover:bg-slate-100 transition-colors">
              <ImageIcon className="h-6 w-6 mb-2 text-slate-400" />
              <p className="text-sm font-medium">Drag & drop media here</p>
              <p className="text-xs text-slate-400 mt-1">Supports JPG, PNG, MP4</p>
            </div>
          </div>

          <div className="p-6 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
            <button className="text-sm font-medium text-slate-500 hover:text-slate-700">
              Save Draft
            </button>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => handlePublish('scheduled')}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
              >
                <Calendar className="h-4 w-4" />
                Schedule
              </button>
              <button 
                onClick={() => handlePublish('published')}
                className="flex items-center gap-2 px-6 py-2 bg-indigo-600 rounded-lg text-sm font-semibold text-white hover:bg-indigo-700 transition-colors shadow-sm"
              >
                <Send className="h-4 w-4" />
                Publish Now
              </button>
            </div>
          </div>
        </div>

        {/* Live Preview Side */}
        <div className="hidden md:flex w-[400px] bg-slate-50 flex-col relative">
          <div className="absolute top-4 right-4 z-10">
            <button onClick={onClose} className="p-2 bg-white rounded-full text-slate-400 hover:text-slate-600 shadow-sm border border-slate-200">
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="p-6 border-b border-slate-200 bg-white">
            <h3 className="font-semibold text-slate-800">Live Preview</h3>
            <div className="flex gap-2 mt-3">
              {selectedPlatforms.map(p => (
                <button key={p} className="text-xs px-3 py-1 bg-slate-100 text-slate-600 font-medium rounded-full uppercase tracking-wider">
                  {p}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex-1 p-6 overflow-y-auto flex justify-center">
            {/* Mock Phone Container */}
            <div className="w-[320px] bg-white border border-slate-200 rounded-[2rem] shadow-xl overflow-hidden flex flex-col pb-4 h-[600px] relative">
              {/* Notch */}
              <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-20">
                <div className="w-32 h-6 bg-black rounded-b-xl"></div>
              </div>
              
              <div className="pt-8 px-4 pb-2 border-b border-slate-100 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-slate-200 border border-slate-300 overflow-hidden">
                  <img src="https://ui-avatars.com/api/?name=Brand&background=6366f1&color=fff" alt="Brand" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">Your Brand</p>
                  <p className="text-[10px] text-slate-500">Just now • 🌎</p>
                </div>
              </div>
              <div className="p-4 text-sm text-slate-800 whitespace-pre-wrap">
                {content || <span className="text-slate-400 italic">Your post text will appear here...</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
