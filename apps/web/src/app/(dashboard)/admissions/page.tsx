"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function AdmissionsContent() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "overview";

  // Mock data for recent admissions
  const recentAdmissions = [
    { id: "1", admissionNo: "ADM-2026-001", name: "Alice Johnson", dob: "2010-05-14", gender: "Female", bloodGroup: "O+", date: "2026-05-28" },
    { id: "2", admissionNo: "ADM-2026-002", name: "Bob Smith", dob: "2011-02-20", gender: "Male", bloodGroup: "A+", date: "2026-05-29" },
    { id: "3", admissionNo: "ADM-2026-003", name: "Charlie Davis", dob: "2010-11-05", gender: "Male", bloodGroup: "B-", date: "2026-05-30" },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {activeTab === "overview" ? "Overview & History" : "Admit New Student"}
        </h1>
        <p className="text-gray-500 mt-2">Manage student enrollments, applications, and profiles.</p>
      </header>

      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm">
              <h3 className="text-gray-500 text-sm font-medium">Total Admissions</h3>
              <p className="text-4xl font-extrabold mt-2 dark:text-white text-zinc-900">428</p>
              <p className="text-sm text-green-500 mt-2 font-medium">↑ 12% from last year</p>
            </div>
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm">
              <h3 className="text-gray-500 text-sm font-medium">Pending Applications</h3>
              <p className="text-4xl font-extrabold mt-2 dark:text-white text-zinc-900">15</p>
              <p className="text-sm text-yellow-500 mt-2 font-medium">Requires review</p>
            </div>
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm">
              <h3 className="text-gray-500 text-sm font-medium">Available Seats</h3>
              <p className="text-4xl font-extrabold mt-2 dark:text-white text-zinc-900">72</p>
              <p className="text-sm text-gray-400 mt-2 font-medium">Across all grades</p>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 dark:border-zinc-800 flex justify-between items-center bg-zinc-50/50 dark:bg-black/20">
              <h2 className="font-semibold text-lg dark:text-white">Recent Enrollments</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white dark:bg-zinc-900 text-gray-500 text-sm border-b border-gray-100 dark:border-zinc-800">
                    <th className="px-6 py-4 font-semibold">Admission No</th>
                    <th className="px-6 py-4 font-semibold">Student Name</th>
                    <th className="px-6 py-4 font-semibold">DOB</th>
                    <th className="px-6 py-4 font-semibold">Gender</th>
                    <th className="px-6 py-4 font-semibold">Blood Group</th>
                    <th className="px-6 py-4 font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-zinc-800 text-sm">
                  {recentAdmissions.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-blue-600 dark:text-blue-400">{student.admissionNo}</td>
                      <td className="px-6 py-4 font-semibold dark:text-white text-zinc-900">{student.name}</td>
                      <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{student.dob}</td>
                      <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{student.gender}</td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 rounded-md bg-gray-100 dark:bg-zinc-800 text-xs font-bold text-gray-600 dark:text-gray-300">
                          {student.bloodGroup}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{student.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === "new" && (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm p-8 max-w-4xl">
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            
            {/* System Details */}
            <div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">User Account</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Email Address</label>
                  <input type="email" className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-black px-4 py-3 text-zinc-900 dark:text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" placeholder="student@school.edu" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Temporary Password</label>
                  <input type="password" className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-black px-4 py-3 text-zinc-900 dark:text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" placeholder="••••••••" />
                </div>
              </div>
            </div>

            <hr className="border-zinc-100 dark:border-zinc-800" />

            {/* Profile Details */}
            <div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">Student Profile</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Full Name</label>
                  <input type="text" className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-black px-4 py-3 text-zinc-900 dark:text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" placeholder="e.g. John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Date of Birth</label>
                  <input type="date" className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-black px-4 py-3 text-zinc-900 dark:text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Gender</label>
                  <select className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-black px-4 py-3 text-zinc-900 dark:text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all">
                    <option>Select Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-6 flex justify-end gap-4">
              <button type="submit" className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-colors shadow-lg shadow-blue-500/30">
                Complete Admission
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default function AdmissionsDashboard() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdmissionsContent />
    </Suspense>
  )
}
