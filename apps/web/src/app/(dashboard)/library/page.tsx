"use client";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function LibraryContent() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "borrowed";

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white capitalize">
          {activeTab.replace("-", " ")}
        </h1>
        <p className="text-gray-500 mt-2">Search catalogue, manage borrowed books, and track fines.</p>
      </header>

      {activeTab === "borrowed" && (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm p-8 text-center text-gray-500 font-medium">
          You currently have no borrowed books.
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
