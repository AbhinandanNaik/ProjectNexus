"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle } from "lucide-react";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-red-500 font-mono p-4 z-50 absolute inset-0">
          <AlertTriangle className="w-16 h-16 mb-4 animate-pulse" />
          <h2 className="text-2xl font-bold mb-2">SYSTEM FAILURE</h2>
          <p className="text-red-400/80 max-w-md text-center border border-red-500/30 p-4 rounded bg-red-950/20">
            {this.state.error?.message || "A critical error occurred in the visualization engine."}
          </p>
          <button 
            className="mt-6 px-4 py-2 bg-red-900/50 hover:bg-red-800/50 border border-red-500/50 rounded transition-colors"
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            REBOOT SYSTEM
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
