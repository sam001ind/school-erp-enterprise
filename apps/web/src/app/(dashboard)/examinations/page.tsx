export default function ExaminationsDashboard() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 bg-gray-50 min-h-screen">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Examinations</h1>
          <p className="text-gray-500 mt-2">Manage terms, schedule exams, and record grades.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-5 py-2.5 rounded-lg font-medium shadow-sm transition-colors">
            Create Exam
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium shadow-sm transition-colors">
            Enter Marks
          </button>
        </div>
      </header>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Upcoming Examinations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'Mid-Term 2026', term: 'Term 1', date: 'June 15 - June 25', status: 'Scheduled' },
            { name: 'Finals 2026', term: 'Term 2', date: 'Nov 10 - Nov 20', status: 'Draft' },
          ].map((exam, i) => (
            <div key={i} className="border border-gray-200 rounded-xl p-5 hover:border-blue-500 transition-colors cursor-pointer group">
              <div className="flex justify-between items-start mb-4">
                <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${exam.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}`}>
                  {exam.status}
                </span>
              </div>
              <h3 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">{exam.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{exam.term}</p>
              <div className="mt-4 flex items-center text-sm text-gray-600 font-medium">
                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                {exam.date}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Recent Results Entry</h2>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 text-gray-500 text-sm border-b border-gray-100">
              <th className="p-4 font-medium">Student ID</th>
              <th className="p-4 font-medium">Subject</th>
              <th className="p-4 font-medium">Marks</th>
              <th className="p-4 font-medium">Grade</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-50 hover:bg-gray-50/50">
              <td className="p-4 font-medium text-gray-900">STD-2026-001</td>
              <td className="p-4 text-gray-600">Mathematics</td>
              <td className="p-4 font-medium">85 / 100</td>
              <td className="p-4">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-green-100 text-green-800">A</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
