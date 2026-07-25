"use client";
import React, { Suspense } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { getTenant } from "@/app/actions/tenant";

import { moduleMenus } from "@/lib/navigation";
import { useGlobalSystem } from "@/lib/GlobalSystemContext";
import { UserManagementProvider, useUserManagement } from "@/lib/UserManagementContext";

function ActivityTracker() {
  const { logAction } = useUserManagement();
  const pathname = usePathname();

  React.useEffect(() => {
    // Simple global event tracker to simulate "keystrokes and changes" audit log
    const handleInput = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT')) {
        const activeModule = pathname.split('/')[1] || 'system';
        const elName = target.getAttribute('name') || target.getAttribute('placeholder') || 'input field';
        // Throttled in a real scenario, but for simulation we just log the blur/change
        logAction("usr_1", `Modified ${elName}`, activeModule.charAt(0).toUpperCase() + activeModule.slice(1), "Success");
      }
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const button = target.closest('button');
      if (button && button.innerText) {
        const activeModule = pathname.split('/')[1] || 'system';
        logAction("usr_1", `Clicked button: ${button.innerText.trim()}`, activeModule.charAt(0).toUpperCase() + activeModule.slice(1), "Success");
      }
    };

    // We use focusout/change for inputs to prevent excessive logs per keystroke
    window.addEventListener('focusout', handleInput);
    window.addEventListener('change', handleInput);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('focusout', handleInput);
      window.removeEventListener('change', handleInput);
      window.removeEventListener('click', handleClick);
    };
  }, [pathname, logAction]);

  return null;
}

