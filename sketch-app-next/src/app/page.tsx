import OptionsBar from "@/components/OptionsBar";
import ToolsBar from "@/components/ToolsBar";
import ZoomBar from "@/components/ZoomBar";

export default function Home() {
  return (
    <div className="relative min-h-screen font-[family-name:var(--font-geist-sans)]">
      {/* Top Centered ToolsBar */}
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-10">
        <ToolsBar />
      </div>

      {/* Left Centered OptionsBar */}
      <div className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10">
        <OptionsBar />
      </div>

      {/* Fullscreen Canvas */}
      <canvas id="DrawingPage" className="DrawingPage w-full h-screen"></canvas>

      {/* Right bottom Zoom-Bar */}
      <div className="absolute bottom-1 right-2 transform z-10">
        <ZoomBar />
      </div>
    </div>
  );
}
