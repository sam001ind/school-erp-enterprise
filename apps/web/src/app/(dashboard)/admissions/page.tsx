"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function AdmissionsContent() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "dashboard";

  return (
    <div className="p-8 max-w-7xl mx-auto">
      
      {activeTab === "dashboard" && (
        <div className="space-y-8 animate-in fade-in duration-500">
          <header>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admissions Dashboard</h1>
            <p className="text-gray-500 mt-2">Real-time view of admission status and funnel analytics.</p>
          </header>
          
          {/* Top Widgets */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm border-l-4 border-l-blue-500">
              <h3 className="text-gray-500 text-sm font-medium">Total Enquiries</h3>
              <p className="text-3xl font-extrabold mt-2 dark:text-white text-zinc-900">1,245</p>
              <p className="text-sm text-green-500 mt-2 font-medium">+15 Today</p>
            </div>
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm border-l-4 border-l-amber-500">
              <h3 className="text-gray-500 text-sm font-medium">Applications Pending</h3>
              <p className="text-3xl font-extrabold mt-2 dark:text-white text-zinc-900">142</p>
              <p className="text-sm text-amber-500 mt-2 font-medium">Awaiting Verification</p>
            </div>
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm border-l-4 border-l-green-500">
              <h3 className="text-gray-500 text-sm font-medium">Approved & Enrolled</h3>
              <p className="text-3xl font-extrabold mt-2 dark:text-white text-zinc-900">428</p>
              <p className="text-sm text-green-500 mt-2 font-medium">71% of Target (600)</p>
            </div>
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm border-l-4 border-l-purple-500">
              <h3 className="text-gray-500 text-sm font-medium">Application Revenue</h3>
              <p className="text-3xl font-extrabold mt-2 dark:text-white text-zinc-900">$45,200</p>
              <p className="text-sm text-gray-500 mt-2 font-medium">Collected to date</p>
            </div>
          </div>

          {/* Funnel & Charts area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm p-6">
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
            
            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm p-6">
               <h2 className="font-bold text-lg mb-6 dark:text-white">Recent Activities</h2>
               <div className="space-y-4">
                 {[1,2,3,4,5].map(i => (
                   <div key={i} className="flex gap-4 border-b border-gray-50 dark:border-zinc-800 pb-3 last:border-0 last:pb-0">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                      <div>
                        <p className="text-sm font-semibold dark:text-white">Application APP-0{i} submitted</p>
                        <p className="text-xs text-gray-500">10 mins ago • Online Portal</p>
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
           <header className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Enquiry Management</h1>
              <p className="text-gray-500 mt-2">Log and track prospective student inquiries.</p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-blue-500/30">
              + New Enquiry
            </button>
          </header>
          
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm p-8">
            <h2 className="text-xl font-bold mb-6 dark:text-white">Create Enquiry</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Student Info */}
              <div className="space-y-4">
                <h3 className="font-bold text-zinc-700 dark:text-zinc-300 border-b border-zinc-100 dark:border-zinc-800 pb-2">Student Information</h3>
                <div><label className="block text-sm font-medium mb-1">Student Name</label><input type="text" className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-black px-4 py-2" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium mb-1">Gender</label><select className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-black px-4 py-2"><option>Select</option></select></div>
                  <div><label className="block text-sm font-medium mb-1">DOB</label><input type="date" className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-black px-4 py-2" /></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium mb-1">Current School</label><input type="text" className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-black px-4 py-2" /></div>
                  <div><label className="block text-sm font-medium mb-1">Current Grade</label><select className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-black px-4 py-2"><option>Select</option></select></div>
                </div>
              </div>

              {/* Parent Info & Prefs */}
              <div className="space-y-4">
                <h3 className="font-bold text-zinc-700 dark:text-zinc-300 border-b border-zinc-100 dark:border-zinc-800 pb-2">Parent Information & Preferences</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium mb-1">Parent Name</label><input type="text" className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-black px-4 py-2" /></div>
                  <div><label className="block text-sm font-medium mb-1">Mobile</label><input type="tel" className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-black px-4 py-2" /></div>
                </div>
                <div><label className="block text-sm font-medium mb-1">Email</label><input type="email" className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-black px-4 py-2" /></div>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div><label className="block text-sm font-medium mb-1">Academic Year</label><select className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-black px-4 py-2"><option>2026-2027</option></select></div>
                  <div><label className="block text-sm font-medium mb-1">Grade Seeking</label><select className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-black px-4 py-2"><option>Grade 5</option></select></div>
                </div>
                <div><label className="block text-sm font-medium mb-1">Lead Source (CRM)</label><select className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-black px-4 py-2"><option>Facebook Ads (UTM tracked)</option><option>Walk-in</option></select></div>
              </div>
            </div>

            <div className="mt-8 flex gap-4 justify-end">
              <button className="px-6 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 font-medium">Save & Schedule Follow-Up</button>
              <button className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-medium shadow-lg shadow-blue-500/30">Convert to Application</button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "applications" && (
        <div className="animate-in fade-in duration-500">
           <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Application Management</h1>
            <p className="text-gray-500 mt-2">Comprehensive 7-section application forms.</p>
          </header>
          
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm p-8">
            <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
               {['1. Basic Details', '2. Address', '3. Family', '4. Prev Education', '5. Medical', '6. Transport', '7. Hostel'].map((sec, i) => (
                 <div key={i} className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium ${i===0 ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' : 'text-zinc-500'}`}>{sec}</div>
               ))}
            </div>
            
            <h3 className="text-xl font-bold mb-6 dark:text-white">Section 1: Student Basic Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div><label className="block text-sm font-medium mb-1">First Name</label><input type="text" className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-black px-4 py-2" /></div>
               <div><label className="block text-sm font-medium mb-1">Middle Name</label><input type="text" className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-black px-4 py-2" /></div>
               <div><label className="block text-sm font-medium mb-1">Last Name</label><input type="text" className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-black px-4 py-2" /></div>
               <div><label className="block text-sm font-medium mb-1">Aadhaar Number</label><input type="text" className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-black px-4 py-2" /></div>
               <div><label className="block text-sm font-medium mb-1">Nationality</label><input type="text" className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-black px-4 py-2" /></div>
               <div><label className="block text-sm font-medium mb-1">Religion</label><input type="text" className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-black px-4 py-2" /></div>
            </div>
            <div className="mt-8 flex justify-end"><button className="px-6 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black font-medium">Next Section →</button></div>
          </div>
        </div>
      )}
      
      {activeTab === "documents" && (
        <div className="animate-in fade-in duration-500">
           <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Document Verification (OCR)</h1>
            <p className="text-gray-500 mt-2">Approve, reject, or request re-uploads of mandatory documents.</p>
          </header>
          
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm overflow-hidden">
             <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-50 dark:bg-zinc-950 text-gray-500 text-sm">
                    <th className="px-6 py-4 font-semibold">Applicant</th>
                    <th className="px-6 py-4 font-semibold">Document Type</th>
                    <th className="px-6 py-4 font-semibold">OCR Status</th>
                    <th className="px-6 py-4 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-sm">
                  <tr className="hover:bg-gray-50 dark:hover:bg-zinc-800/50">
                    <td className="px-6 py-4 font-semibold dark:text-white">APP-082 (Rahul Sharma)</td>
                    <td className="px-6 py-4 font-medium">Birth Certificate</td>
                    <td className="px-6 py-4"><span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-bold text-xs flex items-center w-max gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> Matches Form Name</span></td>
                    <td className="px-6 py-4 flex gap-2">
                       <button className="px-4 py-1.5 bg-blue-600 text-white rounded-lg font-medium text-xs">Verify</button>
                       <button className="px-4 py-1.5 bg-red-100 text-red-700 rounded-lg font-medium text-xs">Reject</button>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-zinc-800/50">
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

      {["campaigns", "assessments", "approvals", "fees", "enrollment", "reports"].includes(activeTab) && (
        <div className="animate-in fade-in duration-500 flex flex-col items-center justify-center min-h-[50vh] text-center">
          <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center text-3xl mb-6 shadow-inner">
             {activeTab === 'campaigns' ? '📈' : activeTab === 'assessments' ? '📝' : activeTab === 'approvals' ? '✅' : activeTab === 'fees' ? '💳' : activeTab === 'enrollment' ? '🎓' : '📊'}
          </div>
          <h2 className="text-2xl font-bold dark:text-white capitalize mb-2">{activeTab} Module</h2>
          <p className="text-zinc-500 max-w-md">
            This highly advanced ERP feature is currently under construction. It will integrate complex workflows including dynamic waitlists, sibling mapping, and automated ID card generation.
          </p>
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
