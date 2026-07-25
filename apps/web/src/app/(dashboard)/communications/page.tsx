"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import AuditLogView from "@/components/users/views/AuditLogView";

function CommunicationsContent() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "dashboard";
  const [saveStatus, setSaveStatus] = React.useState('');
  const [copyStatus, setCopyStatus] = React.useState('');
  const [showFlowModal, setShowFlowModal] = React.useState(false);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      
      {activeTab === "dashboard" && (
        <div className="space-y-8 animate-in fade-in duration-500">
          <header>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Communications Hub</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2">Centralized Omnichannel (WhatsApp, SMS, Email) API management.</p>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md p-6 rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm border-l-4 border-l-blue-500">
              <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium">Total Messages Sent</h3>
              <p className="text-3xl font-extrabold mt-2 dark:text-white text-zinc-900 dark:text-white">12,450</p>
              <p className="text-sm text-green-500 mt-2 font-medium">+1,200 This Month</p>
            </div>
            <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md p-6 rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm border-l-4 border-l-green-500">
              <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium">Delivery Rate</h3>
              <p className="text-3xl font-extrabold mt-2 dark:text-white text-zinc-900 dark:text-white">98.4%</p>
              <p className="text-sm text-green-500 mt-2 font-medium">Healthy</p>
            </div>
            <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md p-6 rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm border-l-4 border-l-purple-500">
              <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium">Active Chatbots</h3>
              <p className="text-3xl font-extrabold mt-2 dark:text-white text-zinc-900 dark:text-white">3</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">Handling 45% of queries</p>
            </div>
            <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md p-6 rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm border-l-4 border-l-amber-500">
              <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium">Unread Inbox</h3>
              <p className="text-3xl font-extrabold mt-2 dark:text-white text-zinc-900 dark:text-white">14</p>
              <p className="text-sm text-amber-500 mt-2 font-medium">Requires attention</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
             <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm p-6 flex items-center justify-center min-h-[300px]">
                <div className="text-center">
                   <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-2xl mx-auto flex items-center justify-center mb-4 text-3xl">💬</div>
                   <h3 className="text-lg font-bold">API Connections Active</h3>
                   <p className="text-zinc-500 dark:text-zinc-400 dark:text-zinc-400 text-sm mt-2 max-w-sm">Your omnichannel integrations (WhatsApp, SMS, Email) are currently receiving webhooks and processing messages successfully.</p>
                </div>
             </div>
             
             <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm p-6">
                <h3 className="font-bold mb-4">Recent Broadcasts</h3>
                <div className="space-y-4">
                   <div className="flex justify-between items-center pb-3 border-b border-zinc-100 dark:border-zinc-800">
                      <div>
                         <p className="font-semibold text-sm">Fee Reminder - Grade 10</p>
                         <p className="text-xs text-zinc-500 dark:text-zinc-400 dark:text-zinc-400">Sent to 142 parents</p>
                      </div>
                      <div className="text-right">
                         <span className="text-xs font-bold text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-md">100% Delivered</span>
                      </div>
                   </div>
                   <div className="flex justify-between items-center pb-3 border-b border-zinc-100 dark:border-zinc-800">
                      <div>
                         <p className="font-semibold text-sm">Holiday Announcement (Diwali)</p>
                         <p className="text-xs text-zinc-500 dark:text-zinc-400 dark:text-zinc-400">Sent to 1,200 parents</p>
                      </div>
                      <div className="text-right">
                         <span className="text-xs font-bold text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-md">98% Delivered</span>
                      </div>
                   </div>
                   <div className="flex justify-between items-center">
                      <div>
                         <p className="font-semibold text-sm">Admissions Open 2026</p>
                         <p className="text-xs text-zinc-500 dark:text-zinc-400 dark:text-zinc-400">Sent to 400 prospects</p>
                      </div>
                      <div className="text-right">
                         <span className="text-xs font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-md">In Progress</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      )}

      {activeTab === "inbox" && (
        <div className="animate-in fade-in duration-500 flex flex-col h-[calc(100vh-140px)]">
           <header className="mb-6">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Shared Team Inbox</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2">Manage all incoming WhatsApp conversations.</p>
          </header>
          
          <div className="flex-1 bg-white dark:bg-zinc-900/50 backdrop-blur-md rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm overflow-hidden flex">
             {/* Chat List */}
             <div className="w-1/3 border-r border-slate-100 dark:border-zinc-800 flex flex-col">
                <div className="p-4 border-b border-slate-100 dark:border-zinc-800">
                   <input type="text" placeholder="Search chats..." className="w-full bg-zinc-50 dark:bg-zinc-950 dark:bg-zinc-950 dark:bg-black border border-zinc-200 dark:border-zinc-800 dark:border-zinc-700 rounded-lg px-4 py-2 text-sm" />
                </div>
                <div className="flex-1 overflow-y-auto">
                   <div className="p-4 border-b border-slate-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 dark:bg-zinc-950 dark:hover:bg-zinc-800/40 dark:bg-zinc-950 dark:hover:bg-zinc-800/50 cursor-pointer bg-blue-50/50 dark:bg-blue-900/10">
                      <div className="flex justify-between items-start mb-1">
                         <h4 className="font-bold text-sm">Sarah Jenkins (Lead)</h4>
                         <span className="text-[10px] text-zinc-400">10:05 AM</span>
                      </div>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 dark:text-zinc-400 truncate">Yes, we would love to schedule a tour!</p>
                   </div>
                   <div className="p-4 border-b border-slate-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 dark:bg-zinc-950 dark:hover:bg-zinc-800/40 dark:bg-zinc-950 dark:hover:bg-zinc-800/50 cursor-pointer">
                      <div className="flex justify-between items-start mb-1">
                         <h4 className="font-bold text-sm">Rahul Sharma (Parent)</h4>
                         <span className="text-[10px] text-zinc-400">Yesterday</span>
                      </div>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 dark:text-zinc-400 truncate">I paid the fees via portal. Please check.</p>
                   </div>
                </div>
             </div>
             
             {/* Chat Window */}
             <div className="w-2/3 flex flex-col">
                <div className="p-4 border-b border-slate-100 dark:border-zinc-800 flex justify-between items-center bg-zinc-50 dark:bg-zinc-950 dark:bg-zinc-950 dark:bg-zinc-950">
                   <div>
                      <h3 className="font-bold">Sarah Jenkins</h3>
                      <p className="text-xs text-green-600 flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block"></span> Online (WhatsApp)</p>
                   </div>
                   <div className="flex gap-2">
                      <button className="px-3 py-1.5 bg-white dark:bg-zinc-900/50 backdrop-blur-md dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 dark:border-zinc-700 rounded-lg text-xs font-semibold">Mark Resolved</button>
                   </div>
                </div>
                
                <div className="flex-1 p-6 overflow-y-auto bg-[#efeae2] dark:bg-[#0a0a0a]" style={{backgroundImage: "url('https://raw.githubusercontent.com/tailwindlabs/tailwindcss/master/.github/logo.svg')", backgroundSize: 'cover', backgroundBlendMode: 'soft-light'}}>
                   <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md/80 dark:bg-black/50 backdrop-blur-sm p-2 rounded-lg self-center text-xs text-zinc-500 dark:text-zinc-400 dark:text-zinc-400 font-medium mb-4 w-max mx-auto">Today</div>
                   
                   <div className="flex flex-col gap-4">
                      <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md dark:bg-zinc-800 p-3 rounded-xl rounded-tl-sm self-start max-w-[70%] shadow-sm text-sm">
                         <p className="text-xs text-blue-600 font-bold mb-1">System Message</p>
                         <p>Lead generated from Meta Ads campaign.</p>
                         <span className="text-[10px] text-zinc-400 block text-right mt-1">10:00 AM</span>
                      </div>
                      
                      <div className="bg-[#dcf8c6] dark:bg-[#056162] p-3 rounded-xl rounded-tr-sm self-end max-w-[70%] shadow-sm text-sm">
                         <p>Hi Sarah, thanks for your interest in My Institution! Would you like to schedule a campus tour?</p>
                         <span className="text-[10px] text-[#075e54]/70 dark:text-white/50 block text-right mt-1">10:05 AM ✓✓</span>
                      </div>
                      
                      <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md dark:bg-zinc-800 p-3 rounded-xl rounded-tl-sm self-start max-w-[70%] shadow-sm text-sm">
                         <p>Yes, we would love to schedule a tour! Is tomorrow morning available?</p>
                         <span className="text-[10px] text-zinc-400 block text-right mt-1">10:07 AM</span>
                      </div>
                   </div>
                </div>
                
                <div className="p-4 bg-white dark:bg-zinc-900/50 backdrop-blur-md dark:bg-zinc-950 border-t border-slate-100 dark:border-zinc-800 flex gap-2">
                   <button className="text-zinc-400 hover:text-zinc-600 dark:text-zinc-300 dark:text-zinc-300 px-2">📎</button>
                   <input type="text" placeholder="Type a message..." className="flex-1 bg-zinc-100 dark:bg-zinc-800 dark:bg-zinc-900 border-none rounded-xl px-4 py-2 text-sm focus:ring-0" />
                   <button className="bg-blue-600 text-white px-6 py-2 rounded-xl font-medium shadow-sm">Send</button>
                </div>
             </div>
          </div>
        </div>
      )}

      {activeTab === "broadcasts" && (
        <div className="animate-in fade-in duration-500">
           <header className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Broadcasts</h1>
              <p className="text-slate-500 dark:text-slate-400 mt-2">Send bulk WhatsApp, SMS, or Email messages to filtered audiences.</p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-blue-500/30">
              + New Broadcast
            </button>
          </header>
          
          <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm p-8">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                   <h3 className="font-bold mb-4">Select Audience & Channel</h3>
                   <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                         <div>
                            <label className="block text-sm font-medium mb-1">Channel</label>
                            <select className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 dark:bg-zinc-950 dark:bg-black px-4 py-2">
                               <option>WhatsApp</option>
                               <option>SMS Text</option>
                               <option>Email</option>
                            </select>
                         </div>
                         <div>
                            <label className="block text-sm font-medium mb-1">Module</label>
                            <select className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 dark:bg-zinc-950 dark:bg-black px-4 py-2">
                               <option>Fees (Defaulters)</option>
                               <option>Admissions (Leads)</option>
                               <option>All Parents</option>
                            </select>
                         </div>
                      </div>
                      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-900 text-sm">
                         <p className="font-bold text-blue-800 dark:text-blue-300">Audience Size: 142 Contacts</p>
                         <p className="text-blue-600 dark:text-blue-400 mt-1">Estimated Cost: $1.42 (Meta Utility Tier)</p>
                      </div>
                   </div>
                </div>
                
                <div>
                   <h3 className="font-bold mb-4">Select Template</h3>
                   <div className="space-y-4">
                      <div>
                         <label className="block text-sm font-medium mb-1">Approved Templates</label>
                         <select className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 dark:bg-zinc-950 dark:bg-black px-4 py-2">
                            <option>fee_reminder_v2 (Utility)</option>
                            <option>admissions_open (Marketing)</option>
                         </select>
                      </div>
                      <div className="p-4 border border-zinc-200 dark:border-zinc-800 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-950 dark:bg-zinc-950 dark:bg-black text-sm font-mono whitespace-pre-wrap">
                         Hello &#123;&#123;1&#125;&#125;,\n\nThis is a gentle reminder that the fee for &#123;&#123;2&#125;&#125; is due on &#123;&#123;3&#125;&#125;. Please click the button below to pay.\n\n[PAY NOW]
                      </div>
                   </div>
                </div>
             </div>
             
             <div className="mt-8 flex justify-end">
                <button className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30">Launch Broadcast</button>
             </div>
          </div>
        </div>
      )}

      {activeTab === 'templates' && (
        <div className="animate-in fade-in duration-500">
           <header className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Message Templates</h1>
              <p className="text-slate-500 dark:text-slate-400 mt-2">Manage pre-approved WhatsApp templates and SMS/Email drafts.</p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-blue-500/30">
              + Create Template
            </button>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Template Card 1 */}
            <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md p-6 rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-md">Approved</span>
                  <span className="text-xl">💬</span>
                </div>
                <h3 className="font-bold text-lg">fee_reminder_v2</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 dark:text-zinc-400 mb-4">Category: Utility • Language: en_US</p>
                <div className="p-3 bg-zinc-50 dark:bg-zinc-950 dark:bg-zinc-950 dark:bg-zinc-950 rounded-xl text-sm font-mono text-zinc-600 dark:text-zinc-300 dark:text-zinc-300 dark:text-zinc-400 mb-4 line-clamp-3">
                  Hello &#123;&#123;1&#125;&#125;,\nThis is a gentle reminder that the fee for &#123;&#123;2&#125;&#125; is due. Please click the button below to pay.
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 py-1.5 border border-zinc-200 dark:border-zinc-800 dark:border-zinc-700 rounded-lg text-xs font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800/40 dark:bg-zinc-950 dark:hover:bg-zinc-800/40 dark:bg-zinc-950 dark:hover:bg-zinc-800 transition-colors">Edit</button>
                <button className="flex-1 py-1.5 border border-zinc-200 dark:border-zinc-800 dark:border-zinc-700 rounded-lg text-xs font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800/40 dark:bg-zinc-950 dark:hover:bg-zinc-800/40 dark:bg-zinc-950 dark:hover:bg-zinc-800 transition-colors">Duplicate</button>
              </div>
            </div>

            {/* Template Card 2 */}
            <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md p-6 rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-md">Approved</span>
                  <span className="text-xl">💬</span>
                </div>
                <h3 className="font-bold text-lg">admissions_open</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 dark:text-zinc-400 mb-4">Category: Marketing • Language: en_US</p>
                <div className="p-3 bg-zinc-50 dark:bg-zinc-950 dark:bg-zinc-950 dark:bg-zinc-950 rounded-xl text-sm font-mono text-zinc-600 dark:text-zinc-300 dark:text-zinc-300 dark:text-zinc-400 mb-4 line-clamp-3">
                  Great news! Admissions for the upcoming academic year are now open. Apply early to secure your spot.
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 py-1.5 border border-zinc-200 dark:border-zinc-800 dark:border-zinc-700 rounded-lg text-xs font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800/40 dark:bg-zinc-950 dark:hover:bg-zinc-800/40 dark:bg-zinc-950 dark:hover:bg-zinc-800 transition-colors">Edit</button>
                <button className="flex-1 py-1.5 border border-zinc-200 dark:border-zinc-800 dark:border-zinc-700 rounded-lg text-xs font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800/40 dark:bg-zinc-950 dark:hover:bg-zinc-800/40 dark:bg-zinc-950 dark:hover:bg-zinc-800 transition-colors">Duplicate</button>
              </div>
            </div>

            {/* Template Card 3 */}
            <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md p-6 rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 px-2 py-1 rounded-md">Pending</span>
                  <span className="text-xl">💬</span>
                </div>
                <h3 className="font-bold text-lg">holiday_announcement</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 dark:text-zinc-400 mb-4">Category: Utility • Language: en_US</p>
                <div className="p-3 bg-zinc-50 dark:bg-zinc-950 dark:bg-zinc-950 dark:bg-zinc-950 rounded-xl text-sm font-mono text-zinc-600 dark:text-zinc-300 dark:text-zinc-300 dark:text-zinc-400 mb-4 line-clamp-3">
                  Dear Parents, the institution will remain closed on &#123;&#123;1&#125;&#125; due to &#123;&#123;2&#125;&#125;. Happy Holidays!
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 py-1.5 border border-zinc-200 dark:border-zinc-800 dark:border-zinc-700 rounded-lg text-xs font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800/40 dark:bg-zinc-950 dark:hover:bg-zinc-800/40 dark:bg-zinc-950 dark:hover:bg-zinc-800 transition-colors text-zinc-400 cursor-not-allowed">Edit</button>
                <button className="flex-1 py-1.5 border border-zinc-200 dark:border-zinc-800 dark:border-zinc-700 rounded-lg text-xs font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800/40 dark:bg-zinc-950 dark:hover:bg-zinc-800/40 dark:bg-zinc-950 dark:hover:bg-zinc-800 transition-colors text-zinc-400 cursor-not-allowed">Duplicate</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="animate-in fade-in duration-500">
           <header className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">API Settings</h1>
              <p className="text-slate-500 dark:text-slate-400 mt-2">Manage your Omnichannel API integrations and webhooks.</p>
            </div>
            <button 
              onClick={() => { setSaveStatus('Saving...'); setTimeout(() => setSaveStatus(''), 2000) }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-blue-500/30">
              {saveStatus || "Save Changes"}
            </button>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Meta WhatsApp Settings */}
            <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-6">
                 <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-xl flex items-center justify-center text-xl">💬</div>
                 <h2 className="text-xl font-bold">Meta WhatsApp API</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Permanent Access Token</label>
                  <input type="password" value="EAXXXXXXXXXXXX" readOnly className="w-full bg-zinc-50 dark:bg-zinc-950 dark:bg-zinc-950 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 dark:border-zinc-700 rounded-xl px-4 py-2 text-sm text-zinc-500 dark:text-zinc-400 dark:text-zinc-400 focus:outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone Number ID</label>
                    <input type="text" value="109876543210987" readOnly className="w-full bg-zinc-50 dark:bg-zinc-950 dark:bg-zinc-950 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 dark:border-zinc-700 rounded-xl px-4 py-2 text-sm text-zinc-500 dark:text-zinc-400 dark:text-zinc-400 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">WABA ID</label>
                    <input type="text" value="101234567890123" readOnly className="w-full bg-zinc-50 dark:bg-zinc-950 dark:bg-zinc-950 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 dark:border-zinc-700 rounded-xl px-4 py-2 text-sm text-zinc-500 dark:text-zinc-400 dark:text-zinc-400 focus:outline-none" />
                  </div>
                </div>
                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
                  <label className="block text-sm font-medium mb-1">Webhook URL</label>
                  <div className="flex gap-2">
                    <input type="text" value="https://api.myinstitution.edu/webhooks/meta" readOnly className="flex-1 bg-zinc-50 dark:bg-zinc-950 dark:bg-zinc-950 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 dark:border-zinc-700 rounded-xl px-4 py-2 text-sm text-zinc-500 dark:text-zinc-400 dark:text-zinc-400 focus:outline-none" />
                    <button 
                      onClick={() => { navigator.clipboard.writeText("https://api.myinstitution.edu/webhooks/meta"); setCopyStatus('Copied!'); setTimeout(() => setCopyStatus(''), 2000) }} 
                      className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-xl text-sm font-medium transition-colors">
                      {copyStatus || "Copy"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Twilio & SendGrid Settings */}
            <div className="space-y-8">
              <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm p-6">
                <div className="flex items-center gap-3 mb-6">
                   <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-xl flex items-center justify-center text-xl">📱</div>
                   <h2 className="text-xl font-bold">Twilio SMS</h2>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Account SID</label>
                    <input type="text" placeholder="Enter Twilio Account SID" className="w-full bg-white dark:bg-zinc-900/50 backdrop-blur-md dark:bg-black border border-zinc-200 dark:border-zinc-800 dark:border-zinc-700 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Auth Token</label>
                    <input type="password" placeholder="Enter Twilio Auth Token" className="w-full bg-white dark:bg-zinc-900/50 backdrop-blur-md dark:bg-black border border-zinc-200 dark:border-zinc-800 dark:border-zinc-700 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm p-6">
                <div className="flex items-center gap-3 mb-6">
                   <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 text-orange-600 rounded-xl flex items-center justify-center text-xl">📧</div>
                   <h2 className="text-xl font-bold">SendGrid Email</h2>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">API Key</label>
                    <input type="password" placeholder="Enter SendGrid API Key" className="w-full bg-white dark:bg-zinc-900/50 backdrop-blur-md dark:bg-black border border-zinc-200 dark:border-zinc-800 dark:border-zinc-700 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'chatbots' && (
        <div className="animate-in fade-in duration-500">
           <header className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Chatbots & Flows</h1>
              <p className="text-slate-500 dark:text-slate-400 mt-2">Design automated auto-responders for WhatsApp, SMS, and Email.</p>
            </div>
            <button onClick={() => setShowFlowModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-blue-500/30 flex items-center gap-2">
              <span>+</span> New Flow
            </button>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Flow Card 1 */}
            <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md p-6 rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-1">
                  <span className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center text-sm" title="WhatsApp Active">💬</span>
                  <span className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center text-sm" title="SMS Active">📱</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-md flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Active</span>
              </div>
              <h3 className="font-bold text-lg mb-1">Admissions Auto-Responder</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 dark:text-zinc-400 mb-4 line-clamp-2">Triggers on keywords "admission", "fees", "apply". Sends application link.</p>
              
              <div className="flex justify-between items-center pt-4 border-t border-zinc-100 dark:border-zinc-800">
                 <span className="text-xs text-zinc-400">Triggered 450 times</span>
                 <button onClick={() => setShowFlowModal(true)} className="text-xs font-semibold text-blue-600 hover:text-blue-700">Edit Flow →</button>
              </div>
            </div>

            {/* Flow Card 2 */}
            <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md p-6 rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-1">
                  <span className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 flex items-center justify-center text-sm" title="Email Active">📧</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-md flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Active</span>
              </div>
              <h3 className="font-bold text-lg mb-1">Fee Receipt Acknowledgment</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 dark:text-zinc-400 mb-4 line-clamp-2">Automatically replies to emails containing "receipt" or "payment done" with confirmation.</p>
              
              <div className="flex justify-between items-center pt-4 border-t border-zinc-100 dark:border-zinc-800">
                 <span className="text-xs text-zinc-400">Triggered 120 times</span>
                 <button onClick={() => setShowFlowModal(true)} className="text-xs font-semibold text-blue-600 hover:text-blue-700">Edit Flow →</button>
              </div>
            </div>

            {/* Flow Card 3 */}
            <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md p-6 rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer border-dashed border-2">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-1">
                  <span className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center text-sm opacity-50" title="WhatsApp Disabled">💬</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 dark:text-zinc-400 dark:bg-zinc-800 px-2 py-1 rounded-md">Draft</span>
              </div>
              <h3 className="font-bold text-lg mb-1">Out of Office (Holiday)</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 dark:text-zinc-400 mb-4 line-clamp-2">Sends automated out-of-office replies outside working hours.</p>
              
              <div className="flex justify-between items-center pt-4 border-t border-zinc-100 dark:border-zinc-800">
                 <span className="text-xs text-zinc-400">Never triggered</span>
                 <button onClick={() => setShowFlowModal(true)} className="text-xs font-semibold text-blue-600 hover:text-blue-700">Edit Flow →</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Flow Builder Modal Overlay */}
      {showFlowModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md rounded-3xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 dark:border-zinc-800 flex justify-between items-center bg-zinc-50 dark:bg-zinc-950 dark:bg-zinc-950 dark:bg-zinc-950">
              <div>
                <h2 className="text-xl font-bold dark:text-white flex items-center gap-2">
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 p-1.5 rounded-lg text-sm">🤖</span>
                  Visual Flow Builder
                </h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 dark:text-zinc-400">Design your automated conversation logic.</p>
              </div>
              <button onClick={() => setShowFlowModal(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors">
                ✕
              </button>
            </div>
            
            {/* Modal Body - Mock Flow Builder Workspace */}
            <div className="flex-1 bg-zinc-100 dark:bg-zinc-800 dark:bg-black p-6 relative overflow-hidden" style={{backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)', backgroundSize: '20px 20px'}}>
               <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-white dark:bg-zinc-900/50 backdrop-blur-md dark:bg-zinc-800 p-4 rounded-xl shadow-lg border-t-4 border-green-500 w-64 text-center z-10 cursor-pointer hover:border-green-400">
                  <div className="text-xs font-bold text-green-600 mb-1">TRIGGER</div>
                  <h3 className="font-semibold text-sm">Incoming Message</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 dark:text-zinc-400 mt-1">Keywords: "hello", "help"</p>
               </div>
               
               <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{stroke: '#94a3b8', strokeWidth: 2, fill: 'none'}}>
                  <path d="M 50% 100 L 50% 160" />
               </svg>

               <div className="absolute top-40 left-1/2 -translate-x-1/2 bg-white dark:bg-zinc-900/50 backdrop-blur-md dark:bg-zinc-800 p-4 rounded-xl shadow-lg border-t-4 border-blue-500 w-64 text-center z-10 cursor-pointer hover:border-blue-400">
                  <div className="text-xs font-bold text-blue-600 mb-1">ACTION</div>
                  <h3 className="font-semibold text-sm">Send WhatsApp Template</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 dark:text-zinc-400 mt-1">Template: welcome_msg</p>
               </div>
               
               {/* Toolbox Overlay */}
               <div className="absolute left-6 top-6 bg-white dark:bg-zinc-900/50 backdrop-blur-md rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-2 flex flex-col gap-2">
                  <button className="p-2 rounded-lg hover:bg-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-800 text-xl tooltip" title="Add Trigger">⚡</button>
                  <button className="p-2 rounded-lg hover:bg-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-800 text-xl tooltip" title="Add Message">💬</button>
                  <button className="p-2 rounded-lg hover:bg-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-800 text-xl tooltip" title="Add Condition">🔀</button>
                  <button className="p-2 rounded-lg hover:bg-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-800 text-xl tooltip" title="Update CRM">🔄</button>
               </div>
            </div>
            
            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-100 dark:border-zinc-800 flex justify-end gap-3 bg-white dark:bg-zinc-900/50 backdrop-blur-md">
              <button onClick={() => setShowFlowModal(false)} className="px-5 py-2 rounded-xl font-semibold text-zinc-600 dark:text-zinc-300 dark:text-zinc-300 hover:bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-800">
                Discard Changes
              </button>
              <button onClick={() => setShowFlowModal(false)} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl font-semibold shadow-md">
                Publish Flow
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default function CommunicationsDashboard() {
  return (
    <Suspense fallback={<div className="p-8">Loading Communications Hub...</div>}>
      <CommunicationsContent />
    </Suspense>
  )
}
