import {
  FaFileAlt,
  FaDownload,
  FaTrashAlt,
  FaCamera,
  FaExpand,
  FaUpload,
  FaCameraRetro,
} from "react-icons/fa";

export default function TopBar() {
  return (
    <div className="border rounded-lg w-fit h-fit bg-white flex flex-row gap-4 justify-between px-2 py-4 shadow-md">
      <ul className="flex flex-col gap-4 items-center">
      <li>
        <button
        className="p-2 hover:bg-gray-100 rounded transition-colors"
        title="New Page"
        aria-label="New Page"
        >
        <FaFileAlt />
        </button>
      </li>

      <li>
        <button
        className="p-2 hover:bg-gray-100 rounded transition-colors"
        title="Download"
        aria-label="Download"
        >
        <FaDownload />
        </button>
      </li>

      <li>
        <button
        className="p-2 hover:bg-gray-100 rounded transition-colors"
        title="Clear Canvas"
        aria-label="Clear Canvas"
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
        >
        <FaExpand />
        </button>
      </li>
      </ul>
    </div>
  );
}
