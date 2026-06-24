import React from "react";

export function Table({ title, columns, data }: { title?: string; columns?: any[]; data?: any[] }) {
  if (!Array.isArray(columns) || !Array.isArray(data)) {
    return (
      <div className="p-6 mb-8 bg-rose-500/10 backdrop-blur-xl border border-rose-500/20 text-rose-700 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-1 h-full bg-rose-500"></div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-full bg-rose-100/50 flex items-center justify-center text-rose-600">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <h4 className="font-bold text-lg">Failed to render Table</h4>
        </div>
        <p className="text-sm opacity-90 ml-11">The Table component requires both <code className="font-mono text-xs bg-rose-500/10 px-1 py-0.5 rounded">columns</code> and <code className="font-mono text-xs bg-rose-500/10 px-1 py-0.5 rounded">data</code> arrays to be provided in its configuration props.</p>
      </div>
    );
  }

  return (
    <div className="bg-white/60 backdrop-blur-xl rounded-3xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden mb-8">
      {title && (
        <div className="px-8 py-6 border-b border-white/40 bg-white/40">
          <h3 className="text-xl font-bold text-slate-800">{title}</h3>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="text-xs text-slate-500 uppercase tracking-wider bg-slate-50/50">
            <tr>
              {columns.map((col, i) => (
                <th key={i} className="px-8 py-4 font-semibold">{col.label || col.key}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/50">
            {data.map((row, i) => (
              <tr key={i} className="hover:bg-white/80 transition-colors duration-200">
                {columns.map((col, j) => (
                  <td key={j} className="px-8 py-5 text-slate-700 font-medium">
                    {row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-8 py-12 text-center text-slate-500 font-medium">
                  No data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
