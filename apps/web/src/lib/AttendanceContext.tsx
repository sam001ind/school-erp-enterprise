"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type AttendanceStatus = "PRESENT" | "ABSENT" | "LATE" | "HALF_DAY";
export type CheckInMethod = "APP" | "MANUAL" | "BMD";

export type AttendanceRecord = {
  id: string;
  userId: string;
  userName: string;
  role: "STUDENT" | "EMPLOYEE";
  date: Date;
  status: AttendanceStatus;
  checkInMethod: CheckInMethod;
  checkInTime?: Date;
  checkOutTime?: Date;
  remarks?: string;
};

interface AttendanceContextType {
  records: AttendanceRecord[];
  addRecord: (record: Omit<AttendanceRecord, "id">) => void;
  checkout: (id: string, time: Date) => void;
  getRecordsByDate: (date: Date) => AttendanceRecord[];
  getMyRecords: (userId: string) => AttendanceRecord[];
}

const AttendanceContext = createContext<AttendanceContextType | undefined>(undefined);

// Some mock data to make the UI look good immediately
const mockRecords: AttendanceRecord[] = [
  {
    id: "1",
    userId: "emp_1",
    userName: "Alice Smith (Teacher)",
    role: "EMPLOYEE",
    date: new Date(),
    status: "PRESENT",
    checkInMethod: "BMD",
    checkInTime: new Date(new Date().setHours(8, 15, 0, 0)),
  },
  {
    id: "2",
    userId: "stu_1",
    userName: "John Doe (10-A)",
    role: "STUDENT",
    date: new Date(),
    status: "PRESENT",
    checkInMethod: "APP",
    checkInTime: new Date(new Date().setHours(8, 45, 0, 0)),
  },
  {
    id: "3",
    userId: "emp_2",
    userName: "Bob Admin",
    role: "EMPLOYEE",
    date: new Date(),
    status: "LATE",
    checkInMethod: "MANUAL",
    checkInTime: new Date(new Date().setHours(9, 30, 0, 0)),
  },
];

export function AttendanceProvider({ children }: { children: ReactNode }) {
  const [records, setRecords] = useState<AttendanceRecord[]>(mockRecords);

  const addRecord = (record: Omit<AttendanceRecord, "id">) => {
    const newRecord = { ...record, id: Math.random().toString(36).substr(2, 9) };
    setRecords((prev) => [newRecord, ...prev]);
  };

  const checkout = (id: string, time: Date) => {
    setRecords((prev) =>
      prev.map((r) => (r.id === id ? { ...r, checkOutTime: time } : r))
    );
  };

  const getRecordsByDate = (date: Date) => {
    return records.filter(
      (r) => r.date.toDateString() === date.toDateString()
    );
  };

  const getMyRecords = (userId: string) => {
    return records.filter((r) => r.userId === userId);
  };

  return (
    <AttendanceContext.Provider
      value={{
        records,
        addRecord,
        checkout,
        getRecordsByDate,
        getMyRecords,
      }}
    >
      {children}
    </AttendanceContext.Provider>
  );
}

export function useAttendance() {
  const context = useContext(AttendanceContext);
  if (context === undefined) {
    throw new Error("useAttendance must be used within an AttendanceProvider");
  }
  return context;
}
