"use client";

import React, { useState } from "react";
import { useUserManagement, User } from "@/lib/UserManagementContext";
import { Search, Plus, User as UserIcon, Shield, MoreVertical, Edit2, Trash2, Eye, Download, Users, Lock, Smartphone } from "lucide-react";

export default function UserDirectoryView() {
  const { users, roles, addUser, deleteUser, revokeSession } = useUserManagement();
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState<Partial<User>>({ status: "Active", roleId: roles[0]?.id });
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [viewingSessionsFor, setViewingSessionsFor] = useState<string | null>(null);

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleName = (roleId: string) => roles.find(r => r.id === roleId)?.name || "Unknown Role";

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newUser.name && newUser.email && newUser.roleId) {
      addUser({
        name: newUser.name,
        email: newUser.email,
        roleId: newUser.roleId,
        status: newUser.status as "Active" | "Inactive" | "Pending",
        mfaEnabled: false,
        lastIp: "127.0.0.1",
        activeSessions: [],
      });
      setShowAddModal(false);
      setNewUser({ status: "Active", roleId: roles[0]?.id });
    }
  };

  const toggleSelectUser = (id: string) => {
    setSelectedUsers(prev => prev.includes(id) ? prev.filter(u => u !== id) : [...prev, id]);
  };

  const toggleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(u => u.id));
    }
  };

  const handleBulkDelete = () => {
    if (confirm(`Are you sure you want to delete ${selectedUsers.length} users?`)) {
      selectedUsers.forEach(id => deleteUser(id));
      setSelectedUsers([]);
    }
  };

  const handleImpersonate = (userName: string) => {
    alert(`Impersonating ${userName}. This will reload the app context as this user (Mocked).`);
  };

  const activeUserForSessions = users.find(u => u.id === viewingSessionsFor);

  return (
    <div className="space-y-6 pb-12 relative">
      {/* Header */}
      <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-slate-500 dark:text-slate-500" />
          <input 
            type="text" 
            placeholder="Search users by name or email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-800 dark:border-zinc-700 text-slate-900 dark:text-white rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          {selectedUsers.length > 0 && (
            <button 
              onClick={handleBulkDelete}
              className="bg-rose-100 hover:bg-rose-200 text-rose-700 dark:bg-rose-900/30 dark:hover:bg-rose-900/50 dark:text-rose-400 px-5 py-2.5 rounded-xl font-semibold shadow-sm transition-colors flex items-center justify-center gap-2"
            >
              <Trash2 className="h-4 w-4" /> Delete ({selectedUsers.length})
            </button>
          )}
          <button 
            className="bg-white dark:bg-zinc-900/50 backdrop-blur-md dark:bg-zinc-800 border border-slate-200 dark:border-zinc-800 dark:border-zinc-700 hover:bg-slate-50 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:hover:bg-zinc-700 text-slate-700 dark:text-slate-300 px-5 py-2.5 rounded-xl font-semibold shadow-sm transition-colors flex items-center justify-center gap-2"
          >
            <Download className="h-4 w-4" /> Export
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-md transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="h-4 w-4" /> Add User
          </button>
        </div>
      </div>

      {/* Directory Table */}
      <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-800/50 border-b border-slate-200 dark:border-zinc-800 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-bold w-12">
                  <input 
                    type="checkbox" 
                    checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0} 
                    onChange={toggleSelectAll}
                    className="rounded border-slate-300 dark:border-zinc-600 text-indigo-600 focus:ring-indigo-500"
                  />
                </th>
                <th className="px-6 py-4 font-bold">User Details</th>
                <th className="px-6 py-4 font-bold">Role</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold">Security</th>
                <th className="px-6 py-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-zinc-800 dark:divide-zinc-800 dark:divide-zinc-800">
              {filteredUsers.map(user => (
                <tr key={user.id} className={`transition-colors ${selectedUsers.includes(user.id) ? 'bg-indigo-50/50 dark:bg-indigo-900/20' : 'hover:bg-slate-50 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40/50 dark:hover:bg-zinc-800/30'}`}>
                  <td className="px-6 py-4">
                    <input 
                      type="checkbox" 
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => toggleSelectUser(user.id)}
                      className="rounded border-slate-300 dark:border-zinc-600 text-indigo-600 focus:ring-indigo-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">{user.name}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-slate-300 dark:bg-zinc-800 dark:text-slate-300">
                      <Shield className="h-3 w-3" /> {getRoleName(user.roleId)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 rounded-md text-xs font-bold ${
                      user.status === 'Active' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                      user.status === 'Pending' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                      'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-slate-300 dark:bg-zinc-800 dark:text-slate-400'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                    <div className="flex flex-col gap-1">
                      <span className="flex items-center gap-1.5 text-xs">
                        <Lock className={`h-3 w-3 ${user.mfaEnabled ? 'text-emerald-500' : 'text-slate-400 dark:text-slate-500 dark:text-slate-500'}`} />
                        {user.mfaEnabled ? 'MFA Enabled' : 'MFA Disabled'}
                      </span>
                      <button onClick={() => setViewingSessionsFor(user.id)} className="flex items-center gap-1.5 text-xs text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 cursor-pointer">
                        <Smartphone className="h-3 w-3" />
                        {user.activeSessions?.length || 0} Active Session(s)
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1">
                       <button onClick={() => handleImpersonate(user.name)} title="Login As User" className="p-2 text-slate-400 dark:text-slate-500 dark:text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-colors"><Eye className="h-4 w-4" /></button>
                       <button className="p-2 text-slate-400 dark:text-slate-500 dark:text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-colors"><Edit2 className="h-4 w-4" /></button>
                       <button onClick={() => deleteUser(user.id)} className="p-2 text-slate-400 dark:text-slate-500 dark:text-slate-500 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-lg transition-colors"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                    <Users className="h-10 w-10 mx-auto mb-3 text-slate-300 dark:text-zinc-600" />
                    No users found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md border border-slate-200 dark:border-zinc-800 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="p-6 border-b border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-800/50">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Create New User</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Assign roles to restrict module access.</p>
            </div>
            <form onSubmit={handleAddSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Full Name</label>
                <input required type="text" value={newUser.name || ""} onChange={e => setNewUser({...newUser, name: e.target.value})} className="w-full bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-800 dark:border-zinc-700 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Email Address</label>
                <input required type="email" value={newUser.email || ""} onChange={e => setNewUser({...newUser, email: e.target.value})} className="w-full bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-800 dark:border-zinc-700 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500" placeholder="john@enterprise.edu" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Assign Role</label>
                <select required value={newUser.roleId || ""} onChange={e => setNewUser({...newUser, roleId: e.target.value})} className="w-full bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-800 dark:border-zinc-700 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500">
                  {roles.map(r => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Account Status</label>
                <select required value={newUser.status || "Active"} onChange={e => setNewUser({...newUser, status: e.target.value as any})} className="w-full bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-800 dark:border-zinc-700 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500">
                  <option value="Active">Active</option>
                  <option value="Pending">Pending Validation</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 px-4 py-2.5 rounded-xl font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:bg-zinc-800 dark:text-slate-300 dark:hover:bg-zinc-700 transition-colors">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-2.5 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md transition-colors">Save User</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Active Sessions Modal */}
      {viewingSessionsFor && activeUserForSessions && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md border border-slate-200 dark:border-zinc-800 rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[80vh]">
            <div className="p-6 border-b border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-800/50 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-indigo-500" /> Active Sessions
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Manage active logins for {activeUserForSessions.name}
                </p>
              </div>
              <button onClick={() => setViewingSessionsFor(null)} className="p-2 text-slate-400 dark:text-slate-500 dark:text-slate-500 hover:bg-slate-200 dark:hover:bg-zinc-700 rounded-full transition-colors">
                <Trash2 className="h-5 w-5 opacity-0 pointer-events-none" /> {/* Just for spacing balance, using actual close button below */}
                <span className="sr-only">Close</span>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
              {activeUserForSessions.activeSessions?.length > 0 ? (
                <div className="space-y-4">
                  {activeUserForSessions.activeSessions.map((session) => (
                    <div key={session.id} className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-800/30 gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-slate-900 dark:text-white">{session.device}</h4>
                          {session.isCurrent && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                              CURRENT
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 flex flex-wrap gap-x-4 gap-y-1">
                          <span>IP: {session.ip}</span>
                          <span>Location: {session.location}</span>
                          <span>Last Active: {session.lastActive.toLocaleString()}</span>
                        </p>
                      </div>
                      {!session.isCurrent && (
                        <button 
                          onClick={() => revokeSession(activeUserForSessions.id, session.id)}
                          className="shrink-0 px-3 py-1.5 text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 dark:bg-rose-900/20 dark:hover:bg-rose-900/40 dark:text-rose-400 rounded-lg transition-colors border border-rose-100 dark:border-rose-900"
                        >
                          Revoke
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                  <Smartphone className="h-12 w-12 mx-auto mb-4 text-slate-300 dark:text-zinc-600 opacity-50" />
                  <p>No active sessions found for this user.</p>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-800/50 flex justify-end">
              <button 
                onClick={() => setViewingSessionsFor(null)} 
                className="px-6 py-2 rounded-xl font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-zinc-900/50 backdrop-blur-md border border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:bg-zinc-800 dark:text-slate-300 dark:border-zinc-700 dark:hover:bg-zinc-700 transition-colors shadow-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
