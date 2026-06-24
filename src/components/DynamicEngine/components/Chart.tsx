"use client";

import React from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export function Chart({ title, type, dataKey, series, data }: { title?: string; type?: "line" | "bar"; dataKey?: string; series?: any[]; data?: any[] }) {
  if (!type || !dataKey || !Array.isArray(series) || !Array.isArray(data)) {
    return (
      <div className="p-4 mb-8 border border-red-200 bg-red-50/80 backdrop-blur-md text-red-800 rounded-2xl text-sm shadow-sm">
        <strong>Failed to render Chart:</strong> 'type', 'dataKey', 'series', and 'data' are required.
      </div>
    );
  }

  const ChartComponent = type === "line" ? LineChart : BarChart;

  return (
    <div className="bg-white/60 backdrop-blur-xl rounded-3xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden mb-8 p-6">
      {title && (
        <h3 className="text-xl font-bold text-slate-800 mb-6 px-2">{title}</h3>
      )}
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          {/* @ts-ignore dynamic recharts component */}
          <ChartComponent data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis dataKey={dataKey} stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            {series.map((s, i) => {
              if (type === "line") {
                return <Line key={i} type="monotone" dataKey={s.key} name={s.name || s.key} stroke={s.color || "#8b5cf6"} strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />;
              } else {
                return <Bar key={i} dataKey={s.key} name={s.name || s.key} fill={s.color || "#8b5cf6"} radius={[4, 4, 0, 0]} />;
              }
            })}
          </ChartComponent>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
