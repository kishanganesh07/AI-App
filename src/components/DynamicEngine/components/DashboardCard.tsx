import React from "react";

export function DashboardCard({ title, value, trend }: { title?: string; value?: string; trend?: string }) {
  if (!title || value === undefined) {
    return (
      <div className="p-4 border border-red-200 bg-red-50/80 backdrop-blur-md text-red-800 rounded-2xl shadow-sm text-sm">
        <strong>Failed to render Card:</strong> 'title' and 'value' are required.
      </div>
    );
  }

  const isPositive = trend?.startsWith("+");
  const isNegative = trend?.startsWith("-");

  return (
    <div className="relative group bg-white/60 backdrop-blur-xl rounded-3xl border border-white/80 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative z-10">
        <h3 className="text-sm font-semibold text-slate-500 tracking-wide uppercase mb-3">{title}</h3>
        <div className="flex items-baseline gap-3">
          <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-slate-900 to-slate-700">{value}</span>
          {trend && (
            <span className={`text-sm font-bold px-2.5 py-1 rounded-full ${isPositive ? 'bg-emerald-100/80 text-emerald-700' : isNegative ? 'bg-rose-100/80 text-rose-700' : 'bg-slate-100/80 text-slate-700'}`}>
              {trend}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
