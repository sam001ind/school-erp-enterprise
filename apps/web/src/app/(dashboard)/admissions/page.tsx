"use client";

import React, { useState } from "react";

export default function AdmissionsDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for recent admissions
  const recentAdmissions = [
    { id: "1", admissionNo: "ADM-2026-001", name: "Alice Johnson", dob: "2010-05-14", gender: "Female", bloodGroup: "O+", date: "2026-05-28" },
    { id: "2", admissionNo: "ADM-2026-002", name: "Bob Smith", dob: "2011-02-20", gender: "Male", bloodGroup: "A+", date: "2026-05-29" },
    { id: "3", admissionNo: "ADM-2026-003", name: "Charlie Davis", dob: "2010-11-05", gender: "Male", bloodGroup: "B-", date: "2026-05-30" },
  ];

  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admissions Management</h1>
        <p className="text-gray-500 mt-2">Manage student enrollments, applications, and profiles.</p>
      </header>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-800 mb-8">
        <button
          onClick={() => setActiveTab("overview")}
          className={`py-3 px-6 font-medium text-sm border-b-2 transition-colors ${
            activeTab === "overview" 
              ? "border-red-500 text-red-600 dark:text-red-400" 
              : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
        >
          Overview & History
        </button>
        <button
          onClick={() => setActiveTab("new")}
          className={`py-3 px-6 font-medium text-sm border-b-2 transition-colors ${
            activeTab === "new" 
              ? "border-red-500 text-red-600 dark:text-red-400" 
              : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
        >
          Admit New Student
        </button>
      </div>

      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
              <h3 className="text-gray-500 text-sm font-medium">Total Admissions (This Year)</h3>
              <p className="text-3xl font-bold mt-2 dark:text-white">428</p>
              <p className="text-sm text-green-500 mt-2">↑ 12% from last year</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
              <h3 className="text-gray-500 text-sm font-medium">Pending Applications</h3>
              <p className="text-3xl font-bold mt-2 dark:text-white">15</p>
              <p className="text-sm text-yellow-500 mt-2">Requires review</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
              <h3 className="text-gray-500 text-sm font-medium">Available Seats</h3>
              <p className="text-3xl font-bold mt-2 dark:text-white">72</p>
              <p className="text-sm text-gray-400 mt-2">Across all grades</p>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
              <h2 className="font-semibold text-lg dark:text-white">Recent Enrollments</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-950/50 text-gray-500 text-sm">
                    <th className="px-6 py-3 font-medium">Admission No</th>
                    <th className="px-6 py-3 font-medium">Student Name</th>
                    <th className="px-6 py-3 font-medium">DOB</th>
                    <th className="px-6 py-3 font-medium">Gender</th>
                    <th className="px-6 py-3 font-medium">Blood Group</th>
                    <th className="px-6 py-3 font-medium">Enrollment Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800 text-sm">
                  {recentAdmissions.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-red-600 dark:text-red-400">{student.admissionNo}</td>
                      <td className="px-6 py-4 font-medium dark:text-white">{student.name}</td>
                      <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{student.dob}</td>
                      <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{student.gender}</td>
                      <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                        <span className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-xs font-semibold">
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
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-8 max-w-4xl">
          <h2 className="text-2xl font-bold mb-6 dark:text-white">New Student Admission</h2>
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            
            {/* System Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 border-b border-gray-100 dark:border-gray-800 pb-2">User Account (System Access)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                  <input type="email" className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black px-4 py-2.5 text-gray-900 dark:text-white focus:border-red-500 focus:ring-red-500 outline-none" placeholder="student@school.edu" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Temporary Password</label>
                  <input type="password" className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black px-4 py-2.5 text-gray-900 dark:text-white focus:border-red-500 focus:ring-red-500 outline-none" placeholder="••••••••" />
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 border-b border-gray-100 dark:border-gray-800 pb-2">Student Profile</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                  <input type="text" className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black px-4 py-2.5 text-gray-900 dark:text-white focus:border-red-500 focus:ring-red-500 outline-none" placeholder="e.g. John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date of Birth</label>
                  <input type="date" className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black px-4 py-2.5 text-gray-900 dark:text-white focus:border-red-500 focus:ring-red-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Gender</label>
                  <select className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black px-4 py-2.5 text-gray-900 dark:text-white focus:border-red-500 focus:ring-red-500 outline-none">
                    <option>Select Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Blood Group</label>
                  <select className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black px-4 py-2.5 text-gray-900 dark:text-white focus:border-red-500 focus:ring-red-500 outline-none">
                    <option>Select Blood Group</option>
                    <option>A+</option><option>A-</option>
                    <option>B+</option><option>B-</option>
                    <option>O+</option><option>O-</option>
                    <option>AB+</option><option>AB-</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Guardian Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 border-b border-gray-100 dark:border-gray-800 pb-2">Guardian Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Guardian Full Name</label>
                  <input type="text" className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black px-4 py-2.5 text-gray-900 dark:text-white focus:border-red-500 focus:ring-red-500 outline-none" placeholder="e.g. Richard Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Relationship to Student</label>
                  <select className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black px-4 py-2.5 text-gray-900 dark:text-white focus:border-red-500 focus:ring-red-500 outline-none">
                    <option>Father</option>
                    <option>Mother</option>
                    <option>Legal Guardian</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
                  <input type="tel" className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black px-4 py-2.5 text-gray-900 dark:text-white focus:border-red-500 focus:ring-red-500 outline-none" placeholder="+1 (555) 000-0000" />
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-4">
              <button type="button" onClick={() => setActiveTab("overview")} className="px-6 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                Cancel
              </button>
              <button type="submit" className="px-6 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition-colors shadow-sm">
                Complete Admission
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
