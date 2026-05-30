export default function LibraryDashboard() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 bg-gray-50 min-h-screen">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Library Circulation</h1>
          <p className="text-gray-500 mt-2">Manage book inventory and checkouts.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-5 py-2.5 rounded-lg font-medium shadow-sm transition-colors">
            Add Book
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium shadow-sm transition-colors">
            Issue Book
          </button>
        </div>
      </header>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Active Checkouts</h2>
        <div className="text-gray-500 italic">No active circulations.</div>
      </div>
    </div>
  );
}
