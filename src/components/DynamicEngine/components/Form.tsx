"use client";

import React, { useState } from "react";

export function Form({ title, fields, submitLabel }: { title?: string; fields?: any[]; submitLabel?: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!Array.isArray(fields)) {
    return (
      <div className="p-4 mb-8 border border-red-200 bg-red-50/80 backdrop-blur-md text-red-800 rounded-2xl text-sm shadow-sm">
        <strong>Failed to render Form:</strong> 'fields' array is required.
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate network delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Reset form after 3 seconds
      setTimeout(() => setIsSubmitted(false), 3000);
    }, 800);
  };

  return (
    <div className="bg-white/60 backdrop-blur-xl rounded-3xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden mb-8 max-w-2xl relative">
      {isSubmitted && (
        <div className="absolute top-0 left-0 right-0 bg-emerald-500 text-white p-4 text-center font-medium animate-in slide-in-from-top duration-300 z-10 shadow-md">
          ✓ Successfully submitted!
        </div>
      )}
      {title && (
        <div className="px-8 py-6 border-b border-white/40 bg-white/40">
          <h3 className="text-xl font-bold text-slate-800">{title}</h3>
        </div>
      )}
      <div className="p-8">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {fields.map((field, i) => (
            <div key={i}>
              <label className="block text-sm font-semibold text-slate-700 mb-2 tracking-wide">
                {field.label || field.name}
                {field.required && <span className="text-purple-500 ml-1">*</span>}
              </label>
              {field.type === "select" ? (
                <select
                  required={field.required}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 bg-white/50 border border-slate-200 rounded-xl shadow-inner focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all duration-200 text-slate-700 disabled:opacity-50"
                >
                  <option value="">Select an option</option>
                  {field.options?.map((opt: string) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type || "text"}
                  required={field.required}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 bg-white/50 border border-slate-200 rounded-xl shadow-inner focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all duration-200 text-slate-700 placeholder-slate-400 disabled:opacity-50"
                  placeholder={`Enter ${field.label?.toLowerCase() || field.name}`}
                />
              )}
            </div>
          ))}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:bg-gradient-to-br text-white font-bold rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transform hover:-translate-y-0.5 transition-all duration-300 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-70 disabled:transform-none flex justify-center items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Processing...
                </>
              ) : (
                submitLabel || "Submit"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
