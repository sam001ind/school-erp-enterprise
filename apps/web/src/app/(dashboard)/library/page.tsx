"use client";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import { BookOpen, BookMarked, Clock, AlertCircle } from "lucide-react";

function LibraryContent() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "borrowed";

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="bg-gradient-to-r from-orange-500 to-red-600 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-4xl font-bold capitalize mb-2">
            {activeTab.replace("-", " ")} Library
          </h1>
          <p className="text-orange-100 text-lg">Search catalogue, manage borrowed books, and track fines.</p>
        </div>
        <BookOpen className="absolute right-8 -bottom-8 w-48 h-48 text-white opacity-10 transform -rotate-12" />
      </header>

      {activeTab === "borrowed" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: "Books Borrowed", value: "3", icon: BookMarked, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20" },
              { label: "Due Soon", value: "1", icon: Clock, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-900/20" },
              { label: "Overdue Fines", value: "$0.00", icon: AlertCircle, color: "text-green-500", bg: "bg-green-50 dark:bg-green-900/20" },
            ].map((stat, i) => (
              <div key={i} className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow group">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
                <p className="text-gray-500 dark:text-zinc-400 text-sm font-medium">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm p-8 text-center">
             <div className="w-16 h-16 bg-gray-50 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-gray-400" />
             </div>
             <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Borrowed Books</h3>
             <p className="text-gray-500">You currently have no borrowed books.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LibraryDashboard() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LibraryContent />
    </Suspense>
  )
}
