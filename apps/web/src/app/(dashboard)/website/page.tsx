"use client";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function WebsiteContent() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "pages";

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white capitalize">
          {activeTab.replace("-", " ")}
        </h1>
        <p className="text-gray-500 mt-2">Manage your institution's public-facing website and content.</p>
      </header>

      {activeTab === "pages" && (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold dark:text-white text-zinc-900">Site Pages</h2>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-medium shadow-sm">
              + New Page
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="p-5 border border-zinc-100 dark:border-zinc-800 rounded-xl flex justify-between items-center hover:shadow-md transition-shadow">
              <div>
                <p className="font-bold text-lg dark:text-white text-zinc-900">Home Page</p>
                <p className="text-sm text-gray-500 font-medium">/index</p>
              </div>
              <div className="flex gap-2">
                <span className="text-sm font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-4 py-1.5 rounded-full">Published</span>
                <button className="text-blue-600 font-medium text-sm hover:underline ml-2">Edit</button>
              </div>
            </div>
            <div className="p-5 border border-zinc-100 dark:border-zinc-800 rounded-xl flex justify-between items-center hover:shadow-md transition-shadow">
              <div>
                <p className="font-bold text-lg dark:text-white text-zinc-900">About Us</p>
                <p className="text-sm text-gray-500 font-medium">/about</p>
              </div>
              <div className="flex gap-2">
                <span className="text-sm font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-4 py-1.5 rounded-full">Published</span>
                <button className="text-blue-600 font-medium text-sm hover:underline ml-2">Edit</button>
              </div>
            </div>
            <div className="p-5 border border-zinc-100 dark:border-zinc-800 rounded-xl flex justify-between items-center hover:shadow-md transition-shadow">
              <div>
                <p className="font-bold text-lg dark:text-white text-zinc-900">Admissions Portal</p>
                <p className="text-sm text-gray-500 font-medium">/admissions</p>
              </div>
              <div className="flex gap-2">
                <span className="text-sm font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 px-4 py-1.5 rounded-full">Draft</span>
                <button className="text-blue-600 font-medium text-sm hover:underline ml-2">Edit</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {["theme", "media", "settings"].includes(activeTab) && (
        <div className="animate-in fade-in duration-500 flex flex-col items-center justify-center min-h-[50vh] text-center">
          <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center text-3xl mb-6 shadow-inner">
             {activeTab === 'theme' ? '🎨' : activeTab === 'media' ? '🖼️' : '⚙️'}
          </div>
          <h2 className="text-2xl font-bold dark:text-white capitalize mb-2">{activeTab.replace("-", " ")}</h2>
          <p className="text-zinc-500 max-w-md">
            Configure your institution's public-facing website identity. This powerful CMS tool connects directly to your domain.
          </p>
        </div>
      )}
    </div>
  );
}

export default function WebsiteDashboard() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WebsiteContent />
    </Suspense>
  )
}
