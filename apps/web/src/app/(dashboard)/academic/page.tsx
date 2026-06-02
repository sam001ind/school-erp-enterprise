"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AcademicProvider } from "@/lib/AcademicContext";

// Core Structure & Dashboard
import AcademicDashboardView from "@/components/academic/views/AcademicDashboardView";
import AcademicStructureView from "@/components/academic/views/AcademicStructureView";

// Expanded Views
import AcademicCalendarView from "@/components/academic/views/AcademicCalendarView";
import CurriculumManagementView from "@/components/academic/views/CurriculumManagementView";
import FacultyManagementView from "@/components/academic/views/FacultyManagementView";
import TimetableManagementView from "@/components/academic/views/TimetableManagementView";
import ClassroomManagementView from "@/components/academic/views/ClassroomManagementView";
import LessonPlanningView from "@/components/academic/views/LessonPlanningView";
import LearningOutcomesView from "@/components/academic/views/LearningOutcomesView";
import AcademicAttendanceView from "@/components/academic/views/AcademicAttendanceView";
import AcademicAdvisingView from "@/components/academic/views/AcademicAdvisingView";
import AcademicMonitoringView from "@/components/academic/views/AcademicMonitoringView";
import AcademicAnalyticsView from "@/components/academic/views/AcademicAnalyticsView";

// Existing Views
import SyllabusTrackerView from "@/components/academic/views/SyllabusTrackerView";
import StudyMaterialsView from "@/components/academic/views/StudyMaterialsView";

function AcademicModuleContent() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "dashboard";

  let content;
  switch (tab) {
    case "dashboard":
      content = <AcademicDashboardView />;
      break;
    case "structure":
      content = <AcademicStructureView />;
      break;
    case "calendar":
      content = <AcademicCalendarView />;
      break;
    case "curriculum":
      content = <CurriculumManagementView />;
      break;
    case "faculty":
      content = <FacultyManagementView />;
      break;
    case "timetable":
      content = <TimetableManagementView />;
      break;
    case "classroom":
      content = <ClassroomManagementView />;
      break;
    case "lesson":
      content = <LessonPlanningView />;
      break;
    case "syllabus":
      content = <SyllabusTrackerView />;
      break;
    case "outcomes":
      content = <LearningOutcomesView />;
      break;
    case "attendance":
      content = <AcademicAttendanceView />;
      break;
    case "advising":
      content = <AcademicAdvisingView />;
      break;
    case "resources":
      content = <StudyMaterialsView />;
      break;
    case "monitoring":
      content = <AcademicMonitoringView />;
      break;
    case "analytics":
      content = <AcademicAnalyticsView />;
      break;
    default:
      content = <AcademicDashboardView />;
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-6 md:p-8 pt-6 max-w-[1600px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Academic Operations</h1>
            <p className="text-slate-500 dark:text-slate-400">Comprehensive management of all academic structures and processes.</p>
          </div>
        </div>
        {content}
      </div>
    </div>
  );
}

export default function AcademicPage() {
  return (
    <AcademicProvider>
      <Suspense fallback={<div className="p-8 text-center text-slate-500">Loading module...</div>}>
        <AcademicModuleContent />
      </Suspense>
    </AcademicProvider>
  );
}
