"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { DynamicRenderer } from "@/components/DynamicEngine/DynamicRenderer";
import { useBuilderStore } from "@/store/useBuilderStore";
import { mockApps } from "@/lib/mockApps";

export default function BuilderPage() {
  const { jsonConfig, parsedConfig, validationErrors, setJsonConfig, loadTemplate } = useBuilderStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex h-screen w-full bg-slate-900 text-slate-100 overflow-hidden font-sans">
      {/* Left Panel: Editor & Validation */}
      <div className="w-1/2 flex flex-col border-r border-slate-700 bg-slate-900">
        <div className="h-14 border-b border-slate-700 flex items-center justify-between px-4 bg-slate-800">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center space-x-1 px-2 py-1 bg-slate-700 hover:bg-slate-600 rounded text-slate-300 hover:text-white transition-colors text-sm font-medium">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              <span>Home</span>
            </Link>
            <div className="h-4 w-px bg-slate-600"></div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            </div>
            <span className="font-semibold text-sm tracking-wide text-slate-300">JSON Editor</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-400">Templates:</span>
            <select 
              className="bg-slate-700 text-white border border-slate-600 rounded px-2 py-1 outline-none focus:ring-2 focus:ring-purple-500 transition-all text-xs"
              onChange={(e) => {
                const template = mockApps.find(a => a.id === e.target.value);
                if (template) loadTemplate(template);
              }}
              defaultValue=""
            >
              <option value="" disabled>Select template...</option>
              {mockApps.map(app => (
                <option key={app.id} value={app.id}>{app.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex-1 min-h-0 relative">
          <Editor
            height="100%"
            defaultLanguage="json"
            theme="vs-dark"
            value={jsonConfig}
            onChange={(val) => setJsonConfig(val || "")}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              formatOnPaste: true,
              wordWrap: "on",
              padding: { top: 16 }
            }}
            loading={
              <div className="flex h-full items-center justify-center text-slate-500">
                Loading Editor...
              </div>
            }
          />
        </div>

        {/* Validation & Docs Panel */}
        <div className="h-64 flex flex-row border-t border-slate-700 bg-slate-950">
          <div className="w-1/2 flex flex-col border-r border-slate-800">
            <div className="px-4 py-2 border-b border-slate-800 flex justify-between items-center bg-slate-900">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Zod Validation</span>
              {validationErrors.length === 0 ? (
                <span className="text-xs font-medium px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Schema Valid
                </span>
              ) : (
                <span className="text-xs font-medium px-2 py-1 bg-rose-500/20 text-rose-400 rounded-full flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  {validationErrors.length} Error{validationErrors.length > 1 ? 's' : ''}
                </span>
              )}
            </div>
            <div className="flex-1 overflow-auto p-4 space-y-2">
              {validationErrors.length === 0 ? (
                <div className="text-emerald-500/80 text-sm font-mono flex items-center h-full justify-center text-center">
                  ✓ All components match strict schema requirements.
                </div>
              ) : (
                validationErrors.map((err, i) => (
                  <div key={i} className="text-rose-400 text-sm font-mono bg-rose-500/10 p-2 rounded border border-rose-500/20">
                    <span className="font-bold">Error at path: </span> 
                    <span className="text-slate-300">{err.path.join(".") || "root"}</span>
                    <br />
                    <span className="opacity-80">↳ {err.message}</span>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="w-1/2 flex flex-col bg-slate-900">
            <div className="px-4 py-2 border-b border-slate-800 bg-slate-900">
               <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Supported Components</span>
            </div>
            <div className="flex-1 overflow-auto p-4">
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs text-slate-300 font-mono">✓ Header</span>
                <span className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs text-slate-300 font-mono">✓ Grid</span>
                <span className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs text-slate-300 font-mono">✓ DashboardCard</span>
                <span className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs text-slate-300 font-mono">✓ Table</span>
                <span className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs text-slate-300 font-mono">✓ Form</span>
                <span className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs text-slate-300 font-mono">✓ Chart</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel: Live Preview */}
      <div className="w-1/2 flex flex-col bg-slate-50 relative">
        <div className="h-14 border-b border-slate-200 flex items-center px-4 bg-white shadow-sm z-20">
          <span className="font-semibold text-sm tracking-wide text-slate-800">Live Preview</span>
          <div className="ml-auto text-xs text-slate-400 font-medium">Powered by Dynamic Engine</div>
        </div>
        <div className="flex-1 overflow-auto p-8 relative">
           {/* Background Blurs for Aesthetics */}
          <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-purple-200/50 mix-blend-multiply filter blur-[100px] animate-blob pointer-events-none"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-blue-200/50 mix-blend-multiply filter blur-[100px] animate-blob animation-delay-4000 pointer-events-none"></div>
          
          <div className="relative z-10 max-w-4xl mx-auto space-y-8">
            {parsedConfig && parsedConfig.components && Array.isArray(parsedConfig.components) ? (
              parsedConfig.components.map((componentConfig: any, index: number) => (
                <DynamicRenderer key={index} config={componentConfig} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                <svg className="w-12 h-12 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                <p>Waiting for valid component configuration...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
