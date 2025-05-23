export default function ZoomBar() {

  return (
    <div className="fixed bottom-4 right-4 z-50 flex gap-4 bg-white border rounded-lg shadow-md p-3">
      {/* Undo/Redo Controls */}
      <div className="flex gap-2">
        <button
          className="p-2 hover:bg-gray-100 rounded transition-colors"
          title="Undo"
          aria-label="Undo"
          data-testid="button-undo"
        >
          <svg
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            className="w-5 h-5"
          >
            <path
              d="M7.5 10.833 4.167 7.5 7.5 4.167M4.167 7.5h9.166a3.333 3.333 0 0 1 0 6.667H12.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <button
          className="p-2 hover:bg-gray-100 rounded transition-colors"
          title="Redo"
          aria-label="Redo"
          data-testid="button-redo"
        >
          <svg
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            className="w-5 h-5"
          >
            <path
              d="M12.5 10.833 15.833 7.5 12.5 4.167M15.833 7.5H6.667a3.333 3.333 0 1 0 0 6.667H7.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Zoom Controls */}
      <div className="flex items-center gap-2">
        <button
          className="p-2 hover:bg-gray-100 rounded transition-colors"
          title="Zoom out (Cmd+-)"
          aria-label="Zoom out"
        >
          <svg
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            className="w-5 h-5"
          >
            <path d="M5 10h10" strokeLinecap="round" />
          </svg>
        </button>

        <button
          className="px-3 py-2 hover:bg-gray-100 rounded transition-colors text-sm font-medium"
          title="Reset zoom"
          aria-label="Reset zoom"
        >
          100%
        </button>

        <button
          className="p-2 hover:bg-gray-100 rounded transition-colors"
          title="Zoom in (Cmd++)"
          aria-label="Zoom in"
        >
          <svg
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            className="w-5 h-5"
          >
            <path d="M10 4.167v11.666M4.167 10h11.666" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
