import React from "react";
import { DynamicRenderer } from "../DynamicRenderer";

export function Grid({ columns = 1, children }: { columns?: number; children?: any[] }) {
  if (!Array.isArray(children)) return null;

  return (
    <div
      className="grid gap-6 mb-8"
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {children.map((child, index) => (
        <DynamicRenderer key={index} config={child} />
      ))}
    </div>
  );
}
