"use client";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function HostelContent() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "my-room";

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white capitalize">
          {activeTab.replace("-", " ")}
        </h1>
        <p className="text-gray-500 mt-2">Manage dormitory allocations and rules.</p>
      </header>

      {activeTab === "my-room" && (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm p-8 max-w-2xl">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-3xl font-extrabold dark:text-white text-zinc-900">Block A - Room 204</h2>
              <p className="text-gray-500 mt-2 font-medium">Standard Double Room (AC)</p>
            </div>
            <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-4 py-1.5 rounded-full text-sm font-bold">Allocated</span>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between p-5 bg-zinc-50 dark:bg-zinc-950/50 rounded-xl border border-zinc-100 dark:border-zinc-800/50">
              <span className="text-zinc-500 font-medium">Warden</span>
              <span className="font-bold dark:text-white">Mr. John Stevens</span>
            </div>
            <div className="flex justify-between p-5 bg-zinc-50 dark:bg-zinc-950/50 rounded-xl border border-zinc-100 dark:border-zinc-800/50">
              <span className="text-zinc-500 font-medium">Roommate</span>
              <span className="font-bold dark:text-white">David Miller</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function HostelDashboard() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HostelContent />
    </Suspense>
  )
}
