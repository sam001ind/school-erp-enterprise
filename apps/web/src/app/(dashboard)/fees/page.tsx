export default function FeesDashboard() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 bg-gray-50 min-h-screen">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Fee Collection</h1>
          <p className="text-gray-500 mt-2">Manage fee structures and record student payments.</p>
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg font-medium shadow-sm transition-colors">
          Record Payment
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Expected', value: '$125,000', color: 'text-gray-900' },
          { label: 'Collected', value: '$85,000', color: 'text-emerald-600' },
          { label: 'Pending', value: '$40,000', color: 'text-amber-500' },
          { label: 'Overdue', value: '$5,000', color: 'text-red-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-sm text-gray-500 mt-2 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">Recent Transactions</h2>
            <a href="#" className="text-sm text-emerald-600 font-medium hover:underline">View All</a>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-gray-500 text-sm border-b border-gray-100">
                <th className="p-4 font-medium">Receipt No.</th>
                <th className="p-4 font-medium">Student ID</th>
                <th className="p-4 font-medium">Amount</th>
                <th className="p-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-50 hover:bg-gray-50/50">
                <td className="p-4 font-medium text-gray-900">RCPT-001</td>
                <td className="p-4 text-gray-600">STD-2026-001</td>
                <td className="p-4 font-medium">$500.00</td>
                <td className="p-4">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800">PAID</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Pay</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Student ID</label>
              <input type="text" className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 p-2 border" placeholder="e.g. STD-001" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount ($)</label>
              <input type="number" className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 p-2 border" placeholder="0.00" />
            </div>
            <button type="button" className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-2.5 rounded-lg transition-colors">
              Process Payment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
