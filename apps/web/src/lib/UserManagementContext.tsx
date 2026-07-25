"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { moduleMenus } from "./navigation";

export type Session = {
  id: string;
  device: string;
  ip: string;
  location: string;
  lastActive: Date;
  isCurrent: boolean;
};

export type Role = {
  id: string;
  name: string;
  description: string;
  allowedMenus: string[];
  requireMfa: boolean;
  ipWhitelisted: boolean;
  granularPermissions: Record<string, string[]>; // e.g., "/academic/timetable": ["read", "write"]
};

export type User = {
  id: string;
  name: string;
  email: string;
  roleId: string;
  status: "Active" | "Inactive" | "Pending";
  lastLogin?: Date;
  mfaEnabled: boolean;
  lastIp: string;
  activeSessions: Session[];
};

export type AuditLog = {
  id: string;
  userId: string;
  action: string;
  resource: string;
  ip: string;
  timestamp: Date;
  status: "Success" | "Failed";
};

interface UserManagementContextType {
  roles: Role[];
  users: User[];
  auditLogs: AuditLog[];
  addRole: (role: Omit<Role, "id">) => void;
  updateRole: (id: string, role: Partial<Role>) => void;
  deleteRole: (id: string) => void;
  cloneRole: (id: string) => void;
  addUser: (user: Omit<User, "id">) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  deleteUser: (id: string) => void;
  revokeSession: (userId: string, sessionId: string) => void;
  logAction: (userId: string, action: string, resource: string, status: "Success" | "Failed") => void;
}

const UserManagementContext = createContext<UserManagementContextType | undefined>(undefined);

// Initial Mock Data
const initialRoles: Role[] = [
  {
    id: "role_admin",
    name: "Super Administrator",
    description: "Has access to all modules and configurations.",
    allowedMenus: Object.entries(moduleMenus).flatMap(([modulePath, menus]) => menus.map(m => `${modulePath}/${m.id}`)),
    requireMfa: true,
    ipWhitelisted: false,
    granularPermissions: {}
  },
  {
    id: "role_academic_head",
    name: "Academic Head",
    description: "Manages all academic operations, curriculum, and faculty.",
    allowedMenus: moduleMenus["/academic"].map(m => `/academic/${m.id}`),
    requireMfa: false,
    ipWhitelisted: false,
    granularPermissions: {}
  },
  {
    id: "role_student",
    name: "Student",
    description: "Basic student access to attendance, exams, and hostel.",
    allowedMenus: [
      "/attendance/my", "/examinations/upcoming", "/examinations/results", "/hostel/my-room", "/fees/dues"
    ],
    requireMfa: false,
    ipWhitelisted: false,
    granularPermissions: {}
  }
];

const mockSessions = [
  { id: "sess_1", device: "MacBook Pro - Chrome", ip: "192.168.1.45", location: "New York, USA", lastActive: new Date(), isCurrent: true },
  { id: "sess_2", device: "iPhone 14 - Safari", ip: "172.20.10.2", location: "New York, USA", lastActive: new Date(Date.now() - 3600000), isCurrent: false }
];

const initialUsers: User[] = [
  { id: "usr_1", name: "Alice Admin", email: "alice@enterprise.edu", roleId: "role_admin", status: "Active", lastLogin: new Date(), mfaEnabled: true, lastIp: "192.168.1.45", activeSessions: mockSessions },
  { id: "usr_2", name: "Prof. Michael Chang", email: "michael.c@enterprise.edu", roleId: "role_academic_head", status: "Active", lastLogin: new Date(Date.now() - 86400000), mfaEnabled: false, lastIp: "10.0.0.12", activeSessions: [mockSessions[0]] },
  { id: "usr_3", name: "John Doe", email: "john.d@student.enterprise.edu", roleId: "role_student", status: "Active", mfaEnabled: false, lastIp: "192.168.0.101", activeSessions: [] },
];

const initialAuditLogs: AuditLog[] = [
  { id: "log_1", userId: "usr_1", action: "Logged In", resource: "System", ip: "192.168.1.45", timestamp: new Date(Date.now() - 3600000), status: "Success" },
  { id: "log_2", userId: "usr_2", action: "Updated Grades", resource: "Academic Module", ip: "10.0.0.12", timestamp: new Date(Date.now() - 7200000), status: "Success" },
  { id: "log_3", userId: "unknown", action: "Failed Login", resource: "System", ip: "145.22.19.8", timestamp: new Date(Date.now() - 86400000), status: "Failed" },
];

export function UserManagementProvider({ children }: { children: ReactNode }) {
  const [roles, setRoles] = useState<Role[]>(initialRoles);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(initialAuditLogs);

  const addRole = (role: Omit<Role, "id">) => setRoles([...roles, { ...role, id: Math.random().toString(36).substr(2, 9) }]);
  const updateRole = (id: string, role: Partial<Role>) => setRoles(roles.map(r => r.id === id ? { ...r, ...role } : r));
  const deleteRole = (id: string) => setRoles(roles.filter(r => r.id !== id));
  
  const cloneRole = (id: string) => {
    const roleToClone = roles.find(r => r.id === id);
    if (roleToClone) {
      addRole({ ...roleToClone, name: `${roleToClone.name} (Copy)` });
    }
  };

  const addUser = (user: Omit<User, "id">) => setUsers([...users, { ...user, id: Math.random().toString(36).substr(2, 9) }]);
  const updateUser = (id: string, user: Partial<User>) => setUsers(users.map(u => u.id === id ? { ...u, ...user } : u));
  const deleteUser = (id: string) => setUsers(users.filter(u => u.id !== id));

  const revokeSession = (userId: string, sessionId: string) => {
    setUsers(users.map(u => {
      if (u.id === userId) {
        return { ...u, activeSessions: u.activeSessions.filter(s => s.id !== sessionId) };
      }
      return u;
    }));
  };

  const logAction = (userId: string, action: string, resource: string, status: "Success" | "Failed") => {
    const newLog: AuditLog = {
      id: Math.random().toString(36).substr(2, 9),
      userId, action, resource, status,
      ip: "192.168.1.45",
      timestamp: new Date()
    };
    setAuditLogs([newLog, ...auditLogs]);
  };

  return (
    <UserManagementContext.Provider value={{ roles, users, auditLogs, addRole, updateRole, deleteRole, cloneRole, addUser, updateUser, deleteUser, revokeSession, logAction }}>
      {children}
    </UserManagementContext.Provider>
  );
}

export function useUserManagement() {
  const context = useContext(UserManagementContext);
  if (context === undefined) throw new Error("useUserManagement must be used within UserManagementProvider");
  return context;
}
