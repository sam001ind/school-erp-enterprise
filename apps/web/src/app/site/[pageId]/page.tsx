"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Blocks, getPageTemplate } from "../../../components/builder/SiteBuilder";

interface Section {
  id: string;
  type: string;
  props: any;
  isHidden?: boolean;
}

export default function LiveSitePage() {
  const params = useParams();
  const pageId = params.pageId as string;
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSitePublished, setIsSitePublished] = useState(true);
  const [isPagePublished, setIsPagePublished] = useState(true);

  useEffect(() => {
    // Check Global Site Published State
    const siteState = localStorage.getItem('site_published');
    if (siteState !== null && siteState === 'false') {
      setIsSitePublished(false);
      setLoading(false);
      return;
    }

    // Check Per-Page Published State
    const pageState = localStorage.getItem(`page_published_${pageId}`);
    if (pageState !== null && pageState === 'false') {
      setIsPagePublished(false);
      setLoading(false);
      return;
    }

    // Load published data from localStorage
    const saved = localStorage.getItem(`builder_page_${pageId}`);
    if (saved) {
      try {
        let parsed = JSON.parse(saved);
        if (!parsed.some((s: Section) => s.type === 'HeaderNavigation')) {
          parsed = [{ id: 'sec-header', type: 'HeaderNavigation', props: {} }, ...parsed];
        }
        setSections(parsed);
      } catch (e) {
        console.error("Failed to parse published page data");
        setSections(getPageTemplate(pageId));
      }
    } else {
      // Automatically "publish" by showing the default template
      setSections(getPageTemplate(pageId));
    }
    setLoading(false);
  }, [pageId]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-zinc-500">Loading page...</div>;
  }

  if (!isSitePublished) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 text-center px-4">
        <h1 className="text-4xl font-bold mb-4 text-zinc-900">Site Under Maintenance</h1>
        <p className="text-xl text-zinc-500 max-w-lg">We are currently updating our website to serve you better. Please check back later.</p>
      </div>
    );
  }

  if (!isPagePublished) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 text-center px-4">
        <h1 className="text-4xl font-bold mb-4 text-zinc-900">Page Not Available</h1>
        <p className="text-xl text-zinc-500 max-w-lg">This page is currently unpublished or does not exist.</p>
        <a href="/site/home" className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors">Go to Homepage</a>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen font-sans">
      {sections.filter(s => !s.isHidden).map((section) => {
        const BlockComponent = Blocks[section.type];
        if (!BlockComponent) return null;
        return <BlockComponent key={section.id} props={section.props} />;
      })}
      
      {/* Floating Chatbot UI for the live site */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end group">
        <div className="bg-white dark:bg-zinc-900 shadow-2xl rounded-2xl p-4 w-72 mb-4 border border-zinc-200 dark:border-zinc-800 hidden group-hover:block transition-all transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
          <div className="flex items-center gap-3 mb-4 border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400">🤖</div>
            <div>
              <h4 className="font-bold text-sm">Admission Bot</h4>
              <p className="text-[10px] text-green-500">Online</p>
            </div>
          </div>
          <div className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-lg">
            Hi! I can help you with Admission FAQs, Course Searches, and Event queries. How can I help?
          </div>
          <input type="text" placeholder="Type a message..." className="w-full bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-xs outline-none" />
        </div>
        <button className="w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-2xl flex items-center justify-center text-2xl transition-transform hover:scale-110">
          💬
        </button>
      </div>
    </div>
  );
}
