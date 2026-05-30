export default function AttendanceDashboard() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Attendance Tracking</h1>
          <p className="text-gray-500 mt-2">Manage daily student attendance and records.</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium shadow-sm transition-colors">
          Record Attendance
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
          <div className="text-4xl font-bold text-indigo-600">94%</div>
          <div className="text-sm text-gray-500 mt-1 font-medium">Average Present</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
          <div className="text-4xl font-bold text-red-500">2%</div>
          <div className="text-sm text-gray-500 mt-1 font-medium">Average Absent</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
          <div className="text-4xl font-bold text-amber-500">4%</div>
          <div className="text-sm text-gray-500 mt-1 font-medium">Average Late</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">Recent Records</h2>
        </div>
        <div className="p-0">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-gray-500 text-sm border-b border-gray-100">
                <th className="p-4 font-medium">Student ID</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {/* Placeholder data */}
              <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <td className="p-4 font-medium text-gray-900">STD-2026-001</td>
                <td className="p-4 text-gray-600">May 30, 2026</td>
                <td className="p-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Present
                  </span>
                </td>
                <td className="p-4 text-gray-500 text-sm">-</td>
              </tr>
              <tr className="hover:bg-gray-50/50 transition-colors">
                <td className="p-4 font-medium text-gray-900">STD-2026-002</td>
                <td className="p-4 text-gray-600">May 30, 2026</td>
                <td className="p-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    Absent
                  </span>
                </td>
                <td className="p-4 text-gray-500 text-sm">Medical Leave</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
