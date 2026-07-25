"use client";

import React, { useState, useEffect } from "react";
import { Users, Fingerprint, CalendarCheck, Search, Loader2 } from "lucide-react";
import { getStudentsByGrade, getAttendanceByDate, markAttendance } from "@/app/actions/attendance";

type StudentData = {
  id: string; // StudentProfile ID
  user: {
    name: string;
    email: string;
  };
  admissionNo: string;
};

type AttendanceRecord = {
  id: string;
  studentId: string;
  date: Date;
  status: string;
  checkInMethod: string;
};

export default function MarkAttendanceView() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [syncingBMD, setSyncingBMD] = useState(false);
  const [students, setStudents] = useState<StudentData[]>([]);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [date]);

  const fetchData = async () => {
    setLoading(true);
    const [studentsRes, attendanceRes] = await Promise.all([
      getStudentsByGrade(),
      getAttendanceByDate(date)
    ]);
    
    if (studentsRes.success && studentsRes.students) {
      setStudents(studentsRes.students as any);
    }
    
    if (attendanceRes.success && attendanceRes.records) {
      setAttendanceRecords(attendanceRes.records);
    }
    setLoading(false);
  };

  const handleMarkManual = async (studentId: string, status: string) => {
    // Optimistic UI update
    const tempRecord: AttendanceRecord = {
      id: "temp-" + Date.now(),
      studentId,
      date: new Date(date),
      status,
      checkInMethod: "MANUAL"
    };
    
    setAttendanceRecords(prev => {
      const filtered = prev.filter(r => r.studentId !== studentId);
      return [...filtered, tempRecord];
    });

    const res = await markAttendance(studentId, date, status);
    if (!res.success) {
      alert("Failed to mark attendance.");
      fetchData(); // Revert on failure
    }
  };

  const handleBMDSync = () => {
    setSyncingBMD(true);
    setTimeout(() => {
      // Simulate fetching from BMD hardware - we can just refetch
      fetchData();
      setSyncingBMD(false);
    }, 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Manual Roster Selection */}
        <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <CalendarCheck className="h-6 w-6 text-indigo-500" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Manual Roster</h2>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Select a date and class to manually mark attendance for students or staff who forgot their ID cards.</p>
          </div>
          
          <div className="flex gap-4">
            <input 
              type="date" 
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-slate-50 dark:bg-zinc-900/40 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white rounded-xl px-4 py-2 outline-none focus:border-indigo-500 flex-1"
            />
            <select className="bg-slate-50 dark:bg-zinc-900/40 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white rounded-xl px-4 py-2 outline-none focus:border-indigo-500 flex-1">
              <option>All Students</option>
            </select>
          </div>
        </div>

        {/* BMD Simulator */}
        <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Fingerprint className="h-6 w-6 text-emerald-500" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Biometric (BMD) Sync</h2>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Pull the latest fingerprint and RFID card scans directly from the hardware devices located at the main gates.</p>
          </div>
          
          <button 
            onClick={handleBMDSync}
            disabled={syncingBMD}
            className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 disabled:opacity-70 px-4 py-3 rounded-xl font-semibold shadow-sm transition-all flex items-center justify-center gap-2"
          >
            {syncingBMD ? (
              <><Loader2 className="h-5 w-5 animate-spin" /> Syncing with Devices...</>
            ) : (
              <><Fingerprint className="h-5 w-5" /> Sync Latest Biometrics</>
            )}
          </button>
        </div>

      </div>

      {/* Roster Marking Table */}
      <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-zinc-800 flex justify-between items-center bg-slate-50 dark:bg-zinc-900/40">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Users className="h-5 w-5 text-slate-400 dark:text-slate-500" /> Students Roster
          </h3>
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-2.5 text-slate-400" />
            <input type="text" placeholder="Search student..." className="pl-9 pr-4 py-2 bg-white dark:bg-zinc-900/50 backdrop-blur-md border border-slate-200 dark:border-zinc-800 rounded-lg text-sm outline-none focus:border-indigo-500 w-64" />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-zinc-900/40 border-b border-slate-200 dark:border-zinc-800">
                <th className="p-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Student Name</th>
                <th className="p-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Admission No</th>
                <th className="p-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Mark Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
              {loading ? (
                <tr>
                  <td colSpan={3} className="p-8 text-center text-slate-500">Loading roster...</td>
                </tr>
              ) : students.length === 0 ? (
                <tr>
                  <td colSpan={3} className="p-8 text-center text-slate-500">No students found.</td>
                </tr>
              ) : (
                students.map(student => {
                  const existingRecord = attendanceRecords.find(r => r.studentId === student.id);
                  
                  return (
                    <tr key={student.id} className="hover:bg-slate-50 dark:hover:bg-zinc-800/40 transition-colors">
                      <td className="p-4 text-sm font-bold text-slate-900 dark:text-white">{student.user.name}</td>
                      <td className="p-4 text-sm text-slate-500 dark:text-slate-400 font-mono">{student.admissionNo}</td>
                      <td className="p-4 text-right">
                        {existingRecord ? (
                          <div className="inline-flex items-center gap-2 bg-slate-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-zinc-800">
                             <span className={`h-2 w-2 rounded-full ${
                               existingRecord.status === 'PRESENT' ? 'bg-emerald-500' :
                               existingRecord.status === 'LATE' ? 'bg-amber-500' : 'bg-red-500'
                             }`}></span>
                             <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{existingRecord.status}</span>
                             <span className="text-[10px] text-slate-400 ml-2 border-l border-slate-300 dark:border-zinc-600 pl-2">via {existingRecord.checkInMethod}</span>
                             <button onClick={() => handleMarkManual(student.id, "ABSENT")} className="ml-2 text-[10px] text-blue-500 hover:underline">Change</button>
                          </div>
                        ) : (
                          <div className="inline-flex rounded-lg shadow-sm">
                            <button onClick={() => handleMarkManual(student.id, "PRESENT")} className="px-4 py-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 rounded-l-lg transition-colors">Present</button>
                            <button onClick={() => handleMarkManual(student.id, "LATE")} className="px-4 py-1.5 text-xs font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 dark:bg-amber-900/30 border-y border-amber-200 transition-colors">Late</button>
                            <button onClick={() => handleMarkManual(student.id, "ABSENT")} className="px-4 py-1.5 text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 dark:bg-red-900/30 border border-red-200 rounded-r-lg transition-colors">Absent</button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