function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);
  const [tenantLogo, setTenantLogo] = React.useState<string | null>(null);
  const { academicYears, activeYearId, setActiveYearId, getActiveYear } = useGlobalSystem();
  
  React.useEffect(() => {
    getTenant().then(res => {
      if (res.success && res.tenant?.logoUrl) {
        setTenantLogo(res.tenant.logoUrl);
      }
    });
  }, []);
  
  // Determine current active module and its menus
  const activeModulePath = Object.keys(moduleMenus).find(path => pathname.startsWith(path)) || "";
  const currentMenus = activeModulePath ? moduleMenus[activeModulePath] : [];
  
  // Default to the first tab if no query param is present
  const currentTab = searchParams.get("tab") || (currentMenus.length > 0 ? currentMenus[0].id : "");

  return (
    <div className="flex h-screen font-sans bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-black overflow-hidden relative">
      
      {/* Luminous Background Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-400/30 dark:bg-indigo-900/40 blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-purple-400/20 dark:bg-purple-900/30 blur-3xl opacity-30 pointer-events-none" />

      {/* Context-Aware Sidebar */}
      <aside className={`${isSidebarCollapsed ? 'w-16' : 'w-64'} bg-white dark:bg-zinc-900/50 backdrop-blur-md/60 dark:bg-zinc-950/40 backdrop-blur-md border-r border-white/40 dark:border-white/10 flex flex-col hidden md:flex shadow-xl shadow-blue-900/5 transition-all duration-300 z-10`}>
        <div className={`border-b border-white/40 dark:border-white/10 bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex flex-col justify-center shadow-lg shadow-blue-500/20 relative overflow-hidden ${isSidebarCollapsed ? 'p-4 items-center h-[88px]' : 'p-6 h-[88px]'}`}>
          {/* Subtle glow inside the header */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white dark:bg-zinc-900/50 backdrop-blur-md/10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2"></div>
          
          {!isSidebarCollapsed ? (
            <div className="relative z-10 flex items-center gap-3">
              {tenantLogo && (
                <img src={tenantLogo} alt="Logo" className="w-8 h-8 rounded-full object-cover border border-white/30 bg-white/10" />
              )}
              <div>
                <h2 className="text-xl font-bold tracking-tight truncate w-full drop-shadow-sm">My Institution</h2>
                <p className="text-blue-100 text-xs font-medium mt-0.5 uppercase tracking-wider truncate w-full opacity-90">
                  {activeModulePath.replace("/", "") || "Module"}
                </p>
              </div>
            </div>
          ) : (
            <div className="font-bold text-2xl tracking-tighter relative z-10 flex items-center justify-center">
              {tenantLogo ? (
                <img src={tenantLogo} alt="Logo" className="w-8 h-8 rounded-full object-cover border border-white/30 bg-white/10" />
              ) : (
                "MI"
              )}
            </div>
          )}
        </div>
        
        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1.5 custom-scrollbar relative z-10">
          {currentMenus.map((menu) => {
            const isActive = currentTab === menu.id;
            return (
              <Link
                key={menu.id}
                href={`${activeModulePath}?tab=${menu.id}`}
                className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative overflow-hidden ${
                  isActive 
                    ? "text-blue-700 dark:text-blue-300 font-semibold bg-blue-50/80 dark:bg-blue-500/10 border border-blue-200/50 dark:border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.15)] dark:shadow-[0_0_20px_rgba(59,130,246,0.1)]" 
                    : "text-zinc-600 dark:text-zinc-300 dark:text-zinc-300 dark:text-zinc-400 hover:bg-white dark:bg-zinc-900/50 backdrop-blur-md/50 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:text-white dark:hover:text-zinc-200 font-medium"
                }`}
              >
                {isActive && <div className={`w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.8)] ${isSidebarCollapsed ? 'absolute left-2' : ''}`} />}
                {isSidebarCollapsed ? (
                   <span className="font-bold text-lg">{menu.title.charAt(0)}</span>
                ) : (
                   <span className="truncate">{menu.title}</span>
                )}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Sticky Top Header */}
        <header className="h-[88px] bg-white dark:bg-zinc-900/50 backdrop-blur-md/60 dark:bg-zinc-950/40 backdrop-blur-md border-b border-white/40 dark:border-white/10 flex items-center justify-between px-6 shadow-sm z-20 shrink-0">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
                className="p-2 -ml-2 hover:bg-white dark:bg-zinc-900/50 backdrop-blur-md/80 dark:hover:bg-zinc-800/50 rounded-xl text-zinc-600 dark:text-zinc-300 dark:text-zinc-300 dark:text-zinc-300 transition-all duration-200 hidden md:flex items-center justify-center hover:shadow-md"
                title={isSidebarCollapsed ? "Expand Menu" : "Collapse Menu"}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </button>
              <h1 className="font-bold text-lg text-zinc-900 dark:text-white capitalize hidden md:block">
                {activeModulePath.replace("/", "")}
              </h1>
              <h1 className="font-bold text-lg text-zinc-900 dark:text-white md:hidden">
                My Institution
              </h1>

              {/* Environment Indicator */}
              {process.env.NEXT_PUBLIC_APP_ENV && (
                <div className={`ml-4 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase border shadow-sm ${
                  process.env.NEXT_PUBLIC_APP_ENV === 'LOCAL' 
                    ? 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800' 
                    : process.env.NEXT_PUBLIC_APP_ENV === 'STAGING' 
                      ? 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800' 
                      : 'bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-900/30 dark:text-rose-400 dark:border-rose-800'
                }`}>
                  {process.env.NEXT_PUBLIC_APP_ENV}
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-6">
              {/* Home Icon */}
              <Link href="/" className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300 dark:text-zinc-300 hover:text-blue-600 dark:text-zinc-300 dark:hover:text-blue-400 transition-all duration-300 bg-white dark:bg-zinc-900/50 backdrop-blur-md/50 dark:bg-zinc-800/30 hover:bg-white dark:bg-zinc-900/50 backdrop-blur-md dark:hover:bg-zinc-800 backdrop-blur-md px-3 py-2 rounded-xl font-medium text-sm shadow-sm hover:shadow-md border border-white/40 dark:border-white/5">
                <span>🏠</span> Home
              </Link>

              <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-700 hidden sm:block"></div>

              {/* Global Academic Year Switcher */}
              <div className="relative group">
                <button className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300 dark:text-zinc-300 hover:text-indigo-600 dark:text-zinc-300 dark:hover:text-indigo-400 transition-all duration-300 bg-white dark:bg-zinc-900/50 backdrop-blur-md/50 dark:bg-zinc-800/30 hover:bg-white dark:bg-zinc-900/50 backdrop-blur-md dark:hover:bg-zinc-800 backdrop-blur-md px-3 py-2 rounded-xl font-bold text-sm shadow-sm hover:shadow-md border border-white/40 dark:border-white/5">
                  📅 {getActiveYear()?.name}
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </button>
                {/* Dropdown */}
                <div className="absolute right-0 mt-3 w-48 bg-white dark:bg-zinc-900/50 backdrop-blur-md/80 dark:bg-zinc-900/80 backdrop-blur-md rounded-2xl shadow-2xl border border-white/40 dark:border-zinc-700/50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 transform origin-top-right scale-95 group-hover:scale-100 overflow-hidden">
                  <div className="p-3 border-b border-zinc-100 dark:border-zinc-800">
                    <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400 dark:text-zinc-400 uppercase tracking-wider">Select Academic Year</p>
                  </div>
                  <div className="max-h-60 overflow-y-auto p-1">
                    {academicYears.map(year => (
                      <button 
                        key={year.id} 
                        onClick={() => setActiveYearId(year.id)}
                        className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-colors flex justify-between items-center ${activeYearId === year.id ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400' : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/40 dark:bg-zinc-950 dark:hover:bg-zinc-800/40 dark:bg-zinc-950 dark:hover:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 dark:text-zinc-300 dark:text-zinc-300'}`}
                      >
                        {year.name}
                        {activeYearId === year.id && <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Notifications */}
              <div className="relative group">
                <button className="p-2 relative text-zinc-500 dark:text-zinc-400 dark:text-zinc-400 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-all duration-300 bg-white dark:bg-zinc-900/50 backdrop-blur-md/50 hover:bg-white dark:bg-zinc-900/50 backdrop-blur-md dark:bg-zinc-800/30 dark:hover:bg-zinc-800 backdrop-blur-md rounded-xl shadow-sm hover:shadow-md border border-white/40 dark:border-white/5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-zinc-900 shadow-[0_0_8px_rgba(239,68,68,0.6)] animate-pulse"></span>
                </button>
                {/* Dropdown */}
                <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-zinc-900/50 backdrop-blur-md/80 dark:bg-zinc-900/80 backdrop-blur-md rounded-2xl shadow-2xl border border-white/40 dark:border-zinc-700/50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 transform origin-top-right scale-95 group-hover:scale-100">
                  <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
                    <h3 className="font-semibold text-zinc-900 dark:text-white">Notifications</h3>
                    <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">Mark all read</button>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    <div className="p-4 border-b border-zinc-50 dark:border-zinc-800/50 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 dark:bg-zinc-950 dark:hover:bg-zinc-800/40 dark:bg-zinc-950 dark:hover:bg-zinc-800/50 cursor-pointer transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 shrink-0 h-2 w-2 rounded-full bg-blue-500"></div>
                        <div>
                          <p className="text-sm text-zinc-800 dark:text-zinc-200 dark:text-zinc-200 dark:text-zinc-200 font-medium">New Instagram DM</p>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 dark:text-zinc-400 mt-1">John asked about the upcoming event.</p>
                          <p className="text-[10px] text-zinc-400 mt-2 uppercase font-semibold">2 mins ago</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border-b border-zinc-50 dark:border-zinc-800/50 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 dark:bg-zinc-950 dark:hover:bg-zinc-800/40 dark:bg-zinc-950 dark:hover:bg-zinc-800/50 cursor-pointer transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 shrink-0 h-2 w-2 rounded-full bg-blue-500"></div>
                        <div>
                          <p className="text-sm text-zinc-800 dark:text-zinc-200 dark:text-zinc-200 dark:text-zinc-200 font-medium">Post Published Successfully</p>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 dark:text-zinc-400 mt-1">Your LinkedIn post is now live.</p>
                          <p className="text-[10px] text-zinc-400 mt-2 uppercase font-semibold">1 hour ago</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 dark:bg-zinc-950 dark:hover:bg-zinc-800/40 dark:bg-zinc-950 dark:hover:bg-zinc-800/50 cursor-pointer transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 shrink-0 h-2 w-2 rounded-full bg-zinc-300"></div>
                        <div>
                          <p className="text-sm text-zinc-800 dark:text-zinc-200 dark:text-zinc-200 dark:text-zinc-200 font-medium">New Channel Connected</p>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 dark:text-zinc-400 mt-1">Facebook Page was added to the hub.</p>
                          <p className="text-[10px] text-zinc-400 mt-2 uppercase font-semibold">Yesterday</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 border-t border-zinc-100 dark:border-zinc-800 text-center">
                    <button className="text-sm text-zinc-500 dark:text-zinc-400 dark:text-zinc-400 hover:text-zinc-700 dark:text-zinc-300 dark:text-zinc-300 font-medium">View all notifications</button>
                  </div>
                </div>
              </div>

              {/* User Profile & Logout */}
              <div className="hidden sm:flex items-center gap-3 cursor-pointer group bg-white dark:bg-zinc-900/50 backdrop-blur-md/50 hover:bg-white dark:bg-zinc-900/50 backdrop-blur-md dark:bg-zinc-800/30 dark:hover:bg-zinc-800 backdrop-blur-md px-2 py-1.5 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md border border-white/40 dark:border-white/5">
                <div className="text-right pl-2">
                  <p className="text-sm font-semibold text-zinc-900 dark:text-white">Admin User</p>
                  <p className="text-xs text-red-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity absolute">Logout</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-500 text-white flex items-center justify-center font-bold shadow-lg shadow-indigo-500/30 transform group-hover:scale-105 transition-all duration-300 border border-white/20">
                  A
                </div>
              </div>
            </div>
        </header>
        
        <main className="flex-1 overflow-y-auto custom-scrollbar bg-transparent relative z-10">
          <ActivityTracker />
          {children}
        </main>
      </div>
    </div>
  );
}

// Wrap in Suspense because useSearchParams triggers de-opt warnings in Next.js if missing
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <UserManagementProvider>
      <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading Module...</div>}>
        <LayoutContent>{children}</LayoutContent>
      </Suspense>
    </UserManagementProvider>
  )
}
