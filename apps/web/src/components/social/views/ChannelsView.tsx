"use client";

import { Plus, CheckCircle2, AlertCircle, X, Loader2 } from "lucide-react";
import { FaFacebook as Facebook, FaInstagram as Instagram, FaLinkedin as Linkedin, FaTwitter as Twitter, FaYoutube as Youtube } from "react-icons/fa";
import { useState } from "react";

import { useSocialHub } from "@/lib/SocialHubContext";

export default function ChannelsView() {
  const { connectedChannels, connectChannel, removeChannel, editChannel } = useSocialHub();
  const [authenticatingChannel, setAuthenticatingChannel] = useState<any>(null);
  const [oauthStep, setOauthStep] = useState<'intro' | 'login' | 'permissions'>('intro');
  const [editingChannel, setEditingChannel] = useState<any>(null);
  const [editName, setEditName] = useState("");
  const [editHandle, setEditHandle] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);

  const availableChannels = [
    { platform: 'Facebook', icon: Facebook, color: 'text-blue-600', description: 'Connect your Facebook Pages and Groups.' },
    { platform: 'Instagram', icon: Instagram, color: 'text-pink-600', description: 'Publish photos and reels to Instagram.' },
    { platform: 'X (Twitter)', icon: Twitter, color: 'text-sky-500', description: 'Schedule tweets and thread updates.' },
    { platform: 'LinkedIn', icon: Linkedin, color: 'text-blue-700', description: 'Post to personal profiles and company pages.' },
    { platform: 'YouTube', icon: Youtube, color: 'text-red-600', description: 'Publish videos and shorts directly to your channel.' },
    { platform: 'TikTok', icon: () => <span className="font-bold text-lg">d</span>, color: 'text-black', description: 'Schedule and auto-publish TikTok videos.' },
    { platform: 'Google Business', icon: () => <span className="font-bold text-lg text-blue-500">G</span>, color: 'text-blue-500', description: 'Post updates, offers, and events to Google.' },
    { platform: 'Pinterest', icon: () => <span className="font-bold text-lg text-red-500">P</span>, color: 'text-red-500', description: 'Schedule pins to your boards.' },
  ];

  const handleConnectClick = (channel: any) => {
    setOauthStep('intro');
    setAuthenticatingChannel(channel);
  };

  const handleAuthorize = async () => {
    setIsConnecting(true);
    
    // Since we don't have real OAuth credentials in the .env file for the demo,
    // we will use the mock connection flow for all platforms.
    setTimeout(() => {
      connectChannel(authenticatingChannel);
      setIsConnecting(false);
      setAuthenticatingChannel(null);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white dark:text-slate-100">Social Channels</h1>
        <p className="text-slate-500 dark:text-slate-400">Connect and manage your brand&apos;s social media profiles.</p>
      </div>

      <div>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white dark:text-slate-100 mb-4">Connected Channels</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {connectedChannels.map(channel => (
            <div key={channel.id} className="bg-white dark:bg-zinc-900/50 backdrop-blur-md/50 dark:backdrop-blur-md p-5 rounded-xl border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
              <div className="flex items-start justify-between mb-4">
                <div className={`h-10 w-10 rounded-lg ${channel.bg} flex items-center justify-center`}>
                  {channel.icon && <channel.icon className={`h-5 w-5 ${channel.color}`} />}
                </div>
                {channel.status === 'connected' ? (
                  <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-1 rounded text-xs font-medium">
                    <CheckCircle2 className="h-3 w-3" /> Connected
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-red-600 bg-red-50 px-2 py-1 rounded text-xs font-medium">
                    <AlertCircle className="h-3 w-3" /> Reconnect
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white dark:text-slate-100">{channel.name}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{channel.handle}</p>
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-zinc-800 flex gap-2">
                  <button onClick={() => setEditingChannel(channel)} className="flex-1 px-3 py-1.5 bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-800/50 hover:bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-slate-300 text-sm font-medium rounded-md transition-colors">
                    Edit
                  </button>
                  <button onClick={() => removeChannel(channel.id)} className="flex-1 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium rounded-md transition-colors">
                    Disconnect
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white dark:text-slate-100 mb-4">Connect New Channel</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {availableChannels.map(channel => (
            <div 
              key={channel.platform} 
              onClick={() => handleConnectClick(channel)}
              className="bg-white dark:bg-zinc-900/50 backdrop-blur-md/50 dark:backdrop-blur-md p-5 rounded-xl border border-slate-200 dark:border-zinc-800 shadow-sm flex items-center gap-4 hover:border-indigo-300 transition-colors cursor-pointer group"
            >
              <div className="h-12 w-12 rounded-lg bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-800/50 border border-slate-100 dark:border-zinc-800 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
                <channel.icon className={`h-6 w-6 ${channel.color}`} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-900 dark:text-white dark:text-slate-100">{channel.platform}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-tight">{channel.description}</p>
              </div>
              <button className="h-8 w-8 rounded-full bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-800/50 flex items-center justify-center text-slate-400 dark:text-slate-500 dark:text-slate-500 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors shrink-0">
                <Plus className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {authenticatingChannel && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md/50 dark:backdrop-blur-md rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 text-center relative border-b border-slate-100 dark:border-zinc-800">
              <button 
                onClick={() => !isConnecting && setAuthenticatingChannel(null)}
                className="absolute right-4 top-4 text-slate-400 dark:text-slate-500 dark:text-slate-500 hover:text-slate-600 dark:text-slate-300 transition-colors"
                disabled={isConnecting}
              >
                <X className="h-5 w-5" />
              </button>
              
              {oauthStep === 'intro' && (
                <>
                  <div className="mx-auto h-16 w-16 bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-800/50 border border-slate-100 dark:border-zinc-800 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                    <authenticatingChannel.icon className={`h-8 w-8 ${authenticatingChannel.color}`} />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white dark:text-slate-100">Connect to {authenticatingChannel.platform}</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                    You will be redirected to {authenticatingChannel.platform} to securely authenticate and grant permissions to My Institution.
                  </p>
                </>
              )}

              {oauthStep === 'login' && (
                <>
                  <div className="mx-auto flex items-center justify-center mb-4">
                     <authenticatingChannel.icon className={`h-10 w-10 ${authenticatingChannel.color}`} />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white dark:text-slate-100">Sign in to {authenticatingChannel.platform}</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                    Enter your credentials to continue.
                  </p>
                </>
              )}

              {oauthStep === 'permissions' && (
                <>
                  <div className="mx-auto flex items-center justify-center gap-4 mb-4">
                    <authenticatingChannel.icon className={`h-10 w-10 ${authenticatingChannel.color}`} />
                    <div className="h-0.5 w-8 bg-slate-200 dark:bg-zinc-700"></div>
                    <div className="h-10 w-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">MI</div>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white dark:text-slate-100">Authorize Application</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                    My Institution is requesting access to your {authenticatingChannel.platform} account.
                  </p>
                </>
              )}
            </div>
            
            <div className="p-6 bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-800/50 space-y-4">
              {oauthStep === 'intro' && (
                <button 
                  onClick={() => setOauthStep('login')}
                  className="w-full flex justify-center items-center gap-2 bg-[#1877F2] hover:bg-[#1864D9] text-white py-2.5 rounded-lg font-medium transition-colors mt-2"
                >
                  Continue to {authenticatingChannel.platform}
                </button>
              )}

              {oauthStep === 'login' && (
                <div className="space-y-4">
                  <input type="email" placeholder="Email or Username" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900 dark:text-white dark:text-slate-100 focus:ring-indigo-500 focus:border-indigo-500" />
                  <input type="password" placeholder="Password" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900 dark:text-white dark:text-slate-100 focus:ring-indigo-500 focus:border-indigo-500" />
                  <button 
                    onClick={() => setOauthStep('permissions')}
                    className="w-full flex justify-center items-center gap-2 bg-[#1877F2] hover:bg-[#1864D9] text-white py-2.5 rounded-lg font-medium transition-colors"
                  >
                    Log In
                  </button>
                  <p className="text-xs text-center text-slate-500 dark:text-slate-400">This is a secure connection mock flow for the demo.</p>
                </div>
              )}

              {oauthStep === 'permissions' && (
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                      Publish content on your behalf
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                      Read profile analytics and engagement
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                      Manage inbound messages
                    </div>
                  </div>

                  <button 
                    onClick={handleAuthorize}
                    disabled={isConnecting}
                    className="w-full flex justify-center items-center gap-2 bg-[#1877F2] hover:bg-[#1864D9] text-white py-2.5 rounded-lg font-medium transition-colors disabled:opacity-70 mt-6"
                  >
                    {isConnecting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Authorizing...
                      </>
                    ) : (
                      <>Allow Access</>
                    )}
                  </button>
                  <p className="text-xs text-center text-slate-400 dark:text-slate-500 dark:text-slate-500">
                    You can revoke this access at any time in your {authenticatingChannel.platform} settings.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {editingChannel && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md/50 dark:backdrop-blur-md rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 relative border-b border-slate-100 dark:border-zinc-800">
              <button 
                onClick={() => setEditingChannel(null)}
                className="absolute right-4 top-4 text-slate-400 dark:text-slate-500 dark:text-slate-500 hover:text-slate-600 dark:text-slate-300 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white dark:text-slate-100">Edit Channel</h2>
            </div>
            
            <div className="p-6 bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-800/50 space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Channel Name</label>
                  <input 
                    type="text" 
                    defaultValue={editingChannel.name}
                    onChange={e => setEditName(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900 dark:text-white dark:text-slate-100 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Handle</label>
                  <input 
                    type="text" 
                    defaultValue={editingChannel.handle}
                    onChange={e => setEditHandle(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900 dark:text-white dark:text-slate-100 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button 
                  onClick={() => setEditingChannel(null)}
                  className="px-4 py-2 text-slate-700 dark:text-slate-300 bg-white dark:bg-zinc-900/50 backdrop-blur-md/50 dark:backdrop-blur-md border border-slate-300 hover:bg-slate-50 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:bg-zinc-800/50 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    editChannel(editingChannel.id, editName || editingChannel.name, editHandle || editingChannel.handle);
                    setEditingChannel(null);
                  }}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
