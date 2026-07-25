"use client";

import React, { useState } from "react";
import { useSocialHub } from "@/lib/SocialHubContext";
import { X, Send, Image as ImageIcon, Calendar } from "lucide-react";
import { FaFacebook as Facebook, FaTwitter as Twitter, FaInstagram as Instagram, FaLinkedin as Linkedin } from "react-icons/fa";

export default function ComposerModal() {
  const { isComposerOpen, setComposerOpen, addPost, editingPost, editPost, setEditingPost } = useSocialHub();
  const [content, setContent] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['LinkedIn']);
  const [isPublishing, setIsPublishing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [scheduledDate, setScheduledDate] = useState<string>("");
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (isComposerOpen && editingPost) {
      setContent(editingPost.content);
      setSelectedPlatforms(editingPost.platforms);
      // Format editingPost.date for the datetime-local input
      if (editingPost.status === 'scheduled') {
        const d = new Date(editingPost.date);
        // yyyy-MM-ddThh:mm
        const tzOffset = d.getTimezoneOffset() * 60000; // offset in milliseconds
        const localISOTime = (new Date(d.getTime() - tzOffset)).toISOString().slice(0, 16);
        setScheduledDate(localISOTime);
      } else {
        setScheduledDate("");
      }
    } else if (isComposerOpen && !editingPost) {
      setContent("");
      setSelectedPlatforms(['LinkedIn']);
      setSelectedImage(null);
      setScheduledDate("");
    }
  }, [isComposerOpen, editingPost]);

  if (!isComposerOpen) return null;

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setSelectedImage(url);
    }
  };

  const platforms = [
    { name: 'LinkedIn', icon: Linkedin, color: 'text-[#0077b5]' },
    { name: 'Twitter', icon: Twitter, color: 'text-[#1DA1F2]' },
    { name: 'Facebook', icon: Facebook, color: 'text-[#1877F2]' },
    { name: 'Instagram', icon: Instagram, color: 'text-[#E1306C]' },
  ];

  const togglePlatform = (p: string) => {
    if (selectedPlatforms.includes(p)) {
      setSelectedPlatforms(selectedPlatforms.filter(x => x !== p));
    } else {
      setSelectedPlatforms([...selectedPlatforms, p]);
    }
  };

  const handlePublish = async (status: 'published' | 'scheduled') => {
    if (!content.trim() || selectedPlatforms.length === 0) return;
    setIsPublishing(true);
    
    // Parse scheduled date or default to tomorrow if none provided but button was clicked
    let finalDate = new Date();
    let finalTime = "Just now";
    
    if (status === 'scheduled') {
      if (scheduledDate) {
        finalDate = new Date(scheduledDate);
        finalTime = finalDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      } else {
        finalDate = new Date(Date.now() + 86400000);
        finalTime = "Tomorrow, 10:00 AM";
      }
    }
    
    if (editingPost) {
      await editPost(editingPost.id, {
        content,
        platforms: selectedPlatforms,
        status,
        time: finalTime,
        date: finalDate,
      });
    } else {
      await addPost({
        content,
        platforms: selectedPlatforms,
        time: finalTime,
        date: finalDate,
        author: "Admin User",
        status: status,
        likes: 0,
        comments: 0
      });
    }
    
    setIsPublishing(false);
    setContent("");
    setSelectedImage(null);
    setScheduledDate("");
    setEditingPost(null);
    setComposerOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-4 border-b border-slate-100 dark:border-zinc-800 flex justify-between items-center bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40">
          <h2 className="font-bold text-slate-900 dark:text-white text-lg">{editingPost ? 'Edit Post' : 'Create New Post'}</h2>
          <button 
            onClick={() => {
              setComposerOpen(false);
              setEditingPost(null);
            }}
            className="text-slate-400 dark:text-slate-500 dark:text-slate-500 hover:text-slate-600 dark:text-slate-300 transition-colors p-1"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Select Platforms</label>
            <div className="flex gap-3">
              {platforms.map(p => (
                <button
                  key={p.name}
                  onClick={() => togglePlatform(p.name)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
                    selectedPlatforms.includes(p.name) 
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700' 
                      : 'border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40'
                  }`}
                >
                  <p.icon className={`h-4 w-4 ${selectedPlatforms.includes(p.name) ? p.color : 'text-slate-400 dark:text-slate-500 dark:text-slate-500'}`} />
                  {p.name}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <textarea 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What do you want to share with your audience?"
              className="w-full h-40 p-4 border border-slate-200 dark:border-zinc-800 rounded-xl resize-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-slate-700 dark:text-slate-300"
            />
          </div>
          
          <div className="flex items-center gap-2 mt-4">
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageSelect} 
              accept="image/*" 
              className="hidden" 
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="p-2 text-slate-400 dark:text-slate-500 dark:text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors tooltip-trigger" 
              title="Add Image"
            >
              <ImageIcon className="h-5 w-5" />
            </button>
          </div>

          {selectedImage && (
            <div className="mt-4 relative inline-block">
              <img src={selectedImage} alt="Preview" className="h-32 w-auto rounded-lg border border-slate-200 dark:border-zinc-800 object-cover" />
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-sm transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          
          <div className="mt-4 flex items-center gap-3">
             <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Schedule (optional):</label>
             <input 
               type="datetime-local" 
               value={scheduledDate}
               onChange={(e) => setScheduledDate(e.target.value)}
               className="border border-slate-200 dark:border-zinc-800 rounded-lg px-3 py-1.5 text-sm text-slate-700 dark:text-slate-300 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
             />
          </div>
        </div>
        
        <div className="p-4 bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 border-t border-slate-100 dark:border-zinc-800 flex justify-end gap-3">
          <button 
            onClick={() => handlePublish('scheduled')}
            disabled={isPublishing || !content.trim() || selectedPlatforms.length === 0}
            className="px-4 py-2 text-slate-600 dark:text-slate-300 bg-white dark:bg-zinc-900/50 backdrop-blur-md border border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <Calendar className="h-4 w-4" /> Schedule
          </button>
          <button 
            onClick={() => handlePublish('published')}
            disabled={isPublishing || !content.trim() || selectedPlatforms.length === 0}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            {isPublishing ? (
              <span className="animate-pulse">{editingPost ? 'Saving...' : 'Publishing...'}</span>
            ) : (
              <>
                <Send className="h-4 w-4" /> {editingPost ? 'Save Changes' : 'Publish Now'}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
