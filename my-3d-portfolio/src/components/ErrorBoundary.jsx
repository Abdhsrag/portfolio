"use client";
import { PureComponent } from "react";

export default class ErrorBoundary extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-full h-full bg-gradient-to-b from-cyan-950/20 to-purple-950/20" />
          </div>
        )
      );
    }
    return this.props.children;
  }
}
