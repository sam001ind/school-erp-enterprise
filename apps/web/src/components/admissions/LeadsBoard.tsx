"use client";

import React, { useState, useEffect } from "react";
import { getLeads, updateLeadStatus, createLead } from "@/app/actions/admissions";
import { Plus, GripVertical, Phone, Mail, GraduationCap } from "lucide-react";

type Lead = {
  id: string;
  studentName: string;
  parentName: string;
  email: string;
  phone: string;
  gradeApplied: string;
  status: string;
  source: string;
  createdAt: Date;
};

const STAGES = ["New", "Contacted", "Interview", "Waitlisted", "Admitted", "Rejected"];

export function LeadsBoard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    studentName: "",
    parentName: "",
    email: "",
    phone: "",
    gradeApplied: "",
    source: "Website",
    notes: ""
  });

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setLoading(true);
    const res = await getLeads();
    if (res.success && res.leads) {
      setLeads(res.leads);
    }
    setLoading(false);
  };

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData("leadId", id);
  };

  const handleDrop = async (e: React.DragEvent, targetStatus: string) => {
    const leadId = e.dataTransfer.getData("leadId");
    if (!leadId) return;

    // Optimistically update
    setLeads(prev => prev.map(lead => lead.id === leadId ? { ...lead, status: targetStatus } : lead));

    const res = await updateLeadStatus(leadId, targetStatus);
    if (!res.success) {
      // Revert if failed
      fetchLeads();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await createLead(formData);
    if (res.success) {
      setIsFormOpen(false);
      setFormData({
        studentName: "",
        parentName: "",
        email: "",
        phone: "",
        gradeApplied: "",
        source: "Website",
        notes: ""
      });
      fetchLeads();
    } else {
      alert("Failed to create lead");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Admissions Pipeline</h2>
          <p className="text-slate-500 dark:text-slate-400">Track and manage prospective student enquiries.</p>
        </div>
        <button 
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-medium shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" /> New Enquiry
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-500">Loading leads...</div>
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar items-start min-h-[600px]">
          {STAGES.map(stage => {
            const stageLeads = leads.filter(l => l.status === stage);
            
            return (
              <div 
                key={stage}
                className="w-80 min-w-[320px] bg-slate-50 dark:bg-zinc-900/50 rounded-2xl p-4 border border-slate-200 dark:border-zinc-800"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, stage)}
              >
                <div className="flex justify-between items-center mb-4 px-2">
                  <h3 className="font-bold text-slate-700 dark:text-slate-300">{stage}</h3>
                  <span className="bg-white dark:bg-zinc-800 text-slate-500 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm border border-slate-200 dark:border-zinc-700">
                    {stageLeads.length}
                  </span>
                </div>

                <div className="space-y-3 min-h-[150px]">
                  {stageLeads.map(lead => (
                    <div 
                      key={lead.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, lead.id)}
                      className="bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing group"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-slate-900 dark:text-white line-clamp-1">{lead.studentName}</h4>
                        <GripVertical className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      
                      <div className="space-y-2 mb-3">
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                          <GraduationCap className="w-3.5 h-3.5" /> Grade: {lead.gradeApplied}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                          <Phone className="w-3.5 h-3.5" /> {lead.phone}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                          <Mail className="w-3.5 h-3.5" /> {lead.email}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-zinc-700/50 mt-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 dark:bg-zinc-700/50 px-2 py-1 rounded-md">
                          {lead.source}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                  
                  {stageLeads.length === 0 && (
                    <div className="h-24 border-2 border-dashed border-slate-200 dark:border-zinc-800 rounded-xl flex items-center justify-center text-sm text-slate-400">
                      Drop leads here
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* New Lead Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Create New Enquiry</h2>
              <button onClick={() => setIsFormOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-slate-300">Student Name</label>
                  <input required type="text" value={formData.studentName} onChange={e => setFormData({...formData, studentName: e.target.value})} className="w-full rounded-xl border px-4 py-2 dark:bg-zinc-950 dark:border-zinc-800" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-slate-300">Parent Name</label>
                  <input required type="text" value={formData.parentName} onChange={e => setFormData({...formData, parentName: e.target.value})} className="w-full rounded-xl border px-4 py-2 dark:bg-zinc-950 dark:border-zinc-800" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-slate-300">Email Address</label>
                  <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full rounded-xl border px-4 py-2 dark:bg-zinc-950 dark:border-zinc-800" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-slate-300">Phone Number</label>
                  <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full rounded-xl border px-4 py-2 dark:bg-zinc-950 dark:border-zinc-800" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-slate-300">Grade Applied For</label>
                  <input required type="text" value={formData.gradeApplied} onChange={e => setFormData({...formData, gradeApplied: e.target.value})} placeholder="e.g. Grade 5" className="w-full rounded-xl border px-4 py-2 dark:bg-zinc-950 dark:border-zinc-800" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-slate-300">Source</label>
                  <select value={formData.source} onChange={e => setFormData({...formData, source: e.target.value})} className="w-full rounded-xl border px-4 py-2 dark:bg-zinc-950 dark:border-zinc-800">
                    <option>Website</option>
                    <option>Facebook Ads</option>
                    <option>Walk-in</option>
                    <option>Referral</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1 dark:text-slate-300">Additional Notes</label>
                  <textarea value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} rows={3} className="w-full rounded-xl border px-4 py-2 dark:bg-zinc-950 dark:border-zinc-800"></textarea>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t dark:border-zinc-800">
                <button type="button" onClick={() => setIsFormOpen(false)} className="px-6 py-2 border rounded-xl font-medium dark:border-zinc-700">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700">Save Lead</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
