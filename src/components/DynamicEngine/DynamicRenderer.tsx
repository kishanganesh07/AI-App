"use client";

import React, { Suspense } from "react";
import { ErrorBoundary } from "../ErrorBoundary";

// Lazy-loaded Extensible Component Registry
export const componentRegistry: Record<string, React.ComponentType<any>> = {
  Header: React.lazy(() => import("./components/Header").then(m => ({ default: m.Header }))),
  DashboardCard: React.lazy(() => import("./components/DashboardCard").then(m => ({ default: m.DashboardCard }))),
  Table: React.lazy(() => import("./components/Table").then(m => ({ default: m.Table }))),
  Form: React.lazy(() => import("./components/Form").then(m => ({ default: m.Form }))),
  Grid: React.lazy(() => import("./components/Grid").then(m => ({ default: m.Grid }))),
  Chart: React.lazy(() => import("./components/Chart").then(m => ({ default: m.Chart }))),
};

export function DynamicRenderer({ config }: { config: any }) {
  if (!config) return null;
  if (typeof config !== "object") return null;

  const { type, props, children } = config;

  if (!type) return null;

  const Component = componentRegistry[type];

  if (!Component) {
    return (
      <div className="p-6 mb-8 bg-amber-500/10 backdrop-blur-xl border border-amber-500/20 text-amber-700 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-full bg-amber-100/50 flex items-center justify-center text-amber-600">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          </div>
          <h4 className="font-bold text-lg">Unknown Component: <span className="font-mono bg-amber-500/20 px-2 py-0.5 rounded text-amber-800">{type}</span></h4>
        </div>
        <p className="text-sm opacity-90 ml-11">This component is not registered in the DynamicEngine rendering system. Please register it in <code className="font-mono text-xs bg-amber-500/10 px-1 py-0.5 rounded">ComponentRegistry.ts</code>.</p>
      </div>
    );
  }

  return (
    <ErrorBoundary fallbackName={type}>
      <Suspense fallback={
        <div className="p-6 mb-8 border border-purple-200 bg-purple-50/50 rounded-2xl flex items-center justify-center animate-pulse">
          <div className="flex items-center gap-3 text-purple-600">
            <svg className="w-5 h-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            <span className="font-semibold text-sm">Loading {type}...</span>
          </div>
        </div>
      }>
        <Component {...props} children={children} />
      </Suspense>
    </ErrorBoundary>
  );
}
