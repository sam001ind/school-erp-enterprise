"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import AuditLogView from "@/components/users/views/AuditLogView";
import { LeadsBoard } from "@/components/admissions/LeadsBoard";

function AdmissionsContent() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "dashboard";
  const [showIntegrationModal, setShowIntegrationModal] = React.useState(false);
  const [showNewCampaignModal, setShowNewCampaignModal] = React.useState(false);
  const [viewMode, setViewMode] = React.useState<'kanban' | 'table'>('kanban');
  const [whatsappContact, setWhatsappContact] = React.useState<{name: string, phone: string} | null>(null);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      
      {activeTab === "dashboard" && (
        <div className="space-y-8 animate-in fade-in duration-500">
          <header>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Admissions Dashboard</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2">Real-time view of admission status and funnel analytics.</p>
          </header>
          
          {/* Top Widgets */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md p-6 rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm border-l-4 border-l-blue-500">
              <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium">Total Enquiries</h3>
              <p className="text-3xl font-extrabold mt-2 dark:text-white text-zinc-900 dark:text-white">1,245</p>
              <p className="text-sm text-green-500 mt-2 font-medium">+15 Today</p>
            </div>
            <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md p-6 rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm border-l-4 border-l-amber-500">
              <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium">Applications Pending</h3>
              <p className="text-3xl font-extrabold mt-2 dark:text-white text-zinc-900 dark:text-white">142</p>
              <p className="text-sm text-amber-500 mt-2 font-medium">Awaiting Verification</p>
            </div>
            <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md p-6 rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm border-l-4 border-l-green-500">
              <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium">Approved & Enrolled</h3>
              <p className="text-3xl font-extrabold mt-2 dark:text-white text-zinc-900 dark:text-white">428</p>
              <p className="text-sm text-green-500 mt-2 font-medium">71% of Target (600)</p>
            </div>
            <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md p-6 rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm border-l-4 border-l-purple-500">
              <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium">Application Revenue</h3>
              <p className="text-3xl font-extrabold mt-2 dark:text-white text-zinc-900 dark:text-white">$45,200</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">Collected to date</p>
            </div>
          </div>

          {/* Funnel & Charts area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white dark:bg-zinc-900/50 backdrop-blur-md rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm p-6">
               <h2 className="font-bold text-lg mb-6 dark:text-white">Admission Funnel</h2>
               <div className="flex flex-col items-center justify-center space-y-2 relative h-64 w-full">
                  <div className="w-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 py-3 text-center rounded-t-lg font-bold">1000 Enquiries</div>
                  <div className="w-11/12 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 py-3 text-center font-bold">800 Applications</div>
                  <div className="w-5/6 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 py-3 text-center font-bold">600 Verified</div>
                  <div className="w-3/4 bg-fuchsia-100 dark:bg-fuchsia-900/30 text-fuchsia-800 dark:text-fuchsia-300 py-3 text-center font-bold">500 Interviewed</div>
                  <div className="w-2/3 bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300 py-3 text-center font-bold">450 Approved</div>
                  <div className="w-1/2 bg-rose-100 dark:bg-rose-900/30 text-rose-800 dark:text-rose-300 py-3 text-center rounded-b-lg font-bold">400 Enrolled</div>
               </div>
            </div>
            
            <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm p-6">
               <h2 className="font-bold text-lg mb-6 dark:text-white">Recent Activities</h2>
               <div className="space-y-4">
                 {[1,2,3,4,5].map(i => (
                   <div key={i} className="flex gap-4 border-b border-gray-50 dark:border-zinc-800 pb-3 last:border-0 last:pb-0">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                      <div>
                        <p className="text-sm font-semibold dark:text-white">Application APP-0{i} submitted</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">10 mins ago • Online Portal</p>
                      </div>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "enquiry" && (
        <div className="animate-in fade-in duration-500">
           <LeadsBoard />
        </div>
      )}

      {activeTab === "applications" && (
        <div className="animate-in fade-in duration-500">
           <header className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Application Management</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2">Comprehensive 7-section application forms.</p>
          </header>
          
          <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm p-8">
            <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
               {['1. Basic Details', '2. Address', '3. Family', '4. Prev Education', '5. Medical', '6. Transport', '7. Hostel'].map((sec, i) => (
                 <div key={i} className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium ${i===0 ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' : 'text-zinc-500 dark:text-zinc-400 dark:text-zinc-400'}`}>{sec}</div>
               ))}
            </div>
            
            <h3 className="text-xl font-bold mb-6 dark:text-white">Section 1: Student Basic Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div><label className="block text-sm font-medium mb-1">First Name</label><input type="text" className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 dark:bg-zinc-950 dark:bg-black px-4 py-2" /></div>
               <div><label className="block text-sm font-medium mb-1">Middle Name</label><input type="text" className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 dark:bg-zinc-950 dark:bg-black px-4 py-2" /></div>
               <div><label className="block text-sm font-medium mb-1">Last Name</label><input type="text" className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 dark:bg-zinc-950 dark:bg-black px-4 py-2" /></div>
               <div><label className="block text-sm font-medium mb-1">Aadhaar Number</label><input type="text" className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 dark:bg-zinc-950 dark:bg-black px-4 py-2" /></div>
               <div><label className="block text-sm font-medium mb-1">Nationality</label><input type="text" className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 dark:bg-zinc-950 dark:bg-black px-4 py-2" /></div>
               <div><label className="block text-sm font-medium mb-1">Religion</label><input type="text" className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 dark:bg-zinc-950 dark:bg-black px-4 py-2" /></div>
            </div>
            <div className="mt-8 flex justify-end"><button className="px-6 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black font-medium">Next Section →</button></div>
          </div>
        </div>
      )}
      
      {activeTab === "documents" && (
        <div className="animate-in fade-in duration-500">
           <header className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Document Verification (OCR)</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2">Approve, reject, or request re-uploads of mandatory documents.</p>
          </header>
          
          <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm overflow-hidden">
             <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-50 dark:bg-zinc-950 dark:bg-zinc-950 dark:bg-zinc-950 text-slate-500 dark:text-slate-400 text-sm">
                    <th className="px-6 py-4 font-semibold">Applicant</th>
                    <th className="px-6 py-4 font-semibold">Document Type</th>
                    <th className="px-6 py-4 font-semibold">OCR Status</th>
                    <th className="px-6 py-4 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 dark:divide-zinc-800 dark:divide-zinc-800 text-sm">
                  <tr className="hover:bg-slate-50 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:hover:bg-zinc-800/50">
                    <td className="px-6 py-4 font-semibold dark:text-white">APP-082 (Rahul Sharma)</td>
                    <td className="px-6 py-4 font-medium">Birth Certificate</td>
                    <td className="px-6 py-4"><span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-bold text-xs flex items-center w-max gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> Matches Form Name</span></td>
                    <td className="px-6 py-4 flex gap-2">
                       <button className="px-4 py-1.5 bg-blue-600 text-white rounded-lg font-medium text-xs">Verify</button>
                       <button className="px-4 py-1.5 bg-red-100 text-red-700 rounded-lg font-medium text-xs">Reject</button>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:hover:bg-zinc-800/50">
                    <td className="px-6 py-4 font-semibold dark:text-white">APP-083 (Sara Ali)</td>
                    <td className="px-6 py-4 font-medium">Aadhaar Card</td>
                    <td className="px-6 py-4"><span className="px-3 py-1 bg-red-100 text-red-700 rounded-full font-bold text-xs flex items-center w-max gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-500"></div> OCR Mismatch (Name)</span></td>
                    <td className="px-6 py-4 flex gap-2">
                       <button className="px-4 py-1.5 bg-blue-600 text-white rounded-lg font-medium text-xs">Manual Verify</button>
                       <button className="px-4 py-1.5 border border-zinc-300 dark:border-zinc-700 rounded-lg font-medium text-xs">Request Re-upload</button>
                    </td>
                  </tr>
                </tbody>
             </table>
          </div>
        </div>
      )}

      {activeTab === "campaigns" && (
        <div className="animate-in fade-in duration-500 space-y-8">
           <header className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Campaigns & Leads</h1>
              <p className="text-slate-500 dark:text-slate-400 mt-2">Manage marketing campaigns, track Meta/Web leads, and convert prospects.</p>
            </div>
            <div className="flex gap-3">
               <div className="bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl flex items-center mr-2">
                 <button onClick={() => setViewMode('kanban')} className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${viewMode === 'kanban' ? 'bg-white dark:bg-zinc-900/50 backdrop-blur-md dark:bg-zinc-700 shadow-sm text-zinc-900 dark:text-white' : 'text-zinc-500 dark:text-zinc-400 dark:text-zinc-400 hover:text-zinc-700 dark:text-zinc-300 dark:text-zinc-300 dark:hover:text-zinc-300'}`}>Kanban</button>
                 <button onClick={() => setViewMode('table')} className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${viewMode === 'table' ? 'bg-white dark:bg-zinc-900/50 backdrop-blur-md dark:bg-zinc-700 shadow-sm text-zinc-900 dark:text-white' : 'text-zinc-500 dark:text-zinc-400 dark:text-zinc-400 hover:text-zinc-700 dark:text-zinc-300 dark:text-zinc-300 dark:hover:text-zinc-300'}`}>Table</button>
               </div>
               <button 
                 onClick={() => setShowIntegrationModal(true)}
                 className="px-5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 dark:border-zinc-700 font-medium bg-white dark:bg-zinc-900/50 backdrop-blur-md shadow-sm"
               >
                 Integration Settings
               </button>
               <button 
                 onClick={() => setShowNewCampaignModal(true)}
                 className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-blue-500/30 flex items-center gap-2"
               >
                 + New Campaign
               </button>
            </div>
          </header>

          {/* Leads Views */}
          {viewMode === 'kanban' ? (
          <div className="flex gap-6 overflow-x-auto pb-4 min-h-[600px]">
             {/* Column 1: New Leads */}
             <div className="min-w-[320px] max-w-[320px] flex flex-col gap-4">
                <div className="flex items-center justify-between">
                   <h3 className="font-bold text-zinc-700 dark:text-zinc-300 dark:text-zinc-300 dark:text-zinc-300 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      New Leads
                   </h3>
                   <span className="bg-zinc-100 dark:bg-zinc-800 text-xs px-2 py-1 rounded-full font-bold">2</span>
                </div>
                
                {/* Lead Card 1 */}
                <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md p-5 rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm cursor-grab hover:border-blue-300 transition-colors">
                   <div className="flex justify-between items-start mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-1 rounded-md">Meta Ads</span>
                      <span className="text-xs text-zinc-400">10m ago</span>
                   </div>
                   <h4 className="font-bold dark:text-white text-lg">Sarah Jenkins</h4>
                   <p className="text-sm text-zinc-500 dark:text-zinc-400 dark:text-zinc-400 mb-4">+1 (555) 019-2834</p>
                   <div className="flex gap-2">
                      <button onClick={() => setWhatsappContact({name: 'Sarah Jenkins', phone: '+1 (555) 019-2834'})} className="flex-1 py-1.5 bg-green-50 hover:bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/40 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-colors">
                         WhatsApp
                      </button>
                      <button className="flex-1 py-1.5 border border-zinc-200 dark:border-zinc-800 dark:border-zinc-700 rounded-lg text-xs font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800/40 dark:bg-zinc-950 dark:hover:bg-zinc-800/40 dark:bg-zinc-950 dark:hover:bg-zinc-800 transition-colors">
                         Call
                      </button>
                   </div>
                </div>

                {/* Lead Card 2 */}
                <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md p-5 rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm cursor-grab hover:border-blue-300 transition-colors">
                   <div className="flex justify-between items-start mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 px-2 py-1 rounded-md">Website</span>
                      <span className="text-xs text-zinc-400">1h ago</span>
                   </div>
                   <h4 className="font-bold dark:text-white text-lg">Michael Chen</h4>
                   <p className="text-sm text-zinc-500 dark:text-zinc-400 dark:text-zinc-400 mb-4">+1 (555) 832-1100</p>
                   <div className="flex gap-2">
                      <button onClick={() => setWhatsappContact({name: 'Michael Chen', phone: '+1 (555) 832-1100'})} className="flex-1 py-1.5 bg-green-50 hover:bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/40 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-colors">
                         WhatsApp
                      </button>
                      <button className="flex-1 py-1.5 border border-zinc-200 dark:border-zinc-800 dark:border-zinc-700 rounded-lg text-xs font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800/40 dark:bg-zinc-950 dark:hover:bg-zinc-800/40 dark:bg-zinc-950 dark:hover:bg-zinc-800 transition-colors">
                         Call
                      </button>
                   </div>
                </div>
             </div>

             {/* Column 2: Contacted */}
             <div className="min-w-[320px] max-w-[320px] flex flex-col gap-4">
                <div className="flex items-center justify-between">
                   <h3 className="font-bold text-zinc-700 dark:text-zinc-300 dark:text-zinc-300 dark:text-zinc-300 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                      Attempted Contact
                   </h3>
                   <span className="bg-zinc-100 dark:bg-zinc-800 text-xs px-2 py-1 rounded-full font-bold">1</span>
                </div>
                {/* Lead Card 3 */}
                <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md p-5 rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm cursor-grab hover:border-amber-300 transition-colors">
                   <div className="flex justify-between items-start mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-1 rounded-md">Meta Ads</span>
                      <span className="text-xs text-amber-500 font-medium">Follow-up due</span>
                   </div>
                   <h4 className="font-bold dark:text-white text-lg">Emily Davis</h4>
                   <p className="text-sm text-zinc-500 dark:text-zinc-400 dark:text-zinc-400 mb-4">+1 (555) 443-9921</p>
                   <div className="flex gap-2">
                      <button onClick={() => setWhatsappContact({name: 'Emily Davis', phone: '+1 (555) 443-9921'})} className="flex-1 py-1.5 bg-green-50 hover:bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/40 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-colors">
                         WhatsApp
                      </button>
                      <button className="flex-1 py-1.5 border border-zinc-200 dark:border-zinc-800 dark:border-zinc-700 rounded-lg text-xs font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800/40 dark:bg-zinc-950 dark:hover:bg-zinc-800/40 dark:bg-zinc-950 dark:hover:bg-zinc-800 transition-colors">
                         Call
                      </button>
                   </div>
                </div>
             </div>

             {/* Column 3: In Conversation */}
             <div className="min-w-[320px] max-w-[320px] flex flex-col gap-4">
                <div className="flex items-center justify-between">
                   <h3 className="font-bold text-zinc-700 dark:text-zinc-300 dark:text-zinc-300 dark:text-zinc-300 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                      In Conversation
                   </h3>
                   <span className="bg-zinc-100 dark:bg-zinc-800 text-xs px-2 py-1 rounded-full font-bold">1</span>
                </div>
                 {/* Lead Card 4 */}
                <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md p-5 rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm cursor-grab hover:border-purple-300 transition-colors">
                   <div className="flex justify-between items-start mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400 px-2 py-1 rounded-md">Walk-In</span>
                      <span className="text-xs text-zinc-400">2d ago</span>
                   </div>
                   <h4 className="font-bold dark:text-white text-lg">Robert Wilson</h4>
                   <p className="text-sm text-zinc-500 dark:text-zinc-400 dark:text-zinc-400 mb-4">+1 (555) 776-3342</p>
                   <div className="flex gap-2">
                      <button onClick={() => setWhatsappContact({name: 'Robert Wilson', phone: '+1 (555) 776-3342'})} className="flex-1 py-1.5 bg-green-50 hover:bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/40 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-colors mb-2">
                         WhatsApp
                      </button>
                      <button className="flex-1 py-1.5 bg-blue-600 text-white hover:bg-blue-700 rounded-lg text-xs font-semibold transition-colors shadow-lg shadow-blue-500/20 w-full">
                         Convert to Enquiry
                      </button>
                   </div>
                </div>
             </div>

             {/* Column 4: Converted */}
             <div className="min-w-[320px] max-w-[320px] flex flex-col gap-4">
                <div className="flex items-center justify-between">
                   <h3 className="font-bold text-zinc-700 dark:text-zinc-300 dark:text-zinc-300 dark:text-zinc-300 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      Converted
                   </h3>
                   <span className="bg-zinc-100 dark:bg-zinc-800 text-xs px-2 py-1 rounded-full font-bold">0</span>
                </div>
                <div className="h-24 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl flex items-center justify-center text-sm text-zinc-400 font-medium">
                   Drop here to convert
                 </div>
              </div>
           </div>
          ) : (
          <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm overflow-hidden min-h-[600px]">
             <div className="p-4 border-b border-slate-100 dark:border-zinc-800 flex flex-col sm:flex-row gap-4 bg-zinc-50 dark:bg-zinc-950 dark:bg-zinc-950 dark:bg-zinc-950">
               <input type="text" placeholder="Search leads by name, phone, or email..." className="flex-1 bg-white dark:bg-zinc-900/50 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 dark:border-zinc-700 rounded-lg px-4 py-2 text-sm" />
               <div className="flex gap-4">
                 <select className="bg-white dark:bg-zinc-900/50 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 dark:border-zinc-700 rounded-lg px-4 py-2 text-sm"><option>All Sources</option><option>Meta Ads</option><option>Website</option></select>
                 <select className="bg-white dark:bg-zinc-900/50 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 dark:border-zinc-700 rounded-lg px-4 py-2 text-sm"><option>All Stages</option><option>New Leads</option><option>Attempted Contact</option><option>In Conversation</option></select>
               </div>
             </div>
             <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                    <tr className="bg-zinc-50 dark:bg-zinc-950 dark:bg-zinc-950 dark:bg-zinc-950 text-slate-500 dark:text-slate-400 text-sm border-b border-slate-100 dark:border-zinc-800">
                      <th className="px-6 py-4 font-semibold">Lead Name</th>
                      <th className="px-6 py-4 font-semibold">Contact Info</th>
                      <th className="px-6 py-4 font-semibold">Source</th>
                      <th className="px-6 py-4 font-semibold">Stage</th>
                      <th className="px-6 py-4 font-semibold">Last Active</th>
                      <th className="px-6 py-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 dark:divide-zinc-800 dark:divide-zinc-800 text-sm">
                    <tr className="hover:bg-slate-50 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:hover:bg-zinc-800/50">
                      <td className="px-6 py-4 font-bold dark:text-white">Sarah Jenkins</td>
                      <td className="px-6 py-4 text-zinc-500 dark:text-zinc-400 dark:text-zinc-400">+1 (555) 019-2834</td>
                      <td className="px-6 py-4"><span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-1 rounded-md">Meta Ads</span></td>
                      <td className="px-6 py-4"><span className="px-2 py-1 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-lg text-xs font-semibold flex items-center w-max gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> New Lead</span></td>
                      <td className="px-6 py-4 text-zinc-500 dark:text-zinc-400 dark:text-zinc-400">10m ago</td>
                      <td className="px-6 py-4 flex justify-end gap-2">
                         <button onClick={() => setWhatsappContact({name: 'Sarah Jenkins', phone: '+1 (555) 019-2834'})} className="px-3 py-1.5 bg-green-50 hover:bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/40 rounded-lg text-xs font-semibold">WhatsApp</button>
                         <button className="px-3 py-1.5 border border-zinc-200 dark:border-zinc-800 dark:border-zinc-700 rounded-lg text-xs font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800/40 dark:bg-zinc-950 dark:hover:bg-zinc-800/40 dark:bg-zinc-950 dark:hover:bg-zinc-800">Call</button>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:hover:bg-zinc-800/50">
                      <td className="px-6 py-4 font-bold dark:text-white">Michael Chen</td>
                      <td className="px-6 py-4 text-zinc-500 dark:text-zinc-400 dark:text-zinc-400">+1 (555) 832-1100</td>
                      <td className="px-6 py-4"><span className="text-[10px] font-bold uppercase tracking-wider bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 px-2 py-1 rounded-md">Website</span></td>
                      <td className="px-6 py-4"><span className="px-2 py-1 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-lg text-xs font-semibold flex items-center w-max gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> New Lead</span></td>
                      <td className="px-6 py-4 text-zinc-500 dark:text-zinc-400 dark:text-zinc-400">1h ago</td>
                      <td className="px-6 py-4 flex justify-end gap-2">
                         <button onClick={() => setWhatsappContact({name: 'Michael Chen', phone: '+1 (555) 832-1100'})} className="px-3 py-1.5 bg-green-50 hover:bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/40 rounded-lg text-xs font-semibold">WhatsApp</button>
                         <button className="px-3 py-1.5 border border-zinc-200 dark:border-zinc-800 dark:border-zinc-700 rounded-lg text-xs font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800/40 dark:bg-zinc-950 dark:hover:bg-zinc-800/40 dark:bg-zinc-950 dark:hover:bg-zinc-800">Call</button>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:hover:bg-zinc-800/50">
                      <td className="px-6 py-4 font-bold dark:text-white">Emily Davis</td>
                      <td className="px-6 py-4 text-zinc-500 dark:text-zinc-400 dark:text-zinc-400">+1 (555) 443-9921</td>
                      <td className="px-6 py-4"><span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-1 rounded-md">Meta Ads</span></td>
                      <td className="px-6 py-4"><span className="px-2 py-1 bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 rounded-lg text-xs font-semibold flex items-center w-max gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div> Contacted</span></td>
                      <td className="px-6 py-4 text-amber-500 font-medium">Follow-up due</td>
                      <td className="px-6 py-4 flex justify-end gap-2">
                         <button onClick={() => setWhatsappContact({name: 'Emily Davis', phone: '+1 (555) 443-9921'})} className="px-3 py-1.5 bg-green-50 hover:bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/40 rounded-lg text-xs font-semibold">WhatsApp</button>
                         <button className="px-3 py-1.5 border border-zinc-200 dark:border-zinc-800 dark:border-zinc-700 rounded-lg text-xs font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800/40 dark:bg-zinc-950 dark:hover:bg-zinc-800/40 dark:bg-zinc-950 dark:hover:bg-zinc-800">Call</button>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:hover:bg-zinc-800/50">
                      <td className="px-6 py-4 font-bold dark:text-white">Robert Wilson</td>
                      <td className="px-6 py-4 text-zinc-500 dark:text-zinc-400 dark:text-zinc-400">+1 (555) 776-3342</td>
                      <td className="px-6 py-4"><span className="text-[10px] font-bold uppercase tracking-wider bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400 px-2 py-1 rounded-md">Walk-In</span></td>
                      <td className="px-6 py-4"><span className="px-2 py-1 bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 rounded-lg text-xs font-semibold flex items-center w-max gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div> In Convo</span></td>
                      <td className="px-6 py-4 text-zinc-500 dark:text-zinc-400 dark:text-zinc-400">2d ago</td>
                      <td className="px-6 py-4 flex justify-end gap-2">
                         <button onClick={() => setWhatsappContact({name: 'Robert Wilson', phone: '+1 (555) 776-3342'})} className="px-3 py-1.5 bg-green-50 hover:bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/40 rounded-lg text-xs font-semibold">WhatsApp</button>
                         <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 shadow-sm">Convert</button>
                      </td>
                    </tr>
                  </tbody>
               </table>
             </div>
          </div>
          )}
        </div>
      )}

      {["assessments", "approvals", "fees", "enrollment", "reports"].includes(activeTab) && (
        <div className="animate-in fade-in duration-500 flex flex-col items-center justify-center min-h-[50vh] text-center">
          <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center text-3xl mb-6 shadow-inner">
             {activeTab === 'assessments' ? '📝' : activeTab === 'approvals' ? '✅' : activeTab === 'fees' ? '💳' : activeTab === 'enrollment' ? '🎓' : '📊'}
          </div>
          <h2 className="text-2xl font-bold dark:text-white capitalize mb-2">{activeTab} Module</h2>
          <p className="text-zinc-500 dark:text-zinc-400 dark:text-zinc-400 max-w-md">
            This highly advanced ERP feature is currently under construction. It will integrate complex workflows including dynamic waitlists, sibling mapping, and automated ID card generation.
          </p>
        </div>
      )}

      {/* Modals */}
      {showIntegrationModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md rounded-3xl w-full max-w-2xl p-8 relative shadow-2xl animate-in zoom-in-95 duration-200">
             <button onClick={() => setShowIntegrationModal(false)} className="absolute top-6 right-6 text-zinc-400 hover:text-zinc-600 dark:text-zinc-300 dark:text-zinc-300">✕</button>
             <h2 className="text-2xl font-bold mb-2 dark:text-white">Integration Settings</h2>
             <p className="text-zinc-500 dark:text-zinc-400 dark:text-zinc-400 mb-6">Configure your Webhooks for Meta Lead Ads and Website Forms.</p>
             
             <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold mb-2 dark:text-white">Meta Webhook URL</label>
                  <div className="flex gap-2">
                     <input type="text" readOnly value="https://api.myinstitution.edu/api/webhooks/meta" className="flex-1 bg-zinc-50 dark:bg-zinc-950 dark:bg-zinc-950 dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2 font-mono text-sm dark:text-zinc-300" />
                     <button className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 dark:text-white rounded-xl font-medium text-sm">Copy</button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 dark:text-white">Website Leads API Endpoint</label>
                  <div className="flex gap-2">
                     <input type="text" readOnly value="https://api.myinstitution.edu/api/leads" className="flex-1 bg-zinc-50 dark:bg-zinc-950 dark:bg-zinc-950 dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2 font-mono text-sm dark:text-zinc-300" />
                     <button className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 dark:text-white rounded-xl font-medium text-sm">Copy</button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 dark:text-white">API Secret Key</label>
                  <input type="password" readOnly value="************************" className="w-full bg-zinc-50 dark:bg-zinc-950 dark:bg-zinc-950 dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2 font-mono text-sm dark:text-zinc-300" />
                </div>
             </div>
             
             <div className="mt-8 flex justify-end">
               <button onClick={() => setShowIntegrationModal(false)} className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-medium shadow-lg shadow-blue-500/30">Done</button>
             </div>
          </div>
        </div>
      )}

      {showNewCampaignModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md rounded-3xl w-full max-w-xl p-8 relative shadow-2xl animate-in zoom-in-95 duration-200">
             <button onClick={() => setShowNewCampaignModal(false)} className="absolute top-6 right-6 text-zinc-400 hover:text-zinc-600 dark:text-zinc-300 dark:text-zinc-300">✕</button>
             <h2 className="text-2xl font-bold mb-2 dark:text-white">Create New Campaign</h2>
             <p className="text-zinc-500 dark:text-zinc-400 dark:text-zinc-400 mb-6">Set up tracking for a new marketing campaign.</p>
             
             <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-1 dark:text-white">Campaign Name</label>
                  <input type="text" placeholder="e.g. Fall 2026 Admissions" className="w-full bg-zinc-50 dark:bg-zinc-950 dark:bg-zinc-950 dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1 dark:text-white">Source Platform</label>
                  <select className="w-full bg-zinc-50 dark:bg-zinc-950 dark:bg-zinc-950 dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2 dark:text-white">
                     <option>Meta (Facebook/Instagram)</option>
                     <option>Google Ads</option>
                     <option>Organic Website</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1 dark:text-white">Budget Allocation</label>
                  <input type="number" placeholder="$0.00" className="w-full bg-zinc-50 dark:bg-zinc-950 dark:bg-zinc-950 dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2 dark:text-white" />
                </div>
             </div>
             
             <div className="mt-8 flex justify-end gap-3">
               <button onClick={() => setShowNewCampaignModal(false)} className="px-6 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 font-medium dark:text-white">Cancel</button>
               <button onClick={() => setShowNewCampaignModal(false)} className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-medium shadow-lg shadow-blue-500/30">Create Campaign</button>
             </div>
          </div>
        </div>
      )}

      {whatsappContact && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-[#efeae2] dark:bg-zinc-900 rounded-3xl w-full max-w-md relative shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden flex flex-col h-[600px]">
             {/* Header */}
             <div className="bg-[#075e54] text-white p-4 flex items-center gap-3 relative z-10 shadow-md">
                <button onClick={() => setWhatsappContact(null)} className="text-white hover:text-zinc-200 mr-2 p-1">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                </button>
                <div className="w-10 h-10 bg-white dark:bg-zinc-900/50 backdrop-blur-md/20 rounded-full flex items-center justify-center font-bold text-lg">{whatsappContact.name.charAt(0)}</div>
                <div>
                   <h3 className="font-bold">{whatsappContact.name}</h3>
                   <p className="text-xs text-white/80">{whatsappContact.phone}</p>
                </div>
                <div className="ml-auto flex gap-4">
                  <button className="text-white hover:text-zinc-200"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg></button>
                </div>
             </div>
             
             {/* Chat Area */}
             <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 z-10" style={{backgroundImage: "url('https://raw.githubusercontent.com/tailwindlabs/tailwindcss/master/.github/logo.svg')", backgroundSize: 'cover', backgroundColor: '#efeae2', backgroundBlendMode: 'soft-light'}}>
                <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md/80 dark:bg-black/50 backdrop-blur-sm p-2 rounded-lg self-center text-xs text-zinc-500 dark:text-zinc-400 dark:text-zinc-400 font-medium mb-2">Today</div>
                
                <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md dark:bg-zinc-800 p-3 rounded-xl rounded-tl-sm self-start max-w-[80%] shadow-sm text-sm dark:text-white relative">
                   <p className="text-xs text-blue-600 font-bold mb-1">System Generated (Meta API)</p>
                   <p>Lead generated from <b>Fall 2026 Admissions</b> campaign.</p>
                   <span className="text-[10px] text-zinc-400 block text-right mt-1">10:00 AM</span>
                </div>
                
                <div className="bg-[#dcf8c6] dark:bg-[#056162] p-3 rounded-xl rounded-tr-sm self-end max-w-[80%] shadow-sm text-sm dark:text-white relative">
                   <p>Hi {whatsappContact.name.split(' ')[0]}, thanks for your interest in My Institution! Would you like to schedule a campus tour?</p>
                   <span className="text-[10px] text-[#075e54]/70 dark:text-white/50 flex justify-end items-center gap-1 mt-1">10:05 AM <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"></path></svg></span>
                </div>
             </div>

             {/* Input Area */}
             <div className="bg-[#f0f2f5] dark:bg-zinc-900 p-3 flex items-center gap-2 relative z-10 border-t border-zinc-200 dark:border-zinc-800">
                <button className="text-zinc-500 dark:text-zinc-400 dark:text-zinc-400 hover:text-zinc-700 dark:text-zinc-300 dark:text-zinc-300 p-2"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg></button>
                <input type="text" placeholder="Type a message (via Twilio API)" className="flex-1 bg-white dark:bg-zinc-900/50 backdrop-blur-md dark:bg-zinc-800 rounded-full px-4 py-2 text-sm focus:outline-none dark:text-white" />
                <button className="bg-[#00a884] text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:bg-[#075e54] transition-colors shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                </button>
             </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default function AdmissionsDashboard() {
  return (
    <Suspense fallback={<div className="p-8">Loading Admissions Module...</div>}>
      <AdmissionsContent />
    </Suspense>
  )
}
