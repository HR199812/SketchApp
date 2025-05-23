"use client";
import OptionsBar from "@/components/OptionsBar";
import ToolsBar from "@/components/ToolsBar";
import ZoomBar from "@/components/ZoomBar";
import { useRef, useState } from "react";
import useStore from "../../store/store";
import MessageBox from "@/components/MessageBox";

export default function Home() {
  const boardRef = useRef<HTMLCanvasElement | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const showMessageCard = useStore((state) => state.showMessageCard);

  //Download Canvas as JPEG
  function DownloadBoard() {
    if (!boardRef.current) return;

    const image = boardRef.current.toDataURL("image/png", 1);
    const link = document.createElement("a");
    link.download = "my-white-board";
    link.href = image;
    link.click();
  }

  const toggleFullScreen = () => {
    if (isFullScreen) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      setIsFullScreen(false);
    } else {
      if (document.body.requestFullscreen) {
        document.body.requestFullscreen();
      } else if (document.body.webkitRequestFullscreen) {
        document.body.webkitRequestFullscreen();
      } else if (document.body.msRequestFullscreen) {
        document.body.msRequestFullscreen();
      }
      setIsFullScreen(true);
    }
  };

  return (
    <div className="relative min-h-screen font-[family-name:var(--font-geist-sans)]">
      {/* Top Centered ToolsBar */}
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-10">
        <ToolsBar />
      </div>

      {/* Left Centered OptionsBar */}
      <div className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10">
        <OptionsBar
          DownloadBoard={DownloadBoard}
          setIsFullScreen={setIsFullScreen}
          toggleFullScreen={toggleFullScreen}
        />
      </div>

      {/* Fullscreen Canvas */}
      <canvas
        ref={boardRef}
        className="w-full h-screen"
      ></canvas>

      {showMessageCard && <MessageBox DownloadBoard={DownloadBoard}/>}
      {/* Right bottom Zoom-Bar */}
      <div className="absolute bottom-1 right-2 transform z-10">
        <ZoomBar />
      </div>
    </div>
  );
}
