export default function LeaveDashboard() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 bg-gray-50 min-h-screen">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Leave Requests</h1>
          <p className="text-gray-500 mt-2">Manage employee leave applications.</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium shadow-sm transition-colors">
          Apply for Leave
        </button>
      </header>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Pending Approvals</h2>
        <div className="text-gray-500 italic">No pending leave requests.</div>
      </div>
    </div>
  );
}
