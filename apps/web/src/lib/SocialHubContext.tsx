"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { FaFacebook as Facebook, FaInstagram as Instagram, FaLinkedin as Linkedin, FaTwitter as Twitter, FaYoutube as Youtube } from "react-icons/fa";
import { addDays } from "date-fns";
import { getDepartments } from "@/actions/social/department";
import { getPosts, createPost, deletePost as deletePostAction, editPost as editPostAction } from "@/actions/social/post";
import { getMessages, updateMessageStatus as updateMsgStatusAction, replyToMessage } from "@/actions/social/message";
import { getChannels, connectMockChannel, disconnectChannel, updateChannel } from "@/actions/social/channel";
import { getStreams, createStream, deleteStream as deleteStreamAction } from "@/actions/social/stream";
import ComposerModal from "@/components/social/ComposerModal";

export type Post = {
  id: string;
  content: string;
  platforms: string[];
  time: string;
  date: Date;
  author: string;
  status: string;
  likes?: number;
  comments?: number;
  error?: string | null;
  color?: string;
};

type SocialHubContextType = {
  activeBrand: string;
  setActiveBrand: (brand: string) => void;
  brands: any[];
  addBrand: (brand: any) => void;
  posts: Post[];
  addPost: (post: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>) => void;
  deletePost: (id: string) => void;
  editPost: (id: string, data: Partial<Post>) => void;
  messages: any[];
  markAllMessagesRead: () => void;
  updateMessageStatus: (msgId: string, status: string) => void;
  addMessageReply: (msgId: string, reply: string) => void;
  connectedChannels: any[];
  connectChannel: (channel: any) => void;
  removeChannel: (id: string) => void;
  editChannel: (id: string, name: string, handle: string) => void;
  streams: any[];
  addStream: (stream: any) => void;
  deleteStream: (id: string) => void;
  isComposerOpen: boolean;
  setComposerOpen: (open: boolean) => void;
  editingPost: Post | null;
  setEditingPost: (post: Post | null) => void;
};

const SocialHubContext = createContext<SocialHubContextType | undefined>(undefined);

