"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle } from "lucide-react";

interface Props {
  children: ReactNode;
  fallbackName?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error in DynamicComponent:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 my-2 border border-red-200 bg-red-50 text-red-800 rounded-lg flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-500" />
          <div>
            <h4 className="font-semibold text-sm">Failed to render {this.props.fallbackName || "Component"}</h4>
            <p className="text-xs mt-1 text-red-600 opacity-80 break-words line-clamp-2">
              {this.state.error?.message || "Invalid configuration or props."}
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
