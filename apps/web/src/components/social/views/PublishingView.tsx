"use client";

import { Plus, Search, Filter, Calendar, Clock, CheckCircle2, AlertCircle, Edit2, Trash2, MoreVertical } from "lucide-react";
import { useState } from "react";
import UniversalComposer from "@/components/social/publishing/UniversalComposer";
import { useSocialHub } from "@/lib/SocialHubContext";

export default function PublishingView() {
  const { posts, deletePost, setComposerOpen, setEditingPost } = useSocialHub();
  const [activeTab, setActiveTab] = useState('scheduled');

  const getActivePosts = () => {
    return posts.filter(p => p.status === activeTab);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white dark:text-slate-100">Publishing</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage your drafts, scheduled posts, and publishing history.</p>
        </div>
        <button 
          onClick={() => setComposerOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm font-medium"
        >
          <Plus className="h-4 w-4" />
          New Post
        </button>
      </div>

      <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md/50 dark:backdrop-blur-md rounded-xl border border-slate-200 dark:border-zinc-800 shadow-sm flex-1 flex flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex space-x-1 bg-slate-100 dark:bg-zinc-800 p-1 rounded-lg">
            <button 
              onClick={() => setActiveTab('drafts')}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${activeTab === 'drafts' ? 'bg-white dark:bg-zinc-900/50 backdrop-blur-md/50 dark:backdrop-blur-md text-slate-900 dark:text-white dark:text-slate-100 shadow-sm' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:text-white dark:text-slate-100'}`}
            >
              Drafts <span className="ml-1 text-xs text-slate-400 dark:text-slate-500 dark:text-slate-500">({posts.filter(p=>p.status==='draft').length})</span>
            </button>
            <button 
              onClick={() => setActiveTab('scheduled')}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${activeTab === 'scheduled' ? 'bg-white dark:bg-zinc-900/50 backdrop-blur-md/50 dark:backdrop-blur-md text-slate-900 dark:text-white dark:text-slate-100 shadow-sm' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:text-white dark:text-slate-100'}`}
            >
              Scheduled <span className="ml-1 text-xs text-slate-400 dark:text-slate-500 dark:text-slate-500">({posts.filter(p=>p.status==='scheduled').length})</span>
            </button>
            <button 
              onClick={() => setActiveTab('published')}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${activeTab === 'published' ? 'bg-white dark:bg-zinc-900/50 backdrop-blur-md/50 dark:backdrop-blur-md text-slate-900 dark:text-white dark:text-slate-100 shadow-sm' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:text-white dark:text-slate-100'}`}
            >
              Published
            </button>
            <button 
              onClick={() => setActiveTab('failed')}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${activeTab === 'failed' ? 'bg-white dark:bg-zinc-900/50 backdrop-blur-md/50 dark:backdrop-blur-md text-red-600 shadow-sm' : 'text-slate-600 dark:text-slate-300 hover:text-red-600'}`}
            >
              Failed <span className="ml-1 text-xs text-slate-400 dark:text-slate-500 dark:text-slate-500">({posts.filter(p=>p.status==='failed').length})</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400 dark:text-slate-500 dark:text-slate-500" />
              <input
                type="text"
                placeholder="Search posts..."
                className="w-full sm:w-64 rounded-md border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 backdrop-blur-md/50 dark:backdrop-blur-md py-2 pl-9 pr-4 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <button className="p-2 border border-slate-200 dark:border-zinc-800 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:bg-zinc-800/50 tooltip-trigger" title="Filter">
              <Filter className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Post List */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-800/50">
          <div className="space-y-4">
            {getActivePosts().map(post => (
              <div key={post.id} className="bg-white dark:bg-zinc-900/50 backdrop-blur-md/50 dark:backdrop-blur-md rounded-lg border border-slate-200 dark:border-zinc-800 p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      {post.platforms.map(p => (
                        <span key={p} className="text-xs font-semibold px-2 py-1 rounded bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-slate-300">{p}</span>
                      ))}
                      <span className="text-slate-300">•</span>
                      <span className="text-sm font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        {post.status === 'scheduled' && <Clock className="h-3 w-3 text-amber-500" />}
                        {post.status === 'draft' && <Edit2 className="h-3 w-3 text-slate-400 dark:text-slate-500 dark:text-slate-500" />}
                        {post.status === 'published' && <CheckCircle2 className="h-3 w-3 text-emerald-500" />}
                        {post.status === 'failed' && <AlertCircle className="h-3 w-3 text-red-500" />}
                        {post.time}
                      </span>
                    </div>
                    <p className="text-slate-800 dark:text-slate-200 dark:text-slate-200 dark:text-slate-200 whitespace-pre-wrap">{post.content}</p>
                    
                    {post.error && (
                      <div className="mt-3 p-2 bg-red-50 border border-red-100 rounded text-sm text-red-700 flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" /> Error: {post.error}
                      </div>
                    )}
                    
                    {post.status === 'published' && (
                      <div className="mt-4 flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                        <span className="font-medium">❤️ {post.likes}</span>
                        <span className="font-medium">💬 {post.comments}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => {
                        setEditingPost(post);
                        setComposerOpen(true);
                      }}
                      className="p-2 text-slate-400 dark:text-slate-500 dark:text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button onClick={() => deletePost(post.id)} className="p-2 text-slate-400 dark:text-slate-500 dark:text-slate-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-slate-400 dark:text-slate-500 dark:text-slate-500 hover:text-slate-800 dark:text-slate-200 dark:text-slate-200 dark:text-slate-200 hover:bg-slate-100 dark:bg-zinc-800 rounded transition-colors">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-slate-200 dark:bg-zinc-700 overflow-hidden">
                      <img src={`https://ui-avatars.com/api/?name=${post.author}&background=random`} alt={post.author} />
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400">Created by <span className="font-medium text-slate-700 dark:text-slate-300">{post.author}</span></span>
                  </div>
                  
                  {post.status === 'failed' && (
                    <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">Retry Now</button>
                  )}
                </div>
              </div>
            ))}
            
            {getActivePosts().length === 0 && (
              <div className="text-center py-12">
                <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-6 w-6 text-slate-400 dark:text-slate-500 dark:text-slate-500" />
                </div>
                <h3 className="text-lg font-medium text-slate-900 dark:text-white dark:text-slate-100 mb-1">No posts found</h3>
                <p className="text-slate-500 dark:text-slate-400">You don&apos;t have any {activeTab} posts right now.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
    </div>
  );
}
