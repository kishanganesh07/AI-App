import React from "react";

export function Header({ title, subtitle }: { title?: string; subtitle?: string }) {
  if (!title) {
    return (
      <div className="p-4 mb-8 border border-red-200 bg-red-50/80 backdrop-blur-md text-red-800 rounded-2xl shadow-sm text-sm">
        <strong>Failed to render Header:</strong> 'title' is required.
      </div>
    );
  }

  return (
    <div className="mb-12">
      <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-purple-900 to-slate-800 tracking-tight">
        {title}
      </h1>
      {subtitle && <p className="mt-3 text-lg text-slate-500 font-light">{subtitle}</p>}
    </div>
  );
}
