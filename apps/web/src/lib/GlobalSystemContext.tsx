"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type AcademicYear = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
};

interface GlobalSystemContextType {
  academicYears: AcademicYear[];
  activeYearId: string;
  setActiveYearId: (id: string) => void;
  getActiveYear: () => AcademicYear | undefined;
  addAcademicYear: (year: Omit<AcademicYear, "id" | "isCurrent">) => void;
  deleteAcademicYear: (id: string) => void;
  markYearAsCurrent: (id: string) => void;
}

const GlobalSystemContext = createContext<GlobalSystemContextType | undefined>(undefined);

const initialAcademicYears: AcademicYear[] = [
  { id: "ay_2023_2024", name: "AY 2023-2024", startDate: "2023-06-01", endDate: "2024-05-31", isCurrent: false },
  { id: "ay_2024_2025", name: "AY 2024-2025", startDate: "2024-06-01", endDate: "2025-05-31", isCurrent: false },
  { id: "ay_2025_2026", name: "AY 2025-2026", startDate: "2025-06-01", endDate: "2026-05-31", isCurrent: true },
  { id: "ay_2026_2027", name: "AY 2026-2027", startDate: "2026-06-01", endDate: "2027-05-31", isCurrent: false },
];

export function GlobalSystemProvider({ children }: { children: ReactNode }) {
  const [academicYears, setAcademicYears] = useState<AcademicYear[]>(initialAcademicYears);
  
  // Default to the year marked as 'isCurrent'
  const defaultYear = academicYears.find(y => y.isCurrent)?.id || academicYears[0].id;
  const [activeYearId, setActiveYearId] = useState<string>(defaultYear);

  const getActiveYear = () => academicYears.find(y => y.id === activeYearId);

  const addAcademicYear = (year: Omit<AcademicYear, "id" | "isCurrent">) => {
    const newYear: AcademicYear = {
      ...year,
      id: `ay_${year.startDate.split("-")[0]}_${year.endDate.split("-")[0]}`,
      isCurrent: false
    };
    setAcademicYears([...academicYears, newYear]);
  };

  const deleteAcademicYear = (id: string) => {
    setAcademicYears(academicYears.filter(y => y.id !== id));
  };

  const markYearAsCurrent = (id: string) => {
    setAcademicYears(academicYears.map(y => ({ ...y, isCurrent: y.id === id })));
    setActiveYearId(id);
  };

  return (
    <GlobalSystemContext.Provider value={{ 
      academicYears, activeYearId, setActiveYearId, getActiveYear, 
      addAcademicYear, deleteAcademicYear, markYearAsCurrent 
    }}>
      {children}
    </GlobalSystemContext.Provider>
  );
}

export function useGlobalSystem() {
  const context = useContext(GlobalSystemContext);
  if (context === undefined) {
    throw new Error("useGlobalSystem must be used within GlobalSystemProvider");
  }
  return context;
}
