"use client";
import React, { useEffect, useState } from "react";
import { getEmployees } from "../../../actions/hrms";
import { Users, Mail, Phone, Building2, Briefcase } from "lucide-react";

export default function EmployeeDirectory() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const res = await getEmployees();
      if (res.success) {
        setEmployees(res.employees || []);
      }
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <div className="p-8 text-center text-slate-500">Loading Directory...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Employee Directory</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-colors">
          + Add Employee
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map(emp => (
          <div key={emp.id} className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group relative flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-slate-100 dark:bg-zinc-800 rounded-full mb-4 flex items-center justify-center text-2xl font-bold text-slate-600 dark:text-slate-300">
              {emp.user?.name?.[0] || "?"}
            </div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">{emp.user?.name || "Unknown"}</h3>
            <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-4">{emp.designation}</p>

            <div className="w-full space-y-2 mt-auto">
              <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                <Building2 className="w-4 h-4 mr-2" />
                {emp.department}
              </div>
              <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                <Mail className="w-4 h-4 mr-2" />
                <span className="truncate">{emp.user?.email}</span>
              </div>
              <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                <Briefcase className="w-4 h-4 mr-2" />
                EMP-{emp.employeeId}
              </div>
            </div>

            <div className="absolute top-4 right-4">
              <span className={`px-2 py-1 rounded-full text-xs font-bold ${emp.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'}`}>
                {emp.status}
              </span>
            </div>
          </div>
        ))}

        {employees.length === 0 && (
          <div className="col-span-3 p-12 text-center border-2 border-dashed border-slate-200 dark:border-zinc-800 rounded-2xl text-slate-500">
            No employees found in the directory.
          </div>
        )}
      </div>
    </div>
  );
}
