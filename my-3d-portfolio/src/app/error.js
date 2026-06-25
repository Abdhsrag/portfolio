"use client";

export default function Error({ reset }) {
  return (
    <div className="fixed inset-0 z-[99999] bg-black flex items-center justify-center">
      <div className="max-w-md text-center px-6">
        <div className="text-6xl mb-6">
          <i className="fas fa-exclamation-triangle text-cyan-400" />
        </div>
        <h1 className="text-3xl font-black mb-4">
          <span className="text-gradient">Something went wrong</span>
        </h1>
        <p className="text-gray-400 mb-8">
          An unexpected error occurred. Please try refreshing the page.
        </p>
        <button
          onClick={() => reset()}
          className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
