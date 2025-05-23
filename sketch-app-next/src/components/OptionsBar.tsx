import {
  FaFileUpload,
  FaDownload,
  FaTrashAlt,
  FaCamera,
  FaExpand,
  FaUpload,
  FaCameraRetro,
} from "react-icons/fa";
import { Dispatch, SetStateAction } from "react";
import useStore from "../../store/store";

interface TopBarProps {
  DownloadBoard: () => void;
  setIsFullScreen: Dispatch<SetStateAction<boolean>>;
  toggleFullScreen: () => void;
}

export default function TopBar({
  DownloadBoard,
  setIsFullScreen,
  toggleFullScreen,
}: TopBarProps) {
  const setShowMessageCard = useStore((state) => state.setShowMessageCard);

  return (
    <div className="border rounded-lg w-fit h-fit bg-white flex flex-row gap-4 justify-between px-2 py-4 shadow-md">
      <ul className="flex flex-col gap-4 items-center">
        <li>
          <button
            className="p-2 hover:bg-gray-100 rounded transition-colors"
            title="Download"
            aria-label="Download"
            onClick={() => DownloadBoard()}
          >
            <FaDownload />
          </button>
        </li>
        <li>
          <button
            className="p-2 hover:bg-gray-100 rounded transition-colors"
            title="Download"
            aria-label="Download"
          >
            <FaFileUpload />
          </button>
        </li>

        <li>
          <button
            className="p-2 hover:bg-gray-100 rounded transition-colors"
            title="Clear Canvas"
            aria-label="Clear Canvas"
            onClick={() => setShowMessageCard(true)}
          >
            <FaTrashAlt />
          </button>
        </li>

        <li className="relative group">
          <button
            className="ChooseFileDD dropbtn"
            title="Add Image"
            aria-label="Add Image"
          >
            <FaCamera />
          </button>
          <div className="absolute left-0 mt-2 hidden group-hover:block bg-white shadow-lg rounded-md z-10">
            <button
              className="p-2 hover:bg-gray-100 rounded transition-colors"
              aria-label="Upload From Device"
            >
              <FaUpload />
              Upload From Device
            </button>
            <button
              className="p-2 hover:bg-gray-100 rounded transition-colors"
              aria-label="Take a Picture"
            >
              <FaCameraRetro />
              Take a Picture
            </button>
          </div>
        </li>

        <li>
          <button
            className="p-2 hover:bg-gray-100 rounded transition-colors"
            title="Full Screen"
            aria-label="Full Screen"
            onClick={() => {
              setIsFullScreen(false);
              toggleFullScreen();
            }}
          >
            <FaExpand />
          </button>
        </li>
      </ul>
    </div>
  );
}
