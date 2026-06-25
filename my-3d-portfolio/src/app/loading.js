export default function Loading() {
  return (
    <div className="fixed inset-0 z-[99999] bg-black flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-gray-500 font-mono">Loading...</p>
      </div>
    </div>
  );
}
