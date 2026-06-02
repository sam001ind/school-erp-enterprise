export type ModuleMenu = {
  title: string;
  id: string;
};

export const moduleMenus: Record<string, ModuleMenu[]> = {
  "/website": [
    { title: "Pages & Routing", id: "pages" },
    { title: "Theme & Appearance", id: "theme" },
    { title: "Media Library", id: "media" },
    { title: "Site Settings", id: "settings" },
  ],
  "/communications": [
    { title: "Hub Dashboard", id: "dashboard" },
    { title: "Shared Inbox", id: "inbox" },
    { title: "Broadcasts", id: "broadcasts" },
    { title: "Message Templates", id: "templates" },
    { title: "Chatbots & Flows", id: "chatbots" },
    { title: "API Settings", id: "settings" },
  ],
  "/social": [
    { title: "Dashboard", id: "dashboard" },
    { title: "Brands", id: "brands" },
    { title: "Channels", id: "channels" },
    { title: "Publishing", id: "publishing" },
    { title: "Calendar", id: "calendar" },
    { title: "Media Library", id: "media" },
    { title: "Inbox", id: "inbox" },
    { title: "Monitoring", id: "monitoring" },
    { title: "Analytics", id: "analytics" },
    { title: "Reports", id: "reports" }
  ],
  "/admissions": [
    { title: "Dashboard & Analytics", id: "dashboard" },
    { title: "Campaigns & Leads", id: "campaigns" },
    { title: "Enquiry Management", id: "enquiry" },
    { title: "Application Management", id: "applications" },
    { title: "Document Verification", id: "documents" },
    { title: "Entrance & Interviews", id: "assessments" },
    { title: "Merit Lists & Approvals", id: "approvals" },
    { title: "Fee Collection", id: "fees" },
    { title: "Enrollment & Allocation", id: "enrollment" },
    { title: "Reports & Configuration", id: "reports" },
  ],
  "/attendance": [
    { title: "My Attendance", id: "my" },
    { title: "Mark Attendance", id: "mark" },
    { title: "Reports", id: "reports" },
  ],
  "/academic": [
    { title: "Dashboard", id: "dashboard" },
    { title: "Academic Calendar", id: "calendar" },
    { title: "Academic Structure", id: "structure" },
    { title: "Curriculum Management", id: "curriculum" },
    { title: "Faculty Management", id: "faculty" },
    { title: "Timetable Management", id: "timetable" },
    { title: "Classroom Management", id: "classroom" },
    { title: "Lesson Planning", id: "lesson" },
    { title: "Syllabus Management", id: "syllabus" },
    { title: "Learning Outcomes", id: "outcomes" },
    { title: "Attendance Management", id: "attendance" },
    { title: "Academic Advising", id: "advising" },
    { title: "Academic Resources", id: "resources" },
    { title: "Academic Monitoring", id: "monitoring" },
    { title: "Analytics & Reports", id: "analytics" },
  ],
  "/examinations": [
    { title: "Upcoming Exams", id: "upcoming" },
    { title: "My Results & Grades", id: "results" },
    { title: "Download Admit Card", id: "admit" },
  ],
  "/fees": [
    { title: "Current Dues & Pay", id: "dues" },
    { title: "Payment History", id: "history" },
    { title: "Fee Structure", id: "structure" },
  ],
  "/hostel": [
    { title: "My Room", id: "my-room" },
    { title: "Apply for Hostel", id: "apply" },
    { title: "Complaints & Requests", id: "complaints" },
  ],
  "/leave": [
    { title: "My Leaves", id: "my" },
    { title: "Apply for Leave", id: "apply" },
    { title: "Pending Approvals", id: "approvals" },
  ],
  "/library": [
    { title: "My Borrowed Books", id: "borrowed" },
    { title: "Search Catalogue", id: "search" },
    { title: "Overdue Fines", id: "fines" },
  ],
  "/payroll": [
    { title: "My Payslips", id: "slips" },
    { title: "Process Payroll", id: "process" },
  ],
  "/transport": [
    { title: "My Bus Route", id: "my" },
    { title: "Live Tracking", id: "track" },
    { title: "Apply for Transport", id: "apply" },
  ],
  "/users": [
    { title: "User Directory", id: "directory" },
    { title: "Role Management", id: "roles" },
  ]
};
