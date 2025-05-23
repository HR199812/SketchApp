"use client";
import {
  FaPencilAlt,
  FaPen,
  FaMarker,
  FaPaintBrush,
  FaSprayCan,
  FaEraser,
} from "react-icons/fa";
import useStore from "../../store/store";
import { SetStateAction, useRef } from "react";

const Toolsbar = () => {
  const setToolType = useStore((state) => state.setToolType);
  const colorInputRef = useRef(null);

  const color = useStore((state) => state.color);
  const setColor = useStore((state) => state.setColor);

  const handleColorChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    const colorValue = e.target.value;
    setColor(colorValue);
  };
  return (
    <div className="border rounded-lg w-fit h-fit bg-white flex flex-row gap-4 justify-between p-2 shadow-md">
      <ul className="flex gap-4">
        <li>
          <button
            className="p-2 hover:bg-gray-100 rounded transition-colors"
            title="Pencil"
            aria-label="Pencil"
            onClick={() => setToolType("pencil")}
          >
            <FaPencilAlt size={24} />
          </button>
        </li>
        <li>
          <button
            className="p-2 hover:bg-gray-100 rounded transition-colors"
            title="Pen"
            aria-label="Pen"
            onClick={() => setToolType("pen")}
          >
            <FaPen size={24} />
          </button>
        </li>
        <li>
          <button
            className="p-2 hover:bg-gray-100 rounded transition-colors"
            title="Marker"
            aria-label="Marker"
            onClick={() => setToolType("marker")}
          >
            <FaMarker size={24} />
          </button>
        </li>
        <li>
          <button
            className="p-2 hover:bg-gray-100 rounded transition-colors"
            title="Paint Brush"
            aria-label="Paint Brush"
            onClick={() => setToolType("brush")}
          >
            <FaPaintBrush size={24} />
          </button>
        </li>
        <li>
          <button
            className="p-2 hover:bg-gray-100 rounded transition-colors"
            title="Spray"
            id="SprayButton"
            aria-label="Spray"
            onClick={() => setToolType("spray")}
          >
            <FaSprayCan size={24} />
          </button>
        </li>
        <li>
          <button
            className="p-2 hover:bg-gray-100 rounded transition-colors"
            title="Eraser"
            aria-label="Eraser"
            onClick={() => setToolType("eraser")}
          >
            <FaEraser size={24} />
          </button>
        </li>
        <li>
          <p className="p-2 hover:bg-gray-100 rounded transition-colors">
            <input
              ref={colorInputRef}
              type="color"
              value={color}
              onChange={handleColorChange}
              className="w-8 h-8 border-0 rounded-xl cursor-pointer appearance-none"
            />
          </p>
        </li>
      </ul>
    </div>
  );
};

export default Toolsbar;
