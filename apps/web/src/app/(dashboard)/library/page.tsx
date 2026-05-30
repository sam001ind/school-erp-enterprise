"use client";
import React, { useState } from "react";

export default function LibraryDashboard() {
  const [activeTab, setActiveTab] = useState("borrowed");

  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Library</h1>
        <p className="text-gray-500 mt-2">Search catalogue, manage borrowed books, and track fines.</p>
      </header>

      <div className="flex border-b border-gray-200 dark:border-gray-800 mb-8 overflow-x-auto">
        <button onClick={() => setActiveTab("borrowed")} className={`py-3 px-6 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${activeTab === "borrowed" ? "border-purple-500 text-purple-600 dark:text-purple-400" : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}>My Borrowed Books</button>
        <button onClick={() => setActiveTab("search")} className={`py-3 px-6 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${activeTab === "search" ? "border-purple-500 text-purple-600 dark:text-purple-400" : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}>Search Catalogue</button>
        <button onClick={() => setActiveTab("fines")} className={`py-3 px-6 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${activeTab === "fines" ? "border-purple-500 text-purple-600 dark:text-purple-400" : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}>Overdue Fines</button>
      </div>

      {activeTab === "borrowed" && (
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm p-6 text-center text-gray-500">
          You currently have no borrowed books.
        </div>
      )}
    </div>
  );
}
