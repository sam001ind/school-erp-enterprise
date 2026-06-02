"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// Existing types
export type LessonPlan = { id: string; topic: string; description: string; targetDate: Date; completed: boolean; };
export type Assignment = { id: string; title: string; description: string; dueDate: Date; totalMarks: number; };
export type StudyMaterial = { id: string; title: string; description: string; fileUrl: string; type: string; };
export type Subject = { id: string; name: string; code: string; credits: number; type: string; lessonPlans: LessonPlan[]; assignments: Assignment[]; studyMaterials: StudyMaterial[]; };
export type AcademicClass = { id: string; name: string; subjects: Subject[]; };

// New types for expansion
export type Faculty = { id: string; name: string; department: string; maxHours: number; currentHours: number; };
export type Room = { id: string; name: string; capacity: number; type: string; isSmart: boolean; };
export type CalendarEvent = { id: string; title: string; date: Date; type: string; };
export type LearningOutcome = { id: string; code: string; description: string; mappedSubjects: string[]; };

interface AcademicContextType {
  classes: AcademicClass[];
  activeClassId: string;
  setActiveClassId: (id: string) => void;
  activeSubjectId: string;
  setActiveSubjectId: (id: string) => void;
  toggleLessonPlan: (subjectId: string, planId: string) => void;
  addAssignment: (subjectId: string, assignment: Omit<Assignment, "id">) => void;
  addMaterial: (subjectId: string, material: Omit<StudyMaterial, "id">) => void;
  
  // New Global States
  faculty: Faculty[];
  rooms: Room[];
  events: CalendarEvent[];
  outcomes: LearningOutcome[];
  addEvent: (event: Omit<CalendarEvent, "id">) => void;
}

const AcademicContext = createContext<AcademicContextType | undefined>(undefined);

const mockClasses: AcademicClass[] = [
  {
    id: "class_10a",
    name: "Class 10-A",
    subjects: [
      {
        id: "subj_math", name: "Mathematics", code: "MTH-101", credits: 4, type: "Core",
        lessonPlans: [
          { id: "lp_1", topic: "Quadratic Equations", description: "Introduction and roots", targetDate: new Date(), completed: true },
          { id: "lp_2", topic: "Trigonometry Basics", description: "Sine, Cosine", targetDate: new Date(Date.now() + 86400000), completed: false },
        ],
        assignments: [
          { id: "ass_1", title: "Algebra Worksheet", description: "Solve page 42.", dueDate: new Date(Date.now() + 86400000 * 2), totalMarks: 50 },
        ],
        studyMaterials: []
      },
      {
        id: "subj_phy", name: "Physics", code: "PHY-101", credits: 4, type: "Core",
        lessonPlans: [], assignments: [], studyMaterials: []
      }
    ]
  }
];

const mockFaculty: Faculty[] = [
  { id: "fac_1", name: "Dr. Sarah Jenkins", department: "Science", maxHours: 20, currentHours: 18 },
  { id: "fac_2", name: "Prof. Michael Chang", department: "Mathematics", maxHours: 18, currentHours: 18 },
  { id: "fac_3", name: "Dr. Emily Blunt", department: "Arts", maxHours: 24, currentHours: 12 },
];

const mockRooms: Room[] = [
  { id: "rm_101", name: "Room 101", capacity: 40, type: "Lecture Hall", isSmart: true },
  { id: "rm_102", name: "Room 102", capacity: 30, type: "Classroom", isSmart: false },
  { id: "rm_lab1", name: "Chemistry Lab", capacity: 25, type: "Laboratory", isSmart: true },
];

const mockEvents: CalendarEvent[] = [
  { id: "evt_1", title: "Term 1 Begins", date: new Date(), type: "Academic" },
  { id: "evt_2", title: "Mid-Term Exams", date: new Date(Date.now() + 86400000 * 15), type: "Examination" },
  { id: "evt_3", title: "National Holiday", date: new Date(Date.now() + 86400000 * 5), type: "Holiday" },
];

const mockOutcomes: LearningOutcome[] = [
  { id: "lo_1", code: "PO-1", description: "Engineering Knowledge & Application", mappedSubjects: ["MTH-101", "PHY-101"] },
  { id: "lo_2", code: "PO-2", description: "Problem Analysis", mappedSubjects: ["MTH-101"] },
];

export function AcademicProvider({ children }: { children: ReactNode }) {
  const [classes, setClasses] = useState<AcademicClass[]>(mockClasses);
  const [activeClassId, setActiveClassId] = useState<string>("class_10a");
  const [activeSubjectId, setActiveSubjectId] = useState<string>("subj_math");
  
  const [faculty] = useState<Faculty[]>(mockFaculty);
  const [rooms] = useState<Room[]>(mockRooms);
  const [events, setEvents] = useState<CalendarEvent[]>(mockEvents);
  const [outcomes] = useState<LearningOutcome[]>(mockOutcomes);

  const toggleLessonPlan = (subjectId: string, planId: string) => {
    setClasses(prev => prev.map(cls => ({
      ...cls,
      subjects: cls.subjects.map(sub => {
        if (sub.id !== subjectId) return sub;
        return {
          ...sub,
          lessonPlans: sub.lessonPlans.map(lp => lp.id === planId ? { ...lp, completed: !lp.completed } : lp)
        };
      })
    })));
  };

  const addAssignment = (subjectId: string, assignment: Omit<Assignment, "id">) => {
    const newAss = { ...assignment, id: Math.random().toString(36).substr(2, 9) };
    setClasses(prev => prev.map(cls => ({ ...cls, subjects: cls.subjects.map(sub => sub.id === subjectId ? { ...sub, assignments: [...sub.assignments, newAss] } : sub) })));
  };

  const addMaterial = (subjectId: string, material: Omit<StudyMaterial, "id">) => {
    const newMat = { ...material, id: Math.random().toString(36).substr(2, 9) };
    setClasses(prev => prev.map(cls => ({ ...cls, subjects: cls.subjects.map(sub => sub.id === subjectId ? { ...sub, studyMaterials: [...sub.studyMaterials, newMat] } : sub) })));
  };

  const addEvent = (event: Omit<CalendarEvent, "id">) => {
    setEvents(prev => [...prev, { ...event, id: Math.random().toString(36).substr(2, 9) }]);
  };

  return (
    <AcademicContext.Provider value={{ classes, activeClassId, setActiveClassId, activeSubjectId, setActiveSubjectId, toggleLessonPlan, addAssignment, addMaterial, faculty, rooms, events, outcomes, addEvent }}>
      {children}
    </AcademicContext.Provider>
  );
}

export function useAcademic() {
  const context = useContext(AcademicContext);
  if (context === undefined) throw new Error("useAcademic must be used within AcademicProvider");
  return context;
}