export function SocialHubProvider({ children }: { children: ReactNode }) {
  const [activeBrand, setActiveBrand] = useState("All Accounts");
  const [isComposerOpen, setComposerOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [brands, setBrands] = useState<any[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [connectedChannels, setConnectedChannels] = useState<any[]>([]);
  const [streams, setStreams] = useState<any[]>([]);

  useEffect(() => {
    async function loadData() {
      const [deptsData, postsData, msgsData, channelsData, streamsData] = await Promise.all([
        getDepartments(),
        getPosts(),
        getMessages(),
        getChannels(),
        getStreams()
      ]);
      setBrands(deptsData);
      setPosts(postsData as unknown as Post[]);
      setMessages(msgsData);
      
      // We map the raw icon strings to actual React components here for the UI
      const mapIcon = (platform: string) => {
        if (platform.includes('Facebook')) return Facebook;
        if (platform.includes('Instagram')) return Instagram;
        if (platform.includes('LinkedIn')) return Linkedin;
        if (platform.includes('Twitter') || platform.includes('X')) return Twitter;
        return Facebook;
      };

      setConnectedChannels(channelsData.map(c => ({ ...c, icon: mapIcon(c.platform) })));
      setStreams(streamsData.map(s => ({ ...s, icon: mapIcon(s.platform) })));
      setLoading(false);
    }
    loadData();
  }, []);

  const addBrand = (brand: any) => {
    // Ideally this calls a server action, but for optimistic UI:
    setBrands([...brands, { ...brand, id: Date.now().toString(), members: 1, connected: 0 }]);
  };

  const addPost = async (post: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>) => {
    // Optimistic
    const tempId = Date.now().toString();
    setPosts([{ ...post, id: tempId } as unknown as Post, ...posts]);
    
    // Server
    const newPost = await createPost({
      content: post.content,
      platforms: post.platforms,
      time: post.time,
      date: post.date,
      author: post.author,
      status: post.status,
      color: post.color || "bg-slate-100 text-slate-700 border-slate-200"
    });
    
    setPosts(prev => prev.map(p => p.id === tempId ? (newPost as unknown as Post) : p));
  };

  const deletePost = async (id: string) => {
    setPosts(posts.filter(p => p.id !== id));
    await deletePostAction(id);
  };

  const editPost = async (id: string, data: Partial<Post>) => {
    setPosts(posts.map(p => p.id === id ? { ...p, ...data } as Post : p));
    const updatedPost = await editPostAction(id, data);
    setPosts(prev => prev.map(p => p.id === id ? (updatedPost as unknown as Post) : p));
  };

  const markAllMessagesRead = async () => {
    setMessages(messages.map(m => ({ ...m, status: 'read' })));
    for (const m of messages) {
      if (m.status === 'unread') await updateMsgStatusAction(m.id, 'read');
    }
  };

  const updateMessageStatus = async (msgId: string, status: string) => {
    setMessages(messages.map(m => m.id === msgId ? { ...m, status } : m));
    await updateMsgStatusAction(msgId, status);
  };

  const addMessageReply = async (msgId: string, reply: string) => {
    setMessages(messages.map(m => {
      if (m.id === msgId) {
        return {
          ...m,
          status: 'read',
          replies: [...m.replies, { text: reply, time: 'Just now', author: 'You' }]
        };
      }
      return m;
    }));
    await replyToMessage(msgId, reply);
  };

  const connectChannel = async (channel: any) => {
    const tempId = Date.now().toString();
    const newChannel = { ...channel, id: tempId, status: 'connected', name: 'New Connection', handle: '@new_account', bg: 'bg-indigo-100' };
    setConnectedChannels([...connectedChannels, newChannel]);
    
    // Server action
    const saved = await connectMockChannel({
      platform: channel.platform,
      name: 'New Connection',
      handle: '@new_account',
      color: channel.color,
      bg: 'bg-indigo-100'
    });
    
    setConnectedChannels(prev => prev.map(c => c.id === tempId ? { ...saved, icon: channel.icon } : c));
  };

  const removeChannel = async (id: string) => {
    setConnectedChannels(connectedChannels.filter(c => c.id !== id));
    await disconnectChannel(id);
  };

  const editChannel = async (id: string, name: string, handle: string) => {
    setConnectedChannels(connectedChannels.map(c => c.id === id ? { ...c, name, handle } : c));
    await updateChannel(id, { name, handle });
  };

  const addStream = async (stream: any) => {
    const tempId = Date.now().toString();
    // optimistic
    setStreams([...streams, { ...stream, id: tempId, posts: [] }]);
    
    // server
    const saved = await createStream({
      title: stream.title,
      keyword: stream.keyword,
      platform: stream.platform,
      color: stream.color || 'text-sky-500'
    });
    
    // update with real id and mock posts
    setStreams(prev => prev.map(s => s.id === tempId ? { ...saved, icon: stream.icon } : s));
  };

  const deleteStream = async (id: string) => {
    setStreams(streams.filter(s => s.id !== id));
    await deleteStreamAction(id);
  };

  if (loading) {
    return <div className="h-screen w-screen flex items-center justify-center bg-slate-50"><div className="animate-spin h-8 w-8 border-4 border-indigo-600 border-t-transparent rounded-full"></div></div>;
  }

  return (
    <SocialHubContext.Provider value={{ 
      activeBrand, setActiveBrand, 
      brands, addBrand, 
      posts, addPost, deletePost, editPost,
      messages, markAllMessagesRead, updateMessageStatus, addMessageReply,
      connectedChannels, connectChannel, removeChannel, editChannel,
      streams, addStream, deleteStream,
      isComposerOpen, setComposerOpen,
      editingPost, setEditingPost
    }}>
      {children}
      <ComposerModal />
    </SocialHubContext.Provider>
  );
}

export function useSocialHub() {
  const context = useContext(SocialHubContext);
  if (context === undefined) {
    throw new Error("useSocialHub must be used within a SocialHubProvider");
  }
  return context;
}
