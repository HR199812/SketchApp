export default function ZoomBar() {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-white border rounded-md shadow-md p-2">
      {/* Zoom Out */}
      <button
        className="p-2 hover:bg-gray-100 rounded"
        title="Zoom out — Cmd+-"
        aria-label="Zoom out"
      >
        <svg
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.25"
          className="w-4 h-4"
        >
          <path d="M5 10h10" />
        </svg>
      </button>

      {/* Reset Zoom */}
      <button
        className="px-3 py-2 hover:bg-gray-100 rounded text-sm font-medium"
        title="Reset zoom"
        aria-label="Reset zoom"
      >
        100%
      </button>

      {/* Zoom In */}
      <button
        className="p-2 hover:bg-gray-100 rounded"
        title="Zoom in — Cmd++"
        aria-label="Zoom in"
      >
        <svg
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.25"
          className="w-4 h-4"
        >
          <path d="M10 4.167v11.666M4.167 10h11.666" />
        </svg>
      </button>
    </div>
  );
}
