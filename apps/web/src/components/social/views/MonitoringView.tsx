"use client";

import { useState } from "react";
import { Search, Plus, Filter, MoreVertical, RefreshCw, MessageSquare, X } from "lucide-react";
import { FaTwitter as Twitter, FaLinkedin as Linkedin, FaFacebook as Facebook, FaInstagram as Instagram } from "react-icons/fa";
import { useSocialHub } from "@/lib/SocialHubContext";

export default function MonitoringView() {
  const { streams, addStream, deleteStream } = useSocialHub();
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  
  // Add Stream Modal State
  const [newTitle, setNewTitle] = useState("");
  const [newKeyword, setNewKeyword] = useState("");
  const [newPlatform, setNewPlatform] = useState("Twitter");

  // Dropdown state for stream options
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleAddStream = async () => {
    if (!newTitle || !newKeyword) return;
    
    let color = "text-sky-500";
    if (newPlatform === "LinkedIn") color = "text-blue-700";
    if (newPlatform === "Facebook") color = "text-blue-600";
    if (newPlatform === "Instagram") color = "text-pink-600";

    await addStream({
      title: newTitle,
      keyword: newKeyword,
      platform: newPlatform,
      color: color
    });
    
    setNewTitle("");
    setNewKeyword("");
    setNewPlatform("Twitter");
    setAddModalOpen(false);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="px-6 py-4 border-b border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 backdrop-blur-md/50 dark:backdrop-blur-md flex justify-between items-center shrink-0">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white dark:text-slate-100">Monitoring & Listening</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Track brand mentions, industry keywords, and competitors in real-time.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 backdrop-blur-md/50 dark:backdrop-blur-md text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:bg-zinc-800/50 transition-colors shadow-sm text-sm font-medium">
            <Filter className="h-4 w-4" />
            Manage Columns
          </button>
          <button 
            onClick={() => setAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm font-medium"
          >
            <Plus className="h-4 w-4" />
            Add Stream
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto p-6 bg-slate-100 dark:bg-zinc-800 flex gap-6 custom-scrollbar items-start">
        {streams.map((stream: any) => {
          const Icon = stream.icon || Twitter;
          return (
          <div key={stream.id} className="w-80 shrink-0 flex flex-col bg-slate-100 dark:bg-zinc-800 h-full max-h-full">
            <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md/50 dark:backdrop-blur-md rounded-t-xl border border-slate-200 dark:border-zinc-800 border-b-0 p-3 flex justify-between items-center shrink-0 shadow-sm relative">
              <div className="flex items-center gap-2">
                <Icon className={`h-4 w-4 ${stream.color}`} />
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white dark:text-slate-100 leading-tight">{stream.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{stream.keyword}</p>
                </div>
              </div>
              <div className="flex gap-1 text-slate-400 dark:text-slate-500 dark:text-slate-500 relative">
                <button className="p-1 hover:text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:bg-zinc-800 rounded transition-colors tooltip-trigger" title="Refresh">
                  <RefreshCw className="h-3.5 w-3.5" />
                </button>
                <button 
                  onClick={() => setActiveDropdown(activeDropdown === stream.id ? null : stream.id)}
                  className="p-1 hover:text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:bg-zinc-800 rounded transition-colors tooltip-trigger" 
                  title="Options"
                >
                  <MoreVertical className="h-3.5 w-3.5" />
                </button>

                {activeDropdown === stream.id && (
                  <div className="absolute top-8 right-0 w-36 bg-white dark:bg-zinc-900/50 backdrop-blur-md/50 dark:backdrop-blur-md border border-slate-200 dark:border-zinc-800 rounded-lg shadow-lg py-1 z-10">
                    <button 
                      onClick={() => {
                        deleteStream(stream.id);
                        setActiveDropdown(null);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-slate-50 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:bg-zinc-800/50 font-medium"
                    >
                      Delete Stream
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-800 rounded-b-xl shadow-inner custom-scrollbar p-2 space-y-2 relative">
              {/* Click outside overlay for dropdown */}
              {activeDropdown === stream.id && (
                <div 
                  className="fixed inset-0 z-0" 
                  onClick={() => setActiveDropdown(null)} 
                />
              )}

              {stream.posts && stream.posts.map((post: any) => (
                <div key={post.id} className="bg-white dark:bg-zinc-900/50 backdrop-blur-md/50 dark:backdrop-blur-md p-3 rounded-lg border border-slate-200 dark:border-zinc-800 shadow-sm hover:border-indigo-300 transition-colors cursor-pointer group relative z-0">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-zinc-700 overflow-hidden shrink-0">
                        <img src={`https://ui-avatars.com/api/?name=${post.user}&background=random`} alt={post.user} />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white dark:text-slate-100 leading-none">{post.user}</h4>
                        <span className="text-xs text-slate-500 dark:text-slate-400">{post.handle}</span>
                      </div>
                    </div>
                    <span className="text-xs text-slate-400 dark:text-slate-500 dark:text-slate-500">{post.time}</span>
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">{post.text}</p>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-zinc-800 opacity-60 group-hover:opacity-100 transition-opacity">
                    <button className="text-xs flex items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-indigo-600 transition-colors">
                      <MessageSquare className="h-3.5 w-3.5" /> Reply
                    </button>
                    <button className="text-xs text-slate-500 dark:text-slate-400 hover:text-indigo-600 transition-colors">
                      Retweet
                    </button>
                    <button className="text-xs text-slate-500 dark:text-slate-400 hover:text-pink-600 transition-colors">
                      Like
                    </button>
                  </div>
                </div>
              ))}
              
              {(!stream.posts || stream.posts.length === 0) && (
                <div className="text-center py-8 text-slate-400 dark:text-slate-500 dark:text-slate-500 text-sm relative z-0">
                  No recent activity found.
                </div>
              )}
            </div>
          </div>
        )})}
        
        {/* Add new stream column placeholder */}
        <div 
          onClick={() => setAddModalOpen(true)}
          className="w-80 shrink-0 h-[300px] border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center text-slate-500 dark:text-slate-400 cursor-pointer hover:bg-slate-50 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:bg-zinc-800/50 hover:border-indigo-400 transition-colors"
        >
          <Plus className="h-8 w-8 mb-2 text-indigo-400" />
          <span className="font-medium text-sm">Add New Stream</span>
        </div>
      </div>

      {/* Add Stream Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md/50 dark:backdrop-blur-md rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 dark:border-zinc-800 flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white dark:text-slate-100">Add New Stream</h2>
              <button 
                onClick={() => setAddModalOpen(false)}
                className="p-2 text-slate-400 dark:text-slate-500 dark:text-slate-500 hover:text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:bg-zinc-800 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Stream Title</label>
                <input 
                  type="text" 
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Brand Mentions"
                  className="w-full border border-slate-200 dark:border-zinc-800 rounded-lg px-4 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Keyword or Handle</label>
                <input 
                  type="text" 
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  placeholder="e.g. @techcorp or #marketing"
                  className="w-full border border-slate-200 dark:border-zinc-800 rounded-lg px-4 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Platform</label>
                <select 
                  value={newPlatform}
                  onChange={(e) => setNewPlatform(e.target.value)}
                  className="w-full border border-slate-200 dark:border-zinc-800 rounded-lg px-4 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white dark:bg-zinc-900/50 backdrop-blur-md/50 dark:backdrop-blur-md"
                >
                  <option value="Twitter">Twitter (X)</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Facebook">Facebook</option>
                  <option value="Instagram">Instagram</option>
                </select>
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-800/50 border-t border-slate-100 dark:border-zinc-800 flex justify-end gap-3">
              <button 
                onClick={() => setAddModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:bg-zinc-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddStream}
                disabled={!newTitle || !newKeyword}
                className="px-4 py-2 text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Stream
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
