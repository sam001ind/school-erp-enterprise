"use client";

import React, { useState } from "react";
import { useUserManagement, Role } from "@/lib/UserManagementContext";
import { moduleMenus } from "@/lib/navigation";
import { Shield, Plus, ChevronDown, ChevronRight, CheckSquare, Square, Trash2, Edit2, ShieldAlert, Copy, CheckCircle2, ShieldCheck, Lock } from "lucide-react";

export default function RoleManagementView() {
  const { roles, addRole, deleteRole, updateRole, cloneRole } = useUserManagement();
  const [activeRoleId, setActiveRoleId] = useState<string>(roles[0]?.id || "");
  const [expandedModules, setExpandedModules] = useState<string[]>(Object.keys(moduleMenus));

  const activeRole = roles.find(r => r.id === activeRoleId);

  const toggleModuleExpand = (modulePath: string) => {
    setExpandedModules(prev => prev.includes(modulePath) ? prev.filter(p => p !== modulePath) : [...prev, modulePath]);
  };

  const toggleMenuAccess = (menuPath: string) => {
    if (!activeRole) return;
    const current = activeRole.allowedMenus;
    const isAllowed = current.includes(menuPath);
    
    let newAllowed;
    if (isAllowed) {
      newAllowed = current.filter(p => p !== menuPath);
    } else {
      newAllowed = [...current, menuPath];
    }
    
    updateRole(activeRole.id, { allowedMenus: newAllowed });
  };

  const toggleModuleAccess = (modulePath: string, allMenuPaths: string[]) => {
    if (!activeRole) return;
    const current = activeRole.allowedMenus;
    // Check if all are already allowed
    const allAllowed = allMenuPaths.every(p => current.includes(p));
    
    let newAllowed = [...current];
    if (allAllowed) {
      // Remove all
      newAllowed = newAllowed.filter(p => !allMenuPaths.includes(p));
    } else {
      // Add missing
      allMenuPaths.forEach(p => {
        if (!newAllowed.includes(p)) newAllowed.push(p);
      });
    }
    updateRole(activeRole.id, { allowedMenus: newAllowed });
  };

  const handleCreateRole = () => {
    addRole({
      name: "New Custom Role",
      description: "Define custom permissions for this role.",
      allowedMenus: [],
      requireMfa: false,
      ipWhitelisted: false,
      granularPermissions: {}
    });
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 pb-12 items-start">
      
      {/* Sidebar: Role List */}
      <div className="w-full md:w-80 bg-white dark:bg-zinc-900/50 backdrop-blur-md border border-slate-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-sm shrink-0">
        <div className="p-6 border-b border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-800/30 flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Shield className="h-5 w-5 text-indigo-500" /> Roles
          </h2>
          <button onClick={handleCreateRole} className="p-1.5 bg-white dark:bg-zinc-900/50 backdrop-blur-md text-indigo-600 dark:text-indigo-400 rounded-lg shadow-sm border border-slate-200 dark:border-zinc-800 dark:border-zinc-700 hover:bg-slate-50 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 transition-colors">
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-zinc-800 dark:divide-zinc-800 dark:divide-zinc-800 max-h-[600px] overflow-y-auto">
          {roles.map(role => (
            <button 
              key={role.id}
              onClick={() => setActiveRoleId(role.id)}
              className={`w-full text-left p-5 transition-colors ${activeRoleId === role.id ? 'bg-indigo-50/50 dark:bg-indigo-900/10' : 'hover:bg-slate-50 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:hover:bg-zinc-800/50'}`}
            >
              <div className="flex justify-between items-start mb-1">
                <h3 className={`font-bold ${activeRoleId === role.id ? 'text-indigo-700 dark:text-indigo-400' : 'text-slate-900 dark:text-white'}`}>
                  {role.name}
                </h3>
                {role.name === "Super Admin" && <ShieldAlert className="h-4 w-4 text-rose-500" />}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{role.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content: Tree Matrix */}
      <div className="flex-1 w-full bg-white dark:bg-zinc-900/50 backdrop-blur-md border border-slate-200 dark:border-zinc-800 rounded-3xl shadow-sm overflow-hidden">
        {activeRole ? (
          <>
            <div className="p-8 border-b border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-800/30">
               <div className="flex justify-between items-start">
                 <div>
                   <input 
                     value={activeRole.name} 
                     onChange={(e) => updateRole(activeRole.id, { name: e.target.value })}
                     className="text-2xl font-bold text-slate-900 dark:text-white bg-transparent border-b-2 border-transparent hover:border-slate-300 focus:border-indigo-500 outline-none transition-colors mb-2 w-full max-w-sm px-1 py-0.5 -ml-1 rounded" 
                   />
                   <input 
                     value={activeRole.description} 
                     onChange={(e) => updateRole(activeRole.id, { description: e.target.value })}
                     className="text-sm text-slate-500 dark:text-slate-400 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-indigo-500 outline-none transition-colors w-full max-w-lg px-1 py-0.5 -ml-1 rounded" 
                   />
                 </div>
                 <div className="flex gap-2">
                   {activeRole.id !== 'role_admin' && (
                     <>
                       <button onClick={() => cloneRole(activeRole.id)} className="p-2 text-slate-500 dark:text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl transition-colors" title="Clone Role">
                         <Copy className="h-5 w-5" />
                       </button>
                       <button onClick={() => deleteRole(activeRole.id)} className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl transition-colors" title="Delete Role">
                         <Trash2 className="h-5 w-5" />
                       </button>
                     </>
                   )}
                 </div>
               </div>
            </div>

            <div className="p-8">
              <div className="flex flex-col md:flex-row gap-8 mb-8 pb-8 border-b border-slate-200 dark:border-zinc-800">
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
                    <ShieldCheck className="h-4 w-4 text-emerald-500" /> Advanced Security
                  </h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <div className={`w-10 h-5 rounded-full p-1 transition-colors ${activeRole.requireMfa ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-zinc-700'}`}>
                        <div className={`w-3 h-3 rounded-full bg-white dark:bg-zinc-900/50 backdrop-blur-md transition-transform ${activeRole.requireMfa ? 'translate-x-5' : 'translate-x-0'}`}></div>
                      </div>
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Enforce MFA (Two-Factor Auth)</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <div className={`w-10 h-5 rounded-full p-1 transition-colors ${activeRole.ipWhitelisted ? 'bg-blue-500' : 'bg-slate-300 dark:bg-zinc-700'}`}>
                        <div className={`w-3 h-3 rounded-full bg-white dark:bg-zinc-900/50 backdrop-blur-md transition-transform ${activeRole.ipWhitelisted ? 'translate-x-5' : 'translate-x-0'}`}></div>
                      </div>
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Enable IP Whitelisting</span>
                    </label>
                  </div>
                </div>
              </div>

              <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-6 flex justify-between items-center">
                <span>Access Control Matrix</span>
                <span className="text-xs font-semibold bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400 px-3 py-1 rounded-full">
                  {activeRole.allowedMenus.length} Menus Permitted
                </span>
              </h3>

              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {Object.entries(moduleMenus).map(([modulePath, menus]) => {
                  const isExpanded = expandedModules.includes(modulePath);
                  const moduleMenuPaths = menus.map(m => `${modulePath}/${m.id}`);
                  const isAllAllowed = moduleMenuPaths.every(p => activeRole.allowedMenus.includes(p));
                  const isSomeAllowed = !isAllAllowed && moduleMenuPaths.some(p => activeRole.allowedMenus.includes(p));

                  return (
                    <div key={modulePath} className="border border-slate-200 dark:border-zinc-800 rounded-2xl overflow-hidden bg-white dark:bg-zinc-900/50 backdrop-blur-md/50">
                      
                      {/* Module Header Row */}
                      <div className="flex items-center p-4 bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-800/50 hover:bg-slate-100 dark:bg-zinc-800 dark:hover:bg-zinc-800 transition-colors">
                        <button onClick={() => toggleModuleExpand(modulePath)} className="p-1 mr-2 text-slate-400 dark:text-slate-500 dark:text-slate-500 hover:text-slate-600 dark:text-slate-300 dark:hover:text-slate-200">
                          {isExpanded ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                        </button>
                        
                        <button 
                          onClick={() => toggleModuleAccess(modulePath, moduleMenuPaths)}
                          className="mr-3 text-indigo-600 dark:text-indigo-400"
                        >
                          {isAllAllowed ? <CheckSquare className="h-5 w-5" /> : isSomeAllowed ? <div className="h-5 w-5 border-2 border-indigo-500 rounded bg-indigo-500 flex items-center justify-center"><div className="w-2.5 h-0.5 bg-white dark:bg-zinc-900/50 backdrop-blur-md rounded-full"></div></div> : <Square className="h-5 w-5 text-slate-300 dark:text-zinc-600" />}
                        </button>
                        
                        <div className="flex-1 font-bold text-slate-900 dark:text-white capitalize cursor-pointer select-none" onClick={() => toggleModuleExpand(modulePath)}>
                          {modulePath.replace("/", "")} Module
                        </div>
                      </div>

                      {/* Children Menu Rows */}
                      {isExpanded && (
                        <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md border-t border-slate-100 dark:border-zinc-800/50">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-1 p-4 pl-14">
                            {menus.map(menu => {
                              const menuPath = `${modulePath}/${menu.id}`;
                              const isAllowed = activeRole.allowedMenus.includes(menuPath);
                              
                              return (
                                <div key={menu.id} className="flex flex-col p-2 text-left hover:bg-slate-50 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:hover:bg-zinc-800/50 rounded-lg transition-colors group">
                                  <button onClick={() => toggleMenuAccess(menuPath)} className="flex items-center gap-3 w-full">
                                    {isAllowed ? (
                                      <CheckSquare className="h-4 w-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                                    ) : (
                                      <Square className="h-4 w-4 text-slate-300 dark:text-zinc-600 shrink-0 group-hover:text-slate-400 dark:text-slate-500 dark:text-slate-500" />
                                    )}
                                    <span className={`text-sm ${isAllowed ? 'text-slate-900 dark:text-white font-medium' : 'text-slate-500 dark:text-slate-400'}`}>
                                      {menu.title}
                                    </span>
                                  </button>
                                  
                                  {isAllowed && (
                                    <div className="mt-2 ml-7 flex flex-wrap gap-2">
                                      {['Read', 'Write', 'Delete', 'Approve'].map(perm => (
                                        <label key={perm} className="flex items-center gap-1.5 cursor-pointer group/perm">
                                          <div className={`w-3 h-3 rounded ${perm === 'Read' ? 'bg-indigo-500' : 'border border-slate-300 dark:border-zinc-600'}`}></div>
                                          <span className="text-xs text-slate-500 dark:text-slate-400 group-hover/perm:text-slate-700 dark:text-slate-300">{perm}</span>
                                        </label>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          <div className="p-12 text-center text-slate-500 dark:text-slate-400 flex flex-col items-center justify-center min-h-[400px]">
             <Shield className="h-16 w-16 mb-4 text-slate-200 dark:text-zinc-700" />
             <p className="text-xl font-bold text-slate-900 dark:text-white mb-2">Select a Role</p>
             <p>Choose a role from the sidebar to configure its permissions.</p>
          </div>
        )}
      </div>
    </div>
  );
}
