"use client";

import React, { useState } from "react";
import { ShieldCheck, Key, Lock, Smartphone, Globe, EyeOff, Check, X } from "lucide-react";

export default function SecuritySettingsView() {
  const [settings, setSettings] = useState({
    enforceMfaGlobal: false,
    sessionTimeoutMins: 30,
    maxFailedLogins: 5,
    passwordExpirationDays: 90,
    preventConcurrentSessions: true,
    restrictToCountry: false,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex flex-col gap-6 pb-12">
      <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md p-8 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-indigo-500" /> Global Security Policies
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Configure organization-wide security protocols for all ERP users.</p>
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl text-sm font-semibold shadow-md transition-colors flex items-center gap-2">
            Save Policies
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* MFA Global */}
          <div className={`p-6 border rounded-2xl transition-all cursor-pointer ${settings.enforceMfaGlobal ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-900/10' : 'border-slate-200 dark:border-zinc-800 hover:border-slate-300'}`} onClick={() => toggleSetting('enforceMfaGlobal')}>
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${settings.enforceMfaGlobal ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400' : 'bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-slate-400 dark:bg-zinc-800'}`}>
                <Smartphone className="h-6 w-6" />
              </div>
              <div className={`h-6 w-10 rounded-full flex items-center p-1 transition-colors ${settings.enforceMfaGlobal ? 'bg-indigo-500' : 'bg-slate-300 dark:bg-zinc-700'}`}>
                <div className={`h-4 w-4 rounded-full bg-white dark:bg-zinc-900/50 backdrop-blur-md transition-transform ${settings.enforceMfaGlobal ? 'translate-x-4' : 'translate-x-0'}`}></div>
              </div>
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">Enforce Global MFA</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Require multi-factor authentication for ALL users regardless of role.</p>
          </div>

          {/* Concurrent Sessions */}
          <div className={`p-6 border rounded-2xl transition-all cursor-pointer ${settings.preventConcurrentSessions ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-900/10' : 'border-slate-200 dark:border-zinc-800 hover:border-slate-300'}`} onClick={() => toggleSetting('preventConcurrentSessions')}>
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${settings.preventConcurrentSessions ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400' : 'bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-slate-400 dark:bg-zinc-800'}`}>
                <Lock className="h-6 w-6" />
              </div>
              <div className={`h-6 w-10 rounded-full flex items-center p-1 transition-colors ${settings.preventConcurrentSessions ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-zinc-700'}`}>
                <div className={`h-4 w-4 rounded-full bg-white dark:bg-zinc-900/50 backdrop-blur-md transition-transform ${settings.preventConcurrentSessions ? 'translate-x-4' : 'translate-x-0'}`}></div>
              </div>
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">Prevent Concurrent Sessions</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Automatically log out previous sessions when a user logs in from a new device.</p>
          </div>

          {/* Geo-Fencing */}
          <div className={`p-6 border rounded-2xl transition-all cursor-pointer ${settings.restrictToCountry ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-900/10' : 'border-slate-200 dark:border-zinc-800 hover:border-slate-300'}`} onClick={() => toggleSetting('restrictToCountry')}>
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${settings.restrictToCountry ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400' : 'bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-slate-400 dark:bg-zinc-800'}`}>
                <Globe className="h-6 w-6" />
              </div>
              <div className={`h-6 w-10 rounded-full flex items-center p-1 transition-colors ${settings.restrictToCountry ? 'bg-amber-500' : 'bg-slate-300 dark:bg-zinc-700'}`}>
                <div className={`h-4 w-4 rounded-full bg-white dark:bg-zinc-900/50 backdrop-blur-md transition-transform ${settings.restrictToCountry ? 'translate-x-4' : 'translate-x-0'}`}></div>
              </div>
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">Geo-Fencing (Country Restriction)</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Block login attempts originating from IP addresses outside the origin country.</p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-slate-200 dark:border-zinc-800">
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Session Timeout (Minutes)</label>
            <input 
              type="number" 
              value={settings.sessionTimeoutMins} 
              onChange={e => setSettings({...settings, sessionTimeoutMins: parseInt(e.target.value)})}
              className="w-full bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-800 dark:border-zinc-700 rounded-xl px-4 py-2 outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Max Failed Logins (Lockout)</label>
            <input 
              type="number" 
              value={settings.maxFailedLogins} 
              onChange={e => setSettings({...settings, maxFailedLogins: parseInt(e.target.value)})}
              className="w-full bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-800 dark:border-zinc-700 rounded-xl px-4 py-2 outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Password Expiration (Days)</label>
            <input 
              type="number" 
              value={settings.passwordExpirationDays} 
              onChange={e => setSettings({...settings, passwordExpirationDays: parseInt(e.target.value)})}
              className="w-full bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-800 dark:border-zinc-700 rounded-xl px-4 py-2 outline-none focus:border-indigo-500"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
