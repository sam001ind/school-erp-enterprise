export default function HostelDashboard() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 bg-gray-50 min-h-screen">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Hostel Management</h1>
          <p className="text-gray-500 mt-2">Manage dorm rooms, capacity, and student allocations.</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium shadow-sm transition-colors">
          Allocate Room
        </button>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Room Occupancy</h2>
          <div className="text-gray-500 italic">No rooms configured yet.</div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Recent Allocations</h2>
          <div className="text-gray-500 italic">No recent student allocations.</div>
        </div>
      </div>
    </div>
  );
}
