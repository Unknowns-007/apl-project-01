import * as React from "react";

interface Props {
  children?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    const { hasError, error } = this.state;
    if (hasError) {
      return (
        <div className="min-h-screen bg-[#050508] flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full glass-panel p-8">
            <h2 className="text-2xl font-black italic tracking-tighter uppercase mb-4 text-brand-red">System Failure</h2>
            <p className="text-white/60 text-sm mb-6">
              The interface encountered a critical error. Our engineers are tracking the pulse.
            </p>
            <pre className="bg-black/50 p-4 rounded-xl text-[10px] font-mono text-left overflow-auto mb-6 text-white/40">
              {error?.message}
            </pre>
            <button
              onClick={() => window.location.href = '/'}
              className="w-full py-4 bg-white text-black font-black uppercase tracking-widest rounded-2xl hover:scale-105 transition-transform"
            >
              Return Home
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
