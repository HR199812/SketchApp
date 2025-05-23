import useStore from "../../store/store";

interface PropsTypes {
  DownloadBoard: () => void;
}

export default function MessageBox({ DownloadBoard }: PropsTypes) {
  const setShowMessageCard = useStore((state) => state.setShowMessageCard);

  return (
    <div className="fixed inset-0 z-50 w-full h-full bg-gray-600/20 backdrop-blur-md flex justify-center items-center">
      <div className="bg-[#a8d9e1] rounded-xl px-4 py-8">
        <p className="text-xl font-bold">All your Progress will get lost.</p>
        <br />
        <p className="text-lg font-semibold">
          Download the current progress to save it.
        </p>
        <br />
        <div className="flex justify-between items-center px-4">
          <button
            onClick={() => DownloadBoard()}
            className="font-bold px-4 py-2 border border-1 rounded-xl"
          >
            Ok
          </button>
          <button
            onClick={() => setShowMessageCard(false)}
            className="font-bold px-4 py-2 border border-1 rounded-xl"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
