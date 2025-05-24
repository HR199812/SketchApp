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
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
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
      }
      setIsFullScreen(false);
    } else {
      if (document.body.requestFullscreen) {
        document.body.requestFullscreen();
      }
      setIsFullScreen(true);
    }
  };

  const getPosition = (event: MouseEvent | TouchEvent) => {
    if (!boardRef.current) return;
    const canvas = boardRef.current;
    const rect = canvas.getBoundingClientRect();

    // Type-safe client coordinates
    const clientX =
      "touches" in event ? event.touches[0]?.clientX : event.clientX;

    const clientY =
      "touches" in event ? event.touches[0]?.clientY : event.clientY;

    if (!clientX || !clientY) return;

    const x = clientX - rect.left;
    const y = clientY - rect.top;
    coordRef.current = { x, y };
  };

  const sketch = (event: MouseEvent | TouchEvent) => {
    if (!isPaintingRef.current || !ctxRef.current) return;

    const ctx = ctxRef.current;
    const coord = coordRef.current;

    const currentX =
      "touches" in event ? event.touches[0]?.clientX : event.clientX;

    const currentY =
      "touches" in event ? event.touches[0]?.clientY : event.clientY;

    if (!currentX || !currentY) return;

    ctx.beginPath();

    console.log("I am being called", toolType);

    ctx.lineWidth = strokeWidth;

    if (toolType === "spray") {
      ctx.fillStyle = color as string;

      for (let i = 50; i--; ) {
        const radius = 20;
        const offsetX = Math.floor(Math.random() * (2 * radius + 1)) - radius;
        const offsetY = Math.floor(Math.random() * (2 * radius + 1)) - radius;
        ctx.fillRect(currentX + offsetX, currentY + offsetY, 1, 1);
      }
    } else if (toolType === "eraser") {
      ctx.strokeStyle = `white`;
    } else {
      ctx.strokeStyle = color as string;
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
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctxRef.current = ctx;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, []);

  useEffect(() => {
    if (!boardRef) return;

    const canvas = boardRef.current;

    const startPainting = (e: MouseEvent | TouchEvent) => {
      isPaintingRef.current = true;
      getPosition(e);
    };

    const stopPainting = () => {
      isPaintingRef.current = false;
      ctxRef.current?.beginPath();
    };

    const draw = (e: MouseEvent | TouchEvent) => {
      sketch(e);
    };

    if (!canvas) return;

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
    <div className="relative max-h-screen h-screen w-screen overflow-hidden touch-none select-none font-[family-name:var(--font-geist-sans)]">
      {/* Top Centered ToolsBar */}
      <div className="absolute md:top-4 left-1/2 -translate-x-1/2 z-10 w-max max-w-full px-2">
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
      <div className="absolute bottom-12 md:bottom-1 right-2 transform z-10">
        <ZoomBar />
      </div>
    </div>
  );
}
