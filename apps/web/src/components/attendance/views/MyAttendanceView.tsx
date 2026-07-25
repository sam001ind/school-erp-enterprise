"use client";

import React, { useState } from "react";
import { useAttendance } from "@/lib/AttendanceContext";
import { MapPin, Clock, Fingerprint, CalendarCheck, Smartphone } from "lucide-react";

export default function MyAttendanceView() {
  const { getMyRecords, addRecord } = useAttendance();
  const myRecords = getMyRecords("emp_1"); // Mocking logged in user as Alice Smith
  const todayRecord = myRecords.find(r => r.date.toDateString() === new Date().toDateString());
  
  const [checkingIn, setCheckingIn] = useState(false);

  const handleAppCheckIn = () => {
    setCheckingIn(true);
    setTimeout(() => {
      addRecord({
        userId: "emp_1",
        userName: "Alice Smith (Teacher)",
        role: "EMPLOYEE",
        date: new Date(),
        status: "PRESENT",
        checkInMethod: "APP",
        checkInTime: new Date()
      });
      setCheckingIn(false);
    }, 1500); // Simulate GPS verification delay
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Geolocation App Check-in Hero */}
      <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md p-8 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col items-center justify-center text-center">
        <div className="h-16 w-16 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center mb-4">
          <Smartphone className="h-8 w-8 text-blue-600 dark:text-blue-400" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Remote App Check-in</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-md mx-auto">
          You can mark your attendance from this device. We will verify your location to ensure you are within the campus geofence.
        </p>
        
        {todayRecord ? (
          <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4 flex items-center gap-3">
            <CalendarCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            <div className="text-left">
              <p className="text-sm font-bold text-emerald-900 dark:text-emerald-400">You are checked in for today!</p>
              <p className="text-xs text-emerald-700 dark:text-emerald-500">Method: {todayRecord.checkInMethod} • Time: {todayRecord.checkInTime?.toLocaleTimeString()}</p>
            </div>
          </div>
        ) : (
          <button 
            onClick={handleAppCheckIn}
            disabled={checkingIn}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-indigo-500/20 transition-all flex items-center gap-2"
          >
            {checkingIn ? (
              <>
                <MapPin className="h-5 w-5 animate-bounce" /> Verifying Location...
              </>
            ) : (
              <>
                <Fingerprint className="h-5 w-5" /> Tap to Check-in
              </>
            )}
          </button>
        )}
      </div>

      {/* History Table */}
      <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-zinc-800 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">My Attendance History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-800/50 border-b border-slate-200 dark:border-zinc-800">
                <th className="p-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Date</th>
                <th className="p-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                <th className="p-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Method</th>
                <th className="p-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Check In</th>
                <th className="p-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Check Out</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-zinc-800 dark:divide-zinc-800 dark:divide-zinc-800/50">
              {myRecords.map(record => (
                <tr key={record.id} className="hover:bg-slate-50 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:hover:bg-zinc-800/20 transition-colors">
                  <td className="p-4 text-sm font-medium text-slate-900 dark:text-white dark:text-slate-200">{record.date.toLocaleDateString()}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      record.status === 'PRESENT' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                      record.status === 'LATE' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                      'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2">
                    {record.checkInMethod === 'APP' && <Smartphone className="h-4 w-4" />}
                    {record.checkInMethod === 'BMD' && <Fingerprint className="h-4 w-4" />}
                    {record.checkInMethod === 'MANUAL' && <CalendarCheck className="h-4 w-4" />}
                    {record.checkInMethod}
                  </td>
                  <td className="p-4 text-sm text-slate-600 dark:text-slate-300">
                    {record.checkInTime ? (
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {record.checkInTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    ) : '-'}
                  </td>
                  <td className="p-4 text-sm text-slate-600 dark:text-slate-300">
                    {record.checkOutTime ? (
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {record.checkOutTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    ) : '-'}
                  </td>
                </tr>
              ))}
              {myRecords.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500 dark:text-slate-400 text-sm">
                    No attendance records found for this user.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
