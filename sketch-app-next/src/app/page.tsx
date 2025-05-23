"use client";
import OptionsBar from "@/components/OptionsBar";
import ToolsBar from "@/components/ToolsBar";
import ZoomBar from "@/components/ZoomBar";
import { useEffect, useRef, useState } from "react";
import useStore from "../../store/store";
import MessageBox from "@/components/MessageBox";

export default function Home() {
  const boardRef = useRef<HTMLCanvasElement | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const showMessageCard = useStore((state) => state.showMessageCard);
  const color = useStore((state) => state.color);
  const strokeWidth = useStore((state) => state.strokeWidth);
  const toolType = useStore((state) => state.toolType);
  const ctxRef = useRef(null);
  const isPaintingRef = useRef(false);
  const coordRef = useRef({ x: 0, y: 0 });

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

  const getPosition = (event: unknown) => {
    if (!boardRef.current) return;
    const canvas = boardRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX || event.touches?.[0]?.clientX) - rect.left;
    const y = (event.clientY || event.touches?.[0]?.clientY) - rect.top;
    coordRef.current = { x, y };
  };

  const sketch = (event: unknown) => {
    if (!isPaintingRef.current || !ctxRef.current) return;

    const ctx = ctxRef.current;
    const coord = coordRef.current;

    ctx.beginPath();

    console.log("I am being called", toolType);

    ctx.lineWidth = strokeWidth;

    if (toolType === "spray") {
      ctx.fillStyle = color;

      for (let i = 50; i--; ) {
        const radius = 20;
        const offsetX = Math.floor(Math.random() * (2 * radius + 1)) - radius;
        const offsetY = Math.floor(Math.random() * (2 * radius + 1)) - radius;
        ctx.fillRect(event.clientX + offsetX, event.clientY + offsetY, 1, 1);
      }
    } else if (toolType === "eraser") {
      ctx.strokeStyle = `white`;
    } else {
      ctx.strokeStyle = color;
    }

    ctx.lineJoin = ctx.lineCap = "round";

    ctx.moveTo(coord.x, coord.y);
    getPosition(event);
    const { x, y } = coordRef.current;

    if (!(toolType === "spray")) {
      ctx.lineTo(x, y);
    }

    ctx.stroke();
  };

  useEffect(() => {
    if (!boardRef) return;

    const canvas = boardRef.current;
    const ctx = canvas.getContext("2d");
    ctxRef.current = ctx;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, []);

  useEffect(() => {
    if (!boardRef) return;

    const canvas = boardRef.current;

    const startPainting = (e: unknown) => {
      isPaintingRef.current = true;
      getPosition(e);
    };

    const stopPainting = () => {
      isPaintingRef.current = false;
      ctxRef.current?.beginPath();
    };

    const draw = (e) => {
      sketch(e);
    };

    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mousemove", draw);

    canvas.addEventListener("touchstart", startPainting);
    canvas.addEventListener("touchend", stopPainting);
    canvas.addEventListener("touchmove", draw);

    return () => {
      canvas.removeEventListener("mousedown", startPainting);
      canvas.removeEventListener("mouseup", stopPainting);
      canvas.removeEventListener("mousemove", draw);

      canvas.removeEventListener("touchstart", startPainting);
      canvas.removeEventListener("touchend", stopPainting);
      canvas.removeEventListener("touchmove", draw);
    };
  }, [toolType, strokeWidth]);

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
      <canvas ref={boardRef} className="w-full h-screen"></canvas>

      {showMessageCard && <MessageBox DownloadBoard={DownloadBoard} />}
      {/* Right bottom Zoom-Bar */}
      <div className="absolute bottom-1 right-2 transform z-10">
        <ZoomBar />
      </div>
    </div>
  );
}
