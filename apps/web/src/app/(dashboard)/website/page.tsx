"use client";
import React, { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import SiteBuilder from "../../../components/builder/SiteBuilder";
import AuditLogView from "@/components/users/views/AuditLogView";
import WebsiteAuditLogView from "@/components/builder/WebsiteAuditLogView";

function WebsiteContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeTab = searchParams.get("tab") || "pages";
  const builderPageId = searchParams.get("pageId");

  const [sitePublished, setSitePublished] = React.useState(true);
  const [publishedPages, setPublishedPages] = React.useState<Record<string, boolean>>({});

  React.useEffect(() => {
    // Load state from localStorage on mount
    const savedSiteState = localStorage.getItem('site_published');
    if (savedSiteState !== null) {
      setSitePublished(savedSiteState === 'true');
    }

    const allPages = ['home', 'about', 'about-leadership', 'about-history', 'academics', 'academics-programs', 'academics-faculty', 'admissions-info', 'admissions-fees', 'admissions-apply', 'campus-life', 'campus-events', 'student-services'];
    const loadedPagesState: Record<string, boolean> = {};
    allPages.forEach(p => {
      const savedPageState = localStorage.getItem(`page_published_${p}`);
      // Default to true if not set, to match previous behavior
      loadedPagesState[p] = savedPageState !== null ? savedPageState === 'true' : true;
    });
    setPublishedPages(loadedPagesState);
  }, []);

  const toggleSitePublished = () => {
    const newState = !sitePublished;
    setSitePublished(newState);
    localStorage.setItem('site_published', String(newState));
  };

  const togglePagePublished = (pageId: string) => {
    const newState = !publishedPages[pageId];
    setPublishedPages(prev => ({ ...prev, [pageId]: newState }));
    localStorage.setItem(`page_published_${pageId}`, String(newState));
  };

  if (activeTab === "builder" && builderPageId) {
    return <SiteBuilder onExit={() => router.push('/website')} pageId={builderPageId} />;
  }

  const handleEdit = (pageId: string) => {
    router.push(`/website?tab=builder&pageId=${pageId}`);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white capitalize">
          {activeTab.replace("-", " ")}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Manage your institution's public-facing website and content.</p>
      </header>

      {activeTab === "pages" && (
        <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold dark:text-white text-zinc-900 dark:text-white">Site Pages</h2>
            <div className="flex items-center gap-3">
              <button 
                onClick={toggleSitePublished} 
                className={`px-4 py-2 rounded-xl font-bold shadow-sm transition-colors flex items-center gap-2 ${sitePublished ? 'bg-green-100 hover:bg-green-200 text-green-700 dark:bg-green-900/40 dark:hover:bg-green-900/60 dark:text-green-400' : 'bg-red-100 hover:bg-red-200 text-red-700 dark:bg-red-900/40 dark:hover:bg-red-900/60 dark:text-red-400'}`}
              >
                <span>{sitePublished ? '🟢' : '🔴'}</span> {sitePublished ? 'Site is Live' : 'Site is Offline'}
              </button>
              <a href="/site/home" target="_blank" rel="noopener noreferrer" className="bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 dark:text-zinc-300 dark:text-zinc-300 px-4 py-2 rounded-xl font-bold shadow-sm transition-colors flex items-center gap-2">
                <span>🌐</span> View
              </a>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-medium shadow-sm">
                + New Page
              </button>
            </div>
          </div>
          
          <div className="space-y-4">
            {/* Home Page */}
            <div className="p-5 border border-zinc-100 dark:border-zinc-800 rounded-xl hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center text-lg">🏠</div>
                  <div>
                    <p className="font-bold text-lg dark:text-white text-zinc-900 dark:text-white">Home Page</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">/home</p>
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <button onClick={() => togglePagePublished('home')} className={`text-sm font-bold px-4 py-1.5 rounded-full transition-colors ${publishedPages['home'] ? 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 hover:bg-green-100 dark:hover:bg-green-900/50' : 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 hover:bg-amber-100 dark:hover:bg-amber-900/50'}`}>
                    {publishedPages['home'] ? 'Published' : 'Draft'}
                  </button>
                  <a href="/site/home" target="_blank" rel="noopener noreferrer" className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-1.5 rounded-lg font-medium text-sm hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors ml-2">View Live</a>
                  <button onClick={() => handleEdit('home')} className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 dark:text-zinc-300 dark:text-zinc-300 px-4 py-1.5 rounded-lg font-medium text-sm hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors ml-2">Edit Template</button>
                  <button className="text-zinc-400 hover:text-zinc-600 dark:text-zinc-300 dark:text-zinc-300 ml-2">⚙️</button>
                </div>
              </div>
            </div>

            {/* About Us */}
            <div className="border border-zinc-100 dark:border-zinc-800 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-5 bg-white dark:bg-zinc-900/50 backdrop-blur-md flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center text-lg">ℹ️</div>
                  <div>
                    <p className="font-bold text-lg dark:text-white text-zinc-900 dark:text-white">About Us</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">/about</p>
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <button onClick={() => togglePagePublished("about")} className={`text-sm font-bold px-4 py-1.5 rounded-full transition-colors ${publishedPages["about"] ? "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 hover:bg-green-100 dark:hover:bg-green-900/50" : "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 hover:bg-amber-100 dark:hover:bg-amber-900/50"}`}>{publishedPages["about"] ? "Published" : "Draft"}</button>
                  <a href="/site/about" target="_blank" rel="noopener noreferrer" className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-1.5 rounded-lg font-medium text-sm hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors ml-2">Preview</a>
                  <button onClick={() => handleEdit('about')} className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 dark:text-zinc-300 dark:text-zinc-300 px-4 py-1.5 rounded-lg font-medium text-sm hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors ml-2">Edit Template</button>
                  <button className="text-zinc-400 hover:text-zinc-600 dark:text-zinc-300 dark:text-zinc-300 ml-2">⚙️</button>
                </div>
              </div>
              <div className="bg-zinc-50 dark:bg-zinc-950 dark:bg-zinc-950 dark:bg-zinc-950/50 border-t border-zinc-100 dark:border-zinc-800 p-4 pl-12 space-y-3">
                <div className="flex justify-between items-center border-l-2 border-zinc-200 dark:border-zinc-800 pl-4">
                  <div>
                    <p className="font-semibold text-zinc-800 dark:text-zinc-200 dark:text-zinc-200 dark:text-zinc-200">Leadership Team</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">/about-leadership</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <button onClick={() => togglePagePublished("about-leadership")} className={`text-xs font-bold px-2 py-1 rounded transition-colors mr-2 ${publishedPages["about-leadership"] ? "text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/30" : "text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-900/30"}`}>{publishedPages["about-leadership"] ? "Published" : "Draft"}</button>
                    <a href="/site/about-leadership" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-medium text-sm hover:underline mr-2">Preview</a>
                    <button onClick={() => handleEdit('about-leadership')} className="text-zinc-600 dark:text-zinc-300 dark:text-zinc-300 dark:text-zinc-400 font-medium text-sm hover:underline">Edit</button>
                  </div>
                </div>
                <div className="flex justify-between items-center border-l-2 border-zinc-200 dark:border-zinc-800 pl-4">
                  <div>
                    <p className="font-semibold text-zinc-800 dark:text-zinc-200 dark:text-zinc-200 dark:text-zinc-200">History & Mission</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">/about-history</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <button onClick={() => togglePagePublished("about-history")} className={`text-xs font-bold px-2 py-1 rounded transition-colors mr-2 ${publishedPages["about-history"] ? "text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/30" : "text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-900/30"}`}>{publishedPages["about-history"] ? "Published" : "Draft"}</button>
                    <a href="/site/about-history" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-medium text-sm hover:underline mr-2">Preview</a>
                    <button onClick={() => handleEdit('about-history')} className="text-zinc-600 dark:text-zinc-300 dark:text-zinc-300 dark:text-zinc-400 font-medium text-sm hover:underline">Edit</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Academics */}
            <div className="border border-zinc-100 dark:border-zinc-800 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-5 bg-white dark:bg-zinc-900/50 backdrop-blur-md flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center text-lg">📚</div>
                  <div>
                    <p className="font-bold text-lg dark:text-white text-zinc-900 dark:text-white">Academics</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">/academics</p>
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <button onClick={() => togglePagePublished("academics")} className={`text-sm font-bold px-4 py-1.5 rounded-full transition-colors ${publishedPages["academics"] ? "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 hover:bg-green-100 dark:hover:bg-green-900/50" : "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 hover:bg-amber-100 dark:hover:bg-amber-900/50"}`}>{publishedPages["academics"] ? "Published" : "Draft"}</button>
                  <a href="/site/academics" target="_blank" rel="noopener noreferrer" className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-1.5 rounded-lg font-medium text-sm hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors ml-2">Preview</a>
                  <button onClick={() => handleEdit('academics')} className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 dark:text-zinc-300 dark:text-zinc-300 px-4 py-1.5 rounded-lg font-medium text-sm hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors ml-2">Edit Template</button>
                  <button className="text-zinc-400 hover:text-zinc-600 dark:text-zinc-300 dark:text-zinc-300 ml-2">⚙️</button>
                </div>
              </div>
              <div className="bg-zinc-50 dark:bg-zinc-950 dark:bg-zinc-950 dark:bg-zinc-950/50 border-t border-zinc-100 dark:border-zinc-800 p-4 pl-12 space-y-3">
                <div className="flex justify-between items-center border-l-2 border-zinc-200 dark:border-zinc-800 pl-4">
                  <div>
                    <p className="font-semibold text-zinc-800 dark:text-zinc-200 dark:text-zinc-200 dark:text-zinc-200">Programs & Courses</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">/academics-programs</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <button onClick={() => togglePagePublished("academics-programs")} className={`text-xs font-bold px-2 py-1 rounded transition-colors mr-2 ${publishedPages["academics-programs"] ? "text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/30" : "text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-900/30"}`}>{publishedPages["academics-programs"] ? "Published" : "Draft"}</button>
                    <a href="/site/academics-programs" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-medium text-sm hover:underline mr-2">Preview</a>
                    <button onClick={() => handleEdit('academics-programs')} className="text-zinc-600 dark:text-zinc-300 dark:text-zinc-300 dark:text-zinc-400 font-medium text-sm hover:underline">Edit</button>
                  </div>
                </div>
                <div className="flex justify-between items-center border-l-2 border-zinc-200 dark:border-zinc-800 pl-4">
                  <div>
                    <p className="font-semibold text-zinc-800 dark:text-zinc-200 dark:text-zinc-200 dark:text-zinc-200">Faculty</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">/academics-faculty</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <button onClick={() => togglePagePublished("academics-faculty")} className={`text-xs font-bold px-2 py-1 rounded transition-colors mr-2 ${publishedPages["academics-faculty"] ? "text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/30" : "text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-900/30"}`}>{publishedPages["academics-faculty"] ? "Published" : "Draft"}</button>
                    <a href="/site/academics-faculty" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-medium text-sm hover:underline mr-2">Preview</a>
                    <button onClick={() => handleEdit('academics-faculty')} className="text-zinc-600 dark:text-zinc-300 dark:text-zinc-300 dark:text-zinc-400 font-medium text-sm hover:underline">Edit</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Admissions */}
            <div className="border border-zinc-100 dark:border-zinc-800 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-5 bg-white dark:bg-zinc-900/50 backdrop-blur-md flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center text-lg">🎓</div>
                  <div>
                    <p className="font-bold text-lg dark:text-white text-zinc-900 dark:text-white">Admissions Portal</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">/admissions-info</p>
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <button onClick={() => togglePagePublished("admissions-info")} className={`text-sm font-bold px-4 py-1.5 rounded-full transition-colors ${publishedPages["admissions-info"] ? "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 hover:bg-green-100 dark:hover:bg-green-900/50" : "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 hover:bg-amber-100 dark:hover:bg-amber-900/50"}`}>{publishedPages["admissions-info"] ? "Published" : "Draft"}</button>
                  <a href="/site/admissions-info" target="_blank" rel="noopener noreferrer" className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-1.5 rounded-lg font-medium text-sm hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors ml-2">Preview</a>
                  <button onClick={() => handleEdit('admissions-info')} className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 dark:text-zinc-300 dark:text-zinc-300 px-4 py-1.5 rounded-lg font-medium text-sm hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors ml-2">Edit Template</button>
                  <button className="text-zinc-400 hover:text-zinc-600 dark:text-zinc-300 dark:text-zinc-300 ml-2">⚙️</button>
                </div>
              </div>
              <div className="bg-zinc-50 dark:bg-zinc-950 dark:bg-zinc-950 dark:bg-zinc-950/50 border-t border-zinc-100 dark:border-zinc-800 p-4 pl-12 space-y-3">
                <div className="flex justify-between items-center border-l-2 border-zinc-200 dark:border-zinc-800 pl-4">
                  <div>
                    <p className="font-semibold text-zinc-800 dark:text-zinc-200 dark:text-zinc-200 dark:text-zinc-200">Fee Structure</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">/admissions-fees</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <button onClick={() => togglePagePublished("admissions-fees")} className={`text-xs font-bold px-2 py-1 rounded transition-colors mr-2 ${publishedPages["admissions-fees"] ? "text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/30" : "text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-900/30"}`}>{publishedPages["admissions-fees"] ? "Published" : "Draft"}</button>
                    <a href="/site/admissions-fees" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-medium text-sm hover:underline mr-2">Preview</a>
                    <button onClick={() => handleEdit('admissions-fees')} className="text-zinc-600 dark:text-zinc-300 dark:text-zinc-300 dark:text-zinc-400 font-medium text-sm hover:underline">Edit</button>
                  </div>
                </div>
                <div className="flex justify-between items-center border-l-2 border-zinc-200 dark:border-zinc-800 pl-4">
                  <div>
                    <p className="font-semibold text-zinc-800 dark:text-zinc-200 dark:text-zinc-200 dark:text-zinc-200">Apply Now</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">/admissions-apply</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <button onClick={() => togglePagePublished("admissions-apply")} className={`text-xs font-bold px-2 py-1 rounded transition-colors mr-2 ${publishedPages["admissions-apply"] ? "text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/30" : "text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-900/30"}`}>{publishedPages["admissions-apply"] ? "Published" : "Draft"}</button>
                    <a href="/site/admissions-apply" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-medium text-sm hover:underline mr-2">Preview</a>
                    <button onClick={() => handleEdit('admissions-apply')} className="text-zinc-600 dark:text-zinc-300 dark:text-zinc-300 dark:text-zinc-400 font-medium text-sm hover:underline">Edit</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Campus Life */}
            <div className="border border-zinc-100 dark:border-zinc-800 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-5 bg-white dark:bg-zinc-900/50 backdrop-blur-md flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center text-lg">⚽</div>
                  <div>
                    <p className="font-bold text-lg dark:text-white text-zinc-900 dark:text-white">Campus Life</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">/campus-life</p>
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <button onClick={() => togglePagePublished("campus-life")} className={`text-sm font-bold px-4 py-1.5 rounded-full transition-colors ${publishedPages["campus-life"] ? "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 hover:bg-green-100 dark:hover:bg-green-900/50" : "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 hover:bg-amber-100 dark:hover:bg-amber-900/50"}`}>{publishedPages["campus-life"] ? "Published" : "Draft"}</button>
                  <a href="/site/campus-life" target="_blank" rel="noopener noreferrer" className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-1.5 rounded-lg font-medium text-sm hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors ml-2">Preview</a>
                  <button onClick={() => handleEdit('campus-life')} className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 dark:text-zinc-300 dark:text-zinc-300 px-4 py-1.5 rounded-lg font-medium text-sm hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors ml-2">Edit Template</button>
                  <button className="text-zinc-400 hover:text-zinc-600 dark:text-zinc-300 dark:text-zinc-300 ml-2">⚙️</button>
                </div>
              </div>
              <div className="bg-zinc-50 dark:bg-zinc-950 dark:bg-zinc-950 dark:bg-zinc-950/50 border-t border-zinc-100 dark:border-zinc-800 p-4 pl-12 space-y-3">
                <div className="flex justify-between items-center border-l-2 border-zinc-200 dark:border-zinc-800 pl-4">
                  <div>
                    <p className="font-semibold text-zinc-800 dark:text-zinc-200 dark:text-zinc-200 dark:text-zinc-200">Events & News</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">/campus-events</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <button onClick={() => togglePagePublished("campus-events")} className={`text-xs font-bold px-2 py-1 rounded transition-colors mr-2 ${publishedPages["campus-events"] ? "text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/30" : "text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-900/30"}`}>{publishedPages["campus-events"] ? "Published" : "Draft"}</button>
                    <a href="/site/campus-events" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-medium text-sm hover:underline mr-2">Preview</a>
                    <button onClick={() => handleEdit('campus-events')} className="text-zinc-600 dark:text-zinc-300 dark:text-zinc-300 dark:text-zinc-400 font-medium text-sm hover:underline">Edit</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Student Services */}
            <div className="p-5 border border-zinc-100 dark:border-zinc-800 rounded-xl hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center text-lg">🤝</div>
                  <div>
                    <p className="font-bold text-lg dark:text-white text-zinc-900 dark:text-white">Student Services</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">/student-services</p>
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <button onClick={() => togglePagePublished("student-services")} className={`text-sm font-bold px-4 py-1.5 rounded-full transition-colors ${publishedPages["student-services"] ? "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 hover:bg-green-100 dark:hover:bg-green-900/50" : "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 hover:bg-amber-100 dark:hover:bg-amber-900/50"}`}>{publishedPages["student-services"] ? "Published" : "Draft"}</button>
                  <a href="/site/student-services" target="_blank" rel="noopener noreferrer" className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-1.5 rounded-lg font-medium text-sm hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors ml-2">Preview</a>
                  <button onClick={() => handleEdit('student-services')} className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 dark:text-zinc-300 dark:text-zinc-300 px-4 py-1.5 rounded-lg font-medium text-sm hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors ml-2">Edit Template</button>
                  <button className="text-zinc-400 hover:text-zinc-600 dark:text-zinc-300 dark:text-zinc-300 ml-2">⚙️</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}


      {activeTab === "audit" && (
        <WebsiteAuditLogView />
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
