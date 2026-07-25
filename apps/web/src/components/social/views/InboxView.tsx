"use client";

import { MessageSquare, Search, Filter, MoreVertical, Reply, CheckCircle2, CornerDownRight } from "lucide-react";
import { FaFacebook as Facebook, FaInstagram as Instagram, FaLinkedin as Linkedin, FaTwitter as Twitter } from "react-icons/fa";
import { useState } from "react";

import { useSocialHub } from "@/lib/SocialHubContext";

export default function InboxView() {
  const { messages, updateMessageStatus } = useSocialHub();
  const [activeMsg, setActiveMsg] = useState<string | null>(messages[0]?.id || null);
  const [replyText, setReplyText] = useState("");
  const [activeFilter, setActiveFilter] = useState<'all' | 'unread' | 'escalated'>('all');

  const getPlatformIcon = (platform: string) => {
    switch(platform) {
      case 'Twitter': return Twitter;
      case 'LinkedIn': return Linkedin;
      case 'Facebook': return Facebook;
      case 'Instagram': return Instagram;
      default: return MessageSquare;
    }
  };

  const filteredMessages = messages.filter(m => {
    if (activeFilter === 'unread') return m.status === 'unread';
    if (activeFilter === 'escalated') return m.status === 'escalated';
    return true;
  });

  const handleReply = () => {
    if (!replyText || !activeMsg) return;
    updateMessageStatus(activeMsg, 'read');
    setReplyText("");
  };

  const handleResolve = () => {
    if (!activeMsg) return;
    updateMessageStatus(activeMsg, 'read');
    setActiveMsg(null);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="px-6 py-4 border-b border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 backdrop-blur-md/50 dark:backdrop-blur-md flex justify-between items-center shrink-0">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white dark:text-slate-100">Unified Inbox</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Manage all your messages, comments, and mentions.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => messages.forEach(m => updateMessageStatus(m.id, 'read'))}
            className="px-3 py-1.5 text-sm font-medium bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-slate-300 rounded-md hover:bg-slate-200 dark:bg-zinc-700"
          >
            Mark all read
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Pane: Filters & Channels */}
        <div className="w-64 border-r border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-800/50 flex flex-col hidden md:flex shrink-0">
          <div className="p-4 border-b border-slate-200 dark:border-zinc-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">Smart Views</h3>
            <div className="space-y-1">
              <button 
                onClick={() => setActiveFilter('all')}
                className={`w-full flex justify-between items-center px-3 py-2 rounded-md font-medium text-sm ${activeFilter === 'all' ? 'bg-indigo-100 text-indigo-700' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:bg-zinc-800'}`}
              >
                <span>All Messages</span>
                <span className="bg-indigo-200 text-indigo-800 text-xs px-2 py-0.5 rounded-full">{messages.length}</span>
              </button>
              <button 
                onClick={() => setActiveFilter('unread')}
                className={`w-full flex justify-between items-center px-3 py-2 rounded-md font-medium text-sm ${activeFilter === 'unread' ? 'bg-blue-100 text-blue-700' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:bg-zinc-800'}`}
              >
                <span>Unread</span>
                <span className="bg-blue-200 text-blue-800 text-xs px-2 py-0.5 rounded-full">{messages.filter(m=>m.status==='unread').length}</span>
              </button>
              <button 
                onClick={() => setActiveFilter('escalated')}
                className={`w-full flex justify-between items-center px-3 py-2 rounded-md font-medium text-sm ${activeFilter === 'escalated' ? 'bg-red-100 text-red-700' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:bg-zinc-800'}`}
              >
                <span>Escalated</span>
                <span className="bg-red-200 text-red-800 text-xs px-2 py-0.5 rounded-full">{messages.filter(m=>m.status==='escalated').length}</span>
              </button>
            </div>
          </div>
          <div className="p-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">Networks</h3>
            <div className="space-y-1">
              <label className="flex items-center gap-3 px-3 py-2 hover:bg-slate-100 dark:bg-zinc-800 rounded cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                <Twitter className="h-4 w-4 text-sky-500" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">X (Twitter)</span>
              </label>
              <label className="flex items-center gap-3 px-3 py-2 hover:bg-slate-100 dark:bg-zinc-800 rounded cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                <Facebook className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Facebook</span>
              </label>
              <label className="flex items-center gap-3 px-3 py-2 hover:bg-slate-100 dark:bg-zinc-800 rounded cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                <Instagram className="h-4 w-4 text-pink-600" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Instagram</span>
              </label>
              <label className="flex items-center gap-3 px-3 py-2 hover:bg-slate-100 dark:bg-zinc-800 rounded cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                <Linkedin className="h-4 w-4 text-blue-700" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">LinkedIn</span>
              </label>
            </div>
          </div>
        </div>

        {/* Middle Pane: Message List */}
        <div className="w-full md:w-80 lg:w-96 border-r border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 backdrop-blur-md/50 dark:backdrop-blur-md flex flex-col shrink-0">
          <div className="p-3 border-b border-slate-200 dark:border-zinc-800">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 dark:text-slate-500 dark:text-slate-500" />
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full bg-slate-100 dark:bg-zinc-800 border-transparent focus:border-indigo-500 focus:bg-white dark:bg-zinc-900/50 backdrop-blur-md/50 dark:backdrop-blur-md focus:ring-0 rounded-md py-2 pl-9 pr-3 text-sm"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filteredMessages.map(msg => {
              const Icon = getPlatformIcon(msg.platform);
              return (
              <div 
                key={msg.id} 
                onClick={() => setActiveMsg(msg.id)}
                className={`p-4 border-b border-slate-100 dark:border-zinc-800 cursor-pointer transition-colors relative ${activeMsg === msg.id ? 'bg-indigo-50 border-l-2 border-l-indigo-600' : 'hover:bg-slate-50 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:bg-zinc-800/50 border-l-2 border-l-transparent'}`}
              >
                {msg.status === 'unread' && <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-blue-500"></div>}
                {msg.status === 'escalated' && <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-red-500"></div>}
                
                <div className="flex justify-between items-start mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900 dark:text-white dark:text-slate-100">{msg.user}</span>
                    <Icon className="h-3 w-3 text-slate-500 dark:text-slate-400" />
                  </div>
                  <span className="text-xs text-slate-400 dark:text-slate-500 dark:text-slate-500 whitespace-nowrap ml-2">{msg.time}</span>
                </div>
                <p className={`text-sm line-clamp-2 ${msg.status === 'unread' ? 'text-slate-800 dark:text-slate-200 dark:text-slate-200 dark:text-slate-200 font-medium' : 'text-slate-500 dark:text-slate-400'}`}>
                  {msg.text}
                </p>
              </div>
            )})}
            {filteredMessages.length === 0 && (
              <div className="p-8 text-center text-slate-500 dark:text-slate-400 text-sm">
                No messages found.
              </div>
            )}
          </div>
        </div>

        {/* Right Pane: Thread & Reply */}
        <div className="flex-1 bg-white dark:bg-zinc-900/50 backdrop-blur-md/50 dark:backdrop-blur-md flex flex-col hidden lg:flex">
          {activeMsg ? (() => {
            const msg = messages.find(m => m.id === activeMsg)!;
            const Icon = getPlatformIcon(msg.platform);
            return (
              <>
                {/* Thread Header */}
                <div className="px-6 py-4 border-b border-slate-200 dark:border-zinc-800 flex justify-between items-center bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-800/50 shrink-0">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-zinc-700 overflow-hidden shrink-0 flex items-center justify-center text-slate-500 dark:text-slate-400 font-bold">
                      {msg.user[0]}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white dark:text-slate-100 flex items-center gap-2">
                        {msg.user}
                        <Icon className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{msg.handle} • {msg.platform}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={handleResolve} className="px-3 py-1.5 text-xs font-medium text-emerald-700 bg-emerald-100 hover:bg-emerald-200 rounded flex items-center gap-1 transition-colors">
                      <CheckCircle2 className="h-3 w-3" /> Resolve
                    </button>
                    <button className="p-1.5 text-slate-400 dark:text-slate-500 dark:text-slate-500 hover:text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:bg-zinc-700 rounded transition-colors">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Thread Body */}
                <div className="flex-1 overflow-y-auto p-6 bg-white dark:bg-zinc-900/50 backdrop-blur-md/50 dark:backdrop-blur-md space-y-6">
                  <div className="flex gap-4">
                    <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-zinc-700 overflow-hidden shrink-0 mt-1 flex items-center justify-center text-slate-500 dark:text-slate-400 font-bold">
                      {msg.user[0]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="font-bold text-sm text-slate-900 dark:text-white dark:text-slate-100">{msg.user}</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">{msg.time}</span>
                      </div>
                      <div className="p-3 bg-slate-100 dark:bg-zinc-800 rounded-2xl rounded-tl-none text-sm text-slate-800 dark:text-slate-200 dark:text-slate-200 dark:text-slate-200 inline-block">
                        {msg.text}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Reply Box */}
                <div className="p-4 border-t border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-800/50 shrink-0">
                  <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md/50 dark:backdrop-blur-md border border-slate-200 dark:border-zinc-800 rounded-xl focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 transition-all overflow-hidden flex flex-col">
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder={`Reply to ${msg.user}...`}
                      className="w-full p-3 outline-none resize-none text-sm text-slate-700 dark:text-slate-300 min-h-[100px]"
                    />
                    <div className="px-3 py-2 bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-800/50 border-t border-slate-100 dark:border-zinc-800 flex justify-between items-center">
                      <div className="flex gap-1 text-slate-400 dark:text-slate-500 dark:text-slate-500">
                        {/* Formatting icons could go here */}
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:text-slate-300 px-2">
                          Add Internal Note
                        </button>
                        <button onClick={handleReply} className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors shadow-sm">
                          <Reply className="h-3 w-3" />
                          Send Reply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })() : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 dark:text-slate-500">
              <MessageSquare className="h-12 w-12 mb-4 text-slate-200" />
              <p>Select a message to view the thread</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
