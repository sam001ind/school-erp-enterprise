export default function TransportDashboard() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 bg-gray-50 min-h-screen">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Transport Routes</h1>
          <p className="text-gray-500 mt-2">Manage buses, drivers, and student allocations.</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium shadow-sm transition-colors">
          Create Route
        </button>
      </header>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Active Routes</h2>
        <div className="text-gray-500 italic">No transport routes configured.</div>
      </div>
    </div>
  );
}
