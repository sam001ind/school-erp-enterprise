"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { moduleMenus } from "./navigation";

export type Role = {
  id: string;
  name: string;
  description: string;
  allowedMenus: string[]; // Stores paths like "/academic/timetable"
};

export type User = {
  id: string;
  name: string;
  email: string;
  roleId: string;
  status: "Active" | "Inactive" | "Pending";
  lastLogin?: Date;
};

interface UserManagementContextType {
  roles: Role[];
  users: User[];
  addRole: (role: Omit<Role, "id">) => void;
  updateRole: (id: string, role: Partial<Role>) => void;
  deleteRole: (id: string) => void;
  addUser: (user: Omit<User, "id">) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  deleteUser: (id: string) => void;
}

const UserManagementContext = createContext<UserManagementContextType | undefined>(undefined);

// Initial Mock Data
const initialRoles: Role[] = [
  {
    id: "role_admin",
    name: "Super Administrator",
    description: "Has access to all modules and configurations.",
    allowedMenus: Object.entries(moduleMenus).flatMap(([modulePath, menus]) => menus.map(m => `${modulePath}/${m.id}`))
  },
  {
    id: "role_academic_head",
    name: "Academic Head",
    description: "Manages all academic operations, curriculum, and faculty.",
    allowedMenus: moduleMenus["/academic"].map(m => `/academic/${m.id}`)
  },
  {
    id: "role_student",
    name: "Student",
    description: "Basic student access to attendance, exams, and hostel.",
    allowedMenus: [
      "/attendance/my", "/examinations/upcoming", "/examinations/results", "/hostel/my-room", "/fees/dues"
    ]
  }
];

const initialUsers: User[] = [
  { id: "usr_1", name: "Alice Admin", email: "alice@enterprise.edu", roleId: "role_admin", status: "Active", lastLogin: new Date() },
  { id: "usr_2", name: "Prof. Michael Chang", email: "michael.c@enterprise.edu", roleId: "role_academic_head", status: "Active", lastLogin: new Date(Date.now() - 86400000) },
  { id: "usr_3", name: "John Doe", email: "john.d@student.enterprise.edu", roleId: "role_student", status: "Active" },
];

export function UserManagementProvider({ children }: { children: ReactNode }) {
  const [roles, setRoles] = useState<Role[]>(initialRoles);
  const [users, setUsers] = useState<User[]>(initialUsers);

  const addRole = (role: Omit<Role, "id">) => setRoles([...roles, { ...role, id: Math.random().toString(36).substr(2, 9) }]);
  const updateRole = (id: string, role: Partial<Role>) => setRoles(roles.map(r => r.id === id ? { ...r, ...role } : r));
  const deleteRole = (id: string) => setRoles(roles.filter(r => r.id !== id));

  const addUser = (user: Omit<User, "id">) => setUsers([...users, { ...user, id: Math.random().toString(36).substr(2, 9) }]);
  const updateUser = (id: string, user: Partial<User>) => setUsers(users.map(u => u.id === id ? { ...u, ...user } : u));
  const deleteUser = (id: string) => setUsers(users.filter(u => u.id !== id));

  return (
    <UserManagementContext.Provider value={{ roles, users, addRole, updateRole, deleteRole, addUser, updateUser, deleteUser }}>
      {children}
    </UserManagementContext.Provider>
  );
}

export function useUserManagement() {
  const context = useContext(UserManagementContext);
  if (context === undefined) throw new Error("useUserManagement must be used within UserManagementProvider");
  return context;
}
